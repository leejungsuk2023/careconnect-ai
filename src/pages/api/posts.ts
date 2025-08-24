import type { NextApiRequest, NextApiResponse } from 'next';
import { XMLParser } from 'fast-xml-parser';

type RssItem = {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  category?: string | string[];
  author?: string;
  guid?: string | { '#text'?: string };
};

const BLOG_ID = 'meditravelconnect';
const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;

const stripHtml = (html?: string): string => {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const extractFirstImage = (html?: string): string | undefined => {
  if (!html) return undefined;
  const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match ? match[1] : undefined;
};

const estimateReadingTime = (text: string): number => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return minutes;
};

const fetchOgImage = async (url?: string): Promise<string | undefined> => {
  if (!url) return undefined;
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    });
    if (!resp.ok) return undefined;
    const html = await resp.text();
    // Try common og:image patterns
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m && m[1]) return m[1];
    }
    return undefined;
  } catch {
    return undefined;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
  const limit = Math.max(1, Math.min(50, parseInt((req.query.limit as string) || '12', 10)));

  try {
    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'CareConnectAI/1.0 (+https://careconnect.ai)'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status}`);
    }

    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const data = parser.parse(xml);

    const items: RssItem[] = Array.isArray(data?.rss?.channel?.item)
      ? data.rss.channel.item
      : data?.rss?.channel?.item
      ? [data.rss.channel.item]
      : [];

    // 모든 RSS 아이템 처리
    const normalized = await Promise.all(items.map(async (item): Promise<any> => {
      const link = item.link || '';
      const idString = (link.split('/').pop() || '').replace(/[^0-9]/g, '');
      const id = Number(idString) || Math.floor(Math.random() * 1_000_000);
      const rawDescription = item.description || '';
      const excerptFull = stripHtml(rawDescription);
      const excerpt = excerptFull.length > 180 ? `${excerptFull.slice(0, 177)}...` : excerptFull;
      let thumbnail = extractFirstImage(rawDescription);
      if (!thumbnail) {
        thumbnail = await fetchOgImage(link);
      }
      const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
      const category = Array.isArray(item.category) ? item.category[0] : item.category || 'naver';
      const author = item.author || 'CareConnect AI';
      const readingTime = estimateReadingTime(excerptFull);

      return {
        id,
        title: item.title || '제목 없음',
        slug: idString,
        excerpt,
        content: '',
        thumbnail: thumbnail,
        author,
        publishedAt,
        readingTime,
        tags: [],
        category,
        featured: false,
        externalUrl: link,
      };
    }));

    // 날짜 순으로 정렬 (최신순)
    normalized.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // 페이징 계산
    const totalPosts = normalized.length;
    const totalPages = Math.max(1, Math.ceil(totalPosts / limit));
    const start = (page - 1) * limit;
    const end = start + limit;
    const pagePosts = normalized.slice(start, end);

    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({
      posts: pagePosts,
      totalPages,
      currentPage: page,
      totalPosts,
    });
  } catch (error) {
    console.error('Error fetching Naver RSS:', error);
    return res.status(500).json({ message: 'Failed to load posts from Naver RSS' });
  }
}



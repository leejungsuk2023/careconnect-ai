import { blogApi } from '../services/api';

export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://careconnect-ai.com';

export const generateSitemap = async (): Promise<string> => {
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/solutions', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/pricing', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/calculator', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFreq: 'daily' as const },
  ];

  staticPages.forEach(page => {
    urls.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: page.changeFreq,
      priority: page.priority,
    });
  });

  // Blog posts (fetch from API)
  try {
    let currentPage = 1;
    let hasMorePosts = true;

    while (hasMorePosts) {
      const response = await blogApi.getAllPosts(currentPage, 50);
      
      response.posts.forEach(post => {
        urls.push({
          url: `${SITE_URL}/blog/${post.id}`,
          lastModified: new Date(post.publishedAt).toISOString(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });

      hasMorePosts = currentPage < response.totalPages;
      currentPage++;
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// For Next.js API route
export const generateSitemapResponse = async () => {
  const sitemap = await generateSitemap();
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
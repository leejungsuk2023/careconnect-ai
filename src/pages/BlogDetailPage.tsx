import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import AnimatedSection, { fadeInUpVariants } from '../components/AnimatedSection';
import { blogApi, BlogPost } from '../services/api';
import { cn } from '../utils/cn';

interface BlogDetailPageProps {
  postId?: number; // This would typically come from router params
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ postId = 1 }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  useEffect(() => {
    fetchPost();
    fetchRelatedPosts();
  }, [postId]);

  const fetchPost = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedPost = await blogApi.getPost(postId);
      setPost(fetchedPost);
    } catch (err) {
      setError('블로그 게시물을 불러오는 중 오류가 발생했습니다.');
      console.error('Blog post fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const response = await blogApi.getAllPosts(1, 3);
      setRelatedPosts(response.posts.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Related posts fetch error:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      kakao: `https://story.kakao.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-primary">
        <NavigationBar links={navLinks} />
        <div className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-pulse space-y-8">
              <div className="space-y-4">
                <div className="h-4 bg-background-secondary rounded w-1/4" />
                <div className="h-8 bg-background-secondary rounded w-3/4" />
                <div className="h-4 bg-background-secondary rounded w-1/2" />
              </div>
              <div className="aspect-video bg-background-secondary rounded-xl" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-background-secondary rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background-primary">
        <NavigationBar links={navLinks} />
        <div className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card variant="elevated" className="text-center py-16">
              <div className="text-accent-red/20 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                게시물을 찾을 수 없습니다
              </h3>
              <p className="text-text-muted mb-6">
                {error || '요청하신 블로그 게시물이 존재하지 않습니다.'}
              </p>
              <Button variant="primary" onClick={() => window.history.back()}>
                이전 페이지로 돌아가기
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      <NavigationBar links={navLinks} />

      {/* Article Header */}
      <motion.section 
        className="pt-32 pb-16 px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
      >
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <a href="/blog" className="hover:text-text-primary transition-colors">블로그</a>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-text-secondary">{post.title}</span>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="primary" size="sm">
              {post.category}
            </Badge>
            <span className="text-sm text-text-muted">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-sm text-text-muted">
              {post.readingTime}분 읽기
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                <span className="text-lg text-accent-primary font-semibold">
                  {post.author[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-primary">{post.author}</p>
                <p className="text-sm text-text-muted">의료 AI 전문가</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted mr-2">공유하기:</span>
              {[
                { platform: 'twitter', icon: '𝕏', label: 'Twitter' },
                { platform: 'facebook', icon: 'f', label: 'Facebook' },
                { platform: 'linkedin', icon: 'in', label: 'LinkedIn' },
                { platform: 'kakao', icon: '카', label: 'KakaoTalk' },
              ].map(({ platform, icon, label }) => (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className="w-8 h-8 rounded-full bg-background-secondary hover:bg-accent-primary text-text-muted hover:text-white transition-all duration-200 flex items-center justify-center text-xs font-bold"
                  title={`${label}에서 공유하기`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Image */}
      <AnimatedSection>
        <section className="px-6 pb-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video rounded-xl overflow-hidden bg-background-secondary">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/800x450/16171D/5E6AD2?text=${encodeURIComponent(post.title.substring(0, 30))}`;
                }}
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Article Content */}
      <AnimatedSection>
        <section className="px-6 pb-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card variant="elevated" className="prose prose-invert prose-lg max-w-none">
              <div 
                className="text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content || post.excerpt || '게시물 내용을 불러오는 중입니다...' 
                }}
              />
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Tags */}
      <AnimatedSection>
        <section className="px-6 pb-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-accent-primary/10 text-accent-primary rounded-full hover:bg-accent-primary/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <AnimatedSection>
          <section className="px-6 pb-24 lg:px-8 bg-gradient-to-t from-background-secondary to-background-primary">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  관련 글 더보기
                </h2>
                <p className="text-lg text-text-secondary">
                  비슷한 주제의 다른 인사이트도 확인해보세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    variant="elevated"
                    hover
                    className="group cursor-pointer h-full flex flex-col"
                    onClick={() => window.location.href = `/blog/${relatedPost.id}`}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-background-primary">
                      <img
                        src={relatedPost.thumbnail}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x225/16171D/5E6AD2?text=${encodeURIComponent(relatedPost.title.substring(0, 20))}`;
                        }}
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" size="xs">
                          {relatedPost.category}
                        </Badge>
                        <span className="text-xs text-text-muted">
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-text-secondary text-sm line-clamp-3 flex-1">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="secondary" onClick={() => window.location.href = '/blog'}>
                  모든 글 보기
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* CTA Section */}
      <AnimatedSection>
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card variant="gradient" className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                CareConnect AI로 병원 마케팅을 혁신하세요
              </h3>
              <p className="text-lg text-text-secondary mb-8">
                이 글이 도움이 되셨나요? 지금 바로 무료 데모를 신청하고 실제 솔루션을 체험해보세요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="lg">
                  무료 데모 신청하기
                </Button>
                <Button variant="secondary" size="lg">
                  상담 예약하기
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default BlogDetailPage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import AnimatedSection, { staggerContainerVariants, fadeInUpVariants } from '../components/AnimatedSection';
import type { BlogPost } from '../services/api';
import { cn } from '../utils/cn';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog', active: true },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  const categories = [
    { id: 'all', label: '전체', count: 0 },
    { id: 'ai-technology', label: 'AI 기술', count: 0 },
    { id: 'healthcare-marketing', label: '의료 마케팅', count: 0 },
    { id: 'success-stories', label: '성공사례', count: 0 },
    { id: 'industry-trends', label: '업계 트렌드', count: 0 },
  ];

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/posts?page=${currentPage}&limit=6`);
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
      const mapped: BlogPost[] = data.posts.map((p: any, idx: number) => ({
        id: p.id ?? idx + 1,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category || 'naver',
        author: p.author || 'CareConnect AI',
        publishedAt: p.publishedAt,
        readTime: p.readTime ?? p.readingTime ?? 3,
        tags: p.tags || [],
        featured: p.featured || false,
        externalUrl: p.externalUrl,
        thumbnail: p.thumbnail,
      }));
      setPosts(mapped);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError('블로그 게시물을 불러오는 중 오류가 발생했습니다.');
      console.error('Blog fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    // 외부 링크가 있으면 네이버 블로그로, 없으면 내부 페이지로
    if (post.externalUrl) {
      window.open(post.externalUrl, '_blank');
    } else {
      window.location.href = `/blog/${post.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary mobile-safe-container">
      <NavigationBar links={navLinks} />

      {/* Page Header */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Badge variant="primary" size="sm" dot pulse className="mb-4 sm:mb-6">
            Blog & Resources
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-4 sm:mb-6 px-4 sm:px-0">
            의료 AI의 모든 것
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            CareConnect AI와 함께하는 스마트 헬스케어의 최신 동향과 실전 노하우를 만나보세요
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 pb-6 sm:pb-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base',
                  selectedCategory === category.id
                    ? 'bg-accent-primary text-white shadow-lg'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} variant="elevated" className="animate-pulse">
                  <div className="aspect-video bg-background-primary rounded-lg mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-background-primary rounded w-3/4" />
                    <div className="h-4 bg-background-primary rounded w-1/2" />
                    <div className="h-3 bg-background-primary rounded w-full" />
                    <div className="h-3 bg-background-primary rounded w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card variant="elevated" className="text-center py-16">
              <div className="text-accent-red/20 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                오류가 발생했습니다
              </h3>
              <p className="text-text-muted mb-6">{error}</p>
              <Button variant="primary" onClick={fetchPosts}>
                다시 시도하기
              </Button>
            </Card>
          ) : (
            <>
              <AnimatedSection>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {filteredPosts.map((post) => (
                    <motion.div key={post.id} variants={fadeInUpVariants}>
                      <Card
                        variant="elevated"
                        hover
                        className="group cursor-pointer h-full flex flex-col"
                        onClick={() => handlePostClick(post)}
                      >
                        {/* Thumbnail */}
                        <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-background-primary">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/400x225/16171D/5E6AD2?text=${encodeURIComponent(post.title.substring(0, 20))}`;
                            }}
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          {/* Meta info */}
                          <div className="flex items-center gap-3 mb-3">
                            <Badge 
                              variant="secondary" 
                              size="xs"
                            >
                              {post.category}
                            </Badge>
                            <span className="text-xs text-text-muted">
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="text-xs text-text-muted">
                              {(post.readingTime ?? post.readTime ?? 3)}분 읽기
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Author & Tags */}
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center">
                                <span className="text-xs text-accent-primary font-medium">
                                  {post.author[0]}
                                </span>
                              </div>
                              <span className="text-xs text-text-muted">
                                {post.author}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs text-accent-primary/70 bg-accent-primary/5 px-2 py-1 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8 sm:mt-12">
                  <Button
                    variant="secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    이전
                  </Button>
                  
                  <div className="flex items-center gap-1 sm:gap-2">
                    {(() => {
                      const pages = [];
                      const showPages = Math.min(5, totalPages);
                      let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                      let endPage = Math.min(totalPages, startPage + showPages - 1);
                      
                      if (endPage - startPage + 1 < showPages) {
                        startPage = Math.max(1, endPage - showPages + 1);
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={cn(
                              'w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base',
                              currentPage === i
                                ? 'bg-accent-primary text-white shadow-lg'
                                : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                            )}
                          >
                            {i}
                          </button>
                        );
                      }
                      return pages;
                    })()}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-text-muted px-2">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="flex items-center gap-2"
                  >
                    다음
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <AnimatedSection>
        <section className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24 lg:px-8 bg-gradient-to-t from-background-secondary to-background-primary">
          <div className="mx-auto max-w-4xl">
            <Card variant="gradient" className="text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-4 px-4 sm:px-0">
                최신 의료 AI 소식을 받아보세요
              </h3>
              <p className="text-base sm:text-lg text-text-secondary mb-6 sm:mb-8 px-4 sm:px-0">
                매주 화요일, CareConnect AI의 최신 업데이트와 의료 마케팅 인사이트를 이메일로 전해드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4 sm:px-0">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className={cn(
                    'flex-1 px-4 py-3 bg-background-secondary border border-border-primary rounded-lg',
                    'text-text-primary placeholder:text-text-muted',
                    'focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20',
                    'transition-all duration-200'
                  )}
                />
                <Button variant="primary" className="w-full sm:w-auto">
                  구독하기
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default BlogListPage;
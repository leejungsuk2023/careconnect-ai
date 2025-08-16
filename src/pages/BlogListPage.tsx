import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import AnimatedSection, { staggerContainerVariants, fadeInUpVariants } from '../components/AnimatedSection';
import { blogApi, BlogPost } from '../services/api';
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
  }, [currentPage]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 실제 네이버 블로그 데이터 (목 데이터)
      const mockPosts: BlogPost[] = [
        {
          id: 1,
          title: "의료진이 알아야 할 헬스케어 AI의 현재와 미래",
          excerpt: "인공지능이 의료 현장에 가져온 혁신적 변화와 앞으로의 발전 방향에 대해 살펴봅니다. 진단 보조 시스템부터 개인 맞춤형 치료까지...",
          content: "",
          category: "ai-technology",
          author: "CareConnect AI",
          publishedAt: "2024-12-15",
          readTime: 8,
          tags: ["AI", "헬스케어", "의료진단", "미래의학"],
          featured: true,
          externalUrl: "https://blog.naver.com/meditravelconnect/223921709829"
        },
        {
          id: 2,
          title: "병원 마케팅 디지털 전환 전략 가이드",
          excerpt: "코로나19 이후 가속화된 의료 마케팅의 디지털 전환. 성공적인 온라인 마케팅 전략과 환자 소통 방법을 알아봅시다.",
          content: "",
          category: "healthcare-marketing",
          author: "CareConnect AI",
          publishedAt: "2024-12-10",
          readTime: 6,
          tags: ["디지털마케팅", "병원경영", "온라인상담"],
          featured: false,
          externalUrl: "https://blog.naver.com/meditravelconnect"
        },
        {
          id: 3,
          title: "환자 만족도 향상을 위한 AI 챗봇 활용법",
          excerpt: "24시간 환자 상담이 가능한 AI 챗봇 시스템. 실제 도입 사례와 환자 만족도 개선 효과를 데이터로 확인해보세요.",
          content: "",
          category: "case-study",
          author: "CareConnect AI",
          publishedAt: "2024-12-05",
          readTime: 5,
          tags: ["챗봇", "환자상담", "고객만족"],
          featured: true,
          externalUrl: "https://blog.naver.com/meditravelconnect"
        },
        {
          id: 4,
          title: "의료 빅데이터와 개인정보보호: 균형점 찾기",
          excerpt: "의료 데이터 활용의 중요성과 개인정보보호 사이의 균형. GDPR, 개인정보보호법 등 법적 요구사항을 준수하면서 혁신하는 방법.",
          content: "",
          category: "industry-insights",
          author: "CareConnect AI",
          publishedAt: "2024-11-28",
          readTime: 7,
          tags: ["빅데이터", "개인정보보호", "GDPR", "의료법"],
          featured: false,
          externalUrl: "https://blog.naver.com/meditravelconnect"
        },
        {
          id: 5,
          title: "스마트 병원의 현재와 미래 전망",
          excerpt: "IoT, AI, 로봇 기술이 만들어가는 스마트 병원의 모습. 국내외 선진 사례와 도입 시 고려사항을 정리했습니다.",
          content: "",
          category: "ai-technology",
          author: "CareConnect AI", 
          publishedAt: "2024-11-20",
          readTime: 9,
          tags: ["스마트병원", "IoT", "로봇기술", "미래의료"],
          featured: false,
          externalUrl: "https://blog.naver.com/meditravelconnect"
        },
        {
          id: 6,
          title: "원격의료 시대, 환자 관리 시스템의 진화",
          excerpt: "팬데믹으로 주목받은 원격의료. 효과적인 원격 환자 관리를 위한 시스템 구축 방법과 성공 요인을 분석합니다.",
          content: "",
          category: "case-study",
          author: "CareConnect AI",
          publishedAt: "2024-11-15",
          readTime: 6,
          tags: ["원격의료", "환자관리", "텔레헬스"],
          featured: false,
          externalUrl: "https://blog.naver.com/meditravelconnect"
        }
      ];

      setPosts(mockPosts);
      setTotalPages(Math.ceil(mockPosts.length / 12));
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
                              {post.readingTime}분 읽기
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
                  >
                    이전
                  </Button>
                  
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={cn(
                          'w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base',
                          currentPage === index + 1
                            ? 'bg-accent-primary text-white'
                            : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                        )}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    다음
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
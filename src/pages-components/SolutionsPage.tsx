import React from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { cn } from '../utils/cn';

interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  icon: React.ReactNode;
  gradient: {
    from: string;
    to: string;
  };
}

const SolutionsPage: React.FC = () => {
  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions', active: true },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  const solutions: Solution[] = [
    {
      id: 'content-studio',
      title: 'AI 콘텐츠 스튜디오',
      subtitle: '병원 맞춤형 콘텐츠 자동 생성',
      description: '의료 전문 AI가 병원의 특성과 타겟 환자층을 분석하여 최적화된 콘텐츠를 생성합니다. SEO 최적화는 물론, 의료법 규정을 준수하는 안전한 콘텐츠를 제공합니다.',
      features: [
        {
          title: '다채널 콘텐츠 생성',
          description: '블로그, SNS, 뉴스레터, 보도자료까지 모든 채널에 맞는 콘텐츠를 한 번에 생성합니다.',
        },
        {
          title: '의료 전문 AI 엔진',
          description: '의학 용어와 최신 의료 트렌드를 학습한 AI가 전문적이면서도 이해하기 쉬운 콘텐츠를 작성합니다.',
        },
        {
          title: '자동 일정 관리',
          description: '콘텐츠 캘린더를 AI가 자동으로 관리하고 최적의 시간에 발행합니다.',
        },
      ],
      benefits: [
        '콘텐츠 제작 시간 90% 단축',
        '검색 노출 3배 증가',
        '환자 참여도 250% 향상',
        '브랜드 인지도 180% 상승',
        '소셜미디어 팔로워 400% 증가',
        '블로그 트래픽 5배 향상',
      ],
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      ),
      gradient: { from: '#5E6AD2', to: '#7B61FF' },
    },
    {
      id: 'performance-marketing',
      title: 'AI 퍼포먼스 마케팅',
      subtitle: '데이터 기반 광고 자동 최적화',
      description: '실시간 데이터 분석과 머신러닝을 통해 광고 성과를 극대화합니다. 타겟팅부터 비딩, 크리에이티브 최적화까지 모든 과정을 AI가 자동으로 관리합니다.',
      features: [
        {
          title: '스마트 타겟팅',
          description: '환자 데이터와 행동 패턴을 분석하여 가장 전환 가능성이 높은 잠재 환자를 찾아냅니다.',
        },
        {
          title: '실시간 입찰 최적화',
          description: 'AI가 24시간 광고 입찰가를 모니터링하고 조정하여 ROI를 극대화합니다.',
        },
        {
          title: '멀티변수 A/B 테스트',
          description: '수백 가지 변수를 동시에 테스트하여 최적의 광고 조합을 찾아냅니다.',
        },
      ],
      benefits: [
        '광고 비용 40% 절감',
        '전환율 3.5배 향상',
        'ROI 280% 증가',
        '신규 환자 유입 320% 증가',
        '광고 클릭률 450% 개선',
        '예약 전환율 240% 향상',
      ],
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      ),
      gradient: { from: '#3B82F6', to: '#10B981' },
    },
    {
      id: 'ai-conversation',
      title: 'AI 컨버세이션',
      subtitle: '24/7 지능형 환자 응대 시스템',
      description: '자연어 처리 기술을 활용한 AI 상담사가 환자의 문의를 실시간으로 응대합니다. 예약, 상담, 안내까지 모든 커뮤니케이션을 자동화합니다.',
      features: [
        {
          title: '다국어 실시간 응답',
          description: '한국어, 영어, 중국어 등 다양한 언어로 즉각적인 응답을 제공합니다.',
        },
        {
          title: '감정 인식 및 대응',
          description: '환자의 감정 상태를 파악하여 적절한 톤과 내용으로 응대합니다.',
        },
        {
          title: '원활한 인계 시스템',
          description: '복잡한 문의는 적절한 의료진에게 자동으로 연결하고 대화 내역을 전달합니다.',
        },
      ],
      benefits: [
        '응답 시간 95% 단축',
        '상담 처리량 10배 증가',
        '환자 만족도 92% 달성',
        '상담원 업무 효율 300% 향상',
        '24시간 대응률 100% 달성',
        '고객 이탈률 70% 감소',
      ],
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-secondary flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      ),
      gradient: { from: '#8B5CF6', to: '#EC4899' },
    },
  ];

  return (
    <div className="min-h-screen bg-background-primary mobile-safe-container">
      <NavigationBar links={navLinks} />
      
      {/* Page Header */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center px-4 sm:px-0">
          <Badge variant="primary" size="sm" dot pulse className="mb-6">
            Our Solutions
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-4 sm:mb-6">
            우리의 솔루션이 문제를 해결하는 방법
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl lg:max-w-3xl mx-auto">
            AI 기술을 활용하여 병원 마케팅의 모든 단계를 혁신합니다.
            데이터 기반의 스마트한 솔루션으로 실질적인 성과를 만들어냅니다.
          </p>
        </div>
      </section>

      {/* Solutions Detail Sections */}
      {solutions.map((solution, index) => (
        <section key={solution.id} className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-0">
            <div className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center',
              index % 2 === 1 && 'lg:grid-flow-dense'
            )}>
              {/* Content */}
              <div className={cn(index % 2 === 1 && 'lg:col-start-2')}>
                <div className="flex items-center gap-3 mb-6">
                  {solution.icon}
                  <Badge variant="secondary" size="sm">
                    Solution {index + 1}
                  </Badge>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-3 sm:mb-4">
                  {solution.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-accent-primary mb-4 sm:mb-6">
                  {solution.subtitle}
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-text-secondary mb-6 sm:mb-8">
                  {solution.description}
                </p>

                {/* Features */}
                <div className="space-y-6 mb-8">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-text-muted">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[180px] text-sm sm:text-base">
                  자세히 보기
                </Button>
              </div>

              {/* Visual */}
              <div className={cn(
                'relative',
                index % 2 === 1 && 'lg:col-start-1'
              )}>
                <Card variant="glass" padding="none" className="overflow-hidden">
                  {/* Placeholder for visual content */}
                  <div 
                    className="h-[300px] sm:h-[400px] lg:h-[500px] relative"
                    style={{
                      background: `linear-gradient(135deg, ${solution.gradient.from}20, ${solution.gradient.to}20)`,
                    }}
                  >
                    {/* Benefits overlay */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-8 sm:left-8 sm:right-8">
                      <div className="bg-background-primary/90 backdrop-blur-lg rounded-xl p-3 sm:p-6 border border-border-primary">
                        <h4 className="font-semibold text-text-primary mb-3 sm:mb-6">주요 성과</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4 lg:gap-6">
                          {solution.benefits.map((benefit, benefitIndex) => (
                            <motion.div 
                              key={benefitIndex} 
                              className="relative group cursor-pointer"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: benefitIndex * 0.2, duration: 0.5 }}
                              whileHover={{ scale: 1.05 }}
                              viewport={{ once: true }}
                            >
                              {/* Outer glow ring */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                              
                              {/* Card content */}
                              <div className="relative bg-background-primary/80 backdrop-blur-sm border border-accent-primary/30 rounded-lg sm:rounded-xl p-1.5 sm:p-4 h-full">
                                {/* Top decoration */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <div className="w-3 h-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="text-center pt-0.5 sm:pt-2">
                                  {/* Icon based on benefit type */}
                                  <div className="mb-1 sm:mb-3 flex justify-center">
                                    {benefit.includes('시간') || benefit.includes('단축') ? (
                                      <motion.div 
                                        className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-accent-green to-accent-blue flex items-center justify-center"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                      >
                                        <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </motion.div>
                                    ) : benefit.includes('증가') || benefit.includes('향상') ? (
                                      <motion.div 
                                        className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-accent-primary to-accent-purple flex items-center justify-center"
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                      </motion.div>
                                    ) : benefit.includes('절감') || benefit.includes('ROI') ? (
                                      <motion.div 
                                        className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-accent-yellow to-accent-green flex items-center justify-center"
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </motion.div>
                                    ) : (
                                      <motion.div 
                                        className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-accent-secondary to-accent-primary flex items-center justify-center"
                                        whileHover={{ rotate: 180 }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                      </motion.div>
                                    )}
                                  </div>
                                  
                                  {/* Metric text */}
                                  <motion.p 
                                    className="text-accent-primary font-bold text-xs sm:text-sm lg:text-lg mb-0.5 sm:mb-2"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {benefit}
                                  </motion.p>
                                  
                                  {/* Progress bar effect */}
                                  <div className="w-full bg-background-secondary rounded-full h-0.5 sm:h-1.5 overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                                      initial={{ width: 0 }}
                                      whileInView={{ width: benefitIndex === 0 ? '90%' : benefitIndex === 1 ? '75%' : '85%' }}
                                      transition={{ delay: benefitIndex * 0.3 + 0.5, duration: 1.2, ease: "easeOut" }}
                                      viewport={{ once: true }}
                                    />
                                  </div>
                                  
                                  {/* Floating particles */}
                                  <div className="absolute inset-0 pointer-events-none">
                                    <motion.div 
                                      className="absolute top-2 right-2 w-1 h-1 bg-accent-primary rounded-full"
                                      animate={{ 
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                      }}
                                      transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: benefitIndex * 0.5
                                      }}
                                    />
                                    <motion.div 
                                      className="absolute bottom-2 left-2 w-1 h-1 bg-accent-secondary rounded-full"
                                      animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.8, 0.3]
                                      }}
                                      transition={{ 
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: benefitIndex * 0.3 + 1
                                      }}
                                    />
                                    <motion.div 
                                      className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-accent-green rounded-full"
                                      animate={{ 
                                        y: [-5, 5, -5],
                                        opacity: [0.4, 0.8, 0.4]
                                      }}
                                      transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: benefitIndex * 0.7
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8 bg-gradient-to-t from-background-secondary to-background-primary">
        <div className="mx-auto max-w-4xl">
          <Card variant="gradient" className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              모든 솔루션을 하나로
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              CareConnect AI의 통합 솔루션으로 병원 마케팅의 모든 과정을 자동화하고 최적화하세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                전체 데모 보기
              </Button>
              <Button variant="secondary" size="lg">
                맞춤 상담 신청
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
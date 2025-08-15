import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import AnimatedSection, { staggerContainerVariants, fadeInUpVariants } from '../components/AnimatedSection';
import CountUpAnimation from '../components/CountUpAnimation';
import DemoRequestModal from '../components/DemoRequestModal';
import { cn } from '../utils/cn';

const HomePage: React.FC = () => {
  const [newPatients, setNewPatients] = useState('');
  const [avgRevenue, setAvgRevenue] = useState('');
  const [marketingCost, setMarketingCost] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const navLinks = [
    { label: '홈', href: '/', active: true },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  const solutions = [
    {
      title: 'AI 콘텐츠 스튜디오',
      description: '병원 특성에 맞는 맞춤형 콘텐츠를 AI가 자동으로 생성합니다. 블로그, SNS, 뉴스레터까지 모든 채널을 커버합니다.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: ['SEO 최적화', '멀티채널 배포', '브랜드 일관성 유지'],
    },
    {
      title: 'AI 퍼포먼스 마케팅',
      description: '실시간 데이터 분석을 통해 최적의 마케팅 전략을 수립하고 실행합니다. ROI를 극대화하는 스마트한 광고 운영.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['자동 입찰 최적화', 'A/B 테스트', '전환율 추적'],
    },
    {
      title: 'AI 컨버세이션',
      description: '24시간 365일 환자와 소통하는 AI 상담 시스템. 예약부터 문의까지 모든 커뮤니케이션을 자동화합니다.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      features: ['실시간 응답', '다국어 지원', '감정 분석'],
    },
  ];

  const successStories = [
    {
      hospital: '서울대학교병원',
      logo: '🏥',
      metric: '외국인 환자 문의 300% 증가',
      description: 'AI 컨버세이션 도입 후 3개월 만에 달성',
    },
    {
      hospital: '세브란스병원',
      logo: '🏥',
      metric: '마케팅 비용 45% 절감',
      description: 'AI 퍼포먼스 마케팅으로 효율 극대화',
    },
    {
      hospital: '삼성서울병원',
      logo: '🏥',
      metric: '콘텐츠 제작 시간 90% 단축',
      description: 'AI 콘텐츠 스튜디오로 업무 자동화',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <NavigationBar links={navLinks} />
      
      {/* Hero Section */}
      <motion.div 
        className="pt-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInUpVariants}>
          <HeroSection
            badge="새로운 의료 마케팅의 시작"
            title="환자는 더 가까이, 병원은 더 똑똑하게"
            subtitle="병원 성장의 모든 과정, CareConnect AI가 함께합니다."
            description="AI 기술로 의료 마케팅을 혁신하고, 환자와의 소통을 개선하며, 병원의 지속 가능한 성장을 지원합니다."
            primaryAction={{
              label: '데모 신청하기',
              onClick: () => setIsDemoModalOpen(true),
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              ),
            }}
            secondaryAction={{
              label: '성장률 계산해보기',
              onClick: () => scrollToSection('growth-calculator'),
            }}
          />
        </motion.div>
      </motion.div>

      {/* Solutions Section */}
      <AnimatedSection>
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16">
              <Badge variant="primary" size="sm" dot pulse className="mb-4">
                AI Solutions
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                병원 성장의 3단계, AI로 해결
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                콘텐츠 생성부터 마케팅 실행, 환자 소통까지 모든 단계를 AI가 자동화하고 최적화합니다.
              </p>
            </div>

            {/* Solution Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {solutions.map((solution, index) => (
                <motion.div key={index} variants={fadeInUpVariants}>
                  <Card
                    variant="elevated"
                    hover
                    glow={index === 1}
                    className="group"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary p-2.5 text-white mb-6">
                      {solution.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary mb-6">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-text-muted">
                          <svg className="w-4 h-4 text-accent-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button className="text-accent-primary font-medium text-sm hover:text-accent-secondary transition-colors flex items-center gap-2">
                      자세히 알아보기
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Growth Calculator Section */}
      <AnimatedSection>
        <section id="growth-calculator" className="px-6 py-24 lg:px-8 bg-gradient-to-b from-background-primary to-background-secondary">
          <div className="mx-auto max-w-7xl">
            <Card variant="gradient" className="overflow-visible">
              <div className="text-center mb-12">
                <Badge variant="success" size="sm" dot pulse className="mb-4">
                  ROI Calculator
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                  AI 도입 후, 우리 병원의 예상 성장률은?
                </h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                  간단한 정보 입력으로 CareConnect AI 도입 시 예상되는 성과를 확인해보세요
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Input Section */}
                <div className="space-y-6">
                  <Input
                    label="월평균 신규 환자 수"
                    type="number"
                    placeholder="예: 100"
                    value={newPatients}
                    onChange={(e) => setNewPatients(e.target.value)}
                    helperText="현재 병원의 월평균 신규 환자 수를 입력하세요"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                  
                  <Input
                    label="환자당 평균 매출 (원)"
                    type="number"
                    placeholder="예: 500000"
                    value={avgRevenue}
                    onChange={(e) => setAvgRevenue(e.target.value)}
                    helperText="환자 1인당 평균 진료비/시술비를 입력하세요"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  
                  <Input
                    label="월 마케팅 비용 (원)"
                    type="number"
                    placeholder="예: 5000000"
                    value={marketingCost}
                    onChange={(e) => setMarketingCost(e.target.value)}
                    helperText="현재 지출하고 있는 월 마케팅 비용을 입력하세요"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    }
                  />

                  <div className="flex gap-4">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      fullWidth
                      onClick={() => window.location.href = '/calculator'}
                    >
                      상세 결과 확인하기
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      onClick={() => {
                        setNewPatients('');
                        setAvgRevenue('');
                        setMarketingCost('');
                      }}
                    >
                      초기화
                    </Button>
                  </div>
                </div>

                {/* Result Preview */}
                <div className="relative">
                  <Card variant="glass" className="backdrop-blur-xl">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-2">
                        예상 성과 미리보기
                      </h3>
                      <p className="text-sm text-text-muted">
                        AI 도입 3개월 후 예상 결과
                      </p>
                    </div>

                    <div className="space-y-6">
                      <motion.div 
                        className="flex items-center justify-between p-4 rounded-lg bg-accent-green/10 border border-accent-green/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <p className="text-sm text-text-secondary">신규 환자 증가율</p>
                          <p className="text-2xl font-bold text-accent-green">
                            +<CountUpAnimation value={35} suffix="%" duration={1.5} />
                          </p>
                        </div>
                        <svg className="w-8 h-8 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </motion.div>

                      <motion.div 
                        className="flex items-center justify-between p-4 rounded-lg bg-accent-blue/10 border border-accent-blue/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <p className="text-sm text-text-secondary">마케팅 비용 절감</p>
                          <p className="text-2xl font-bold text-accent-blue">
                            -<CountUpAnimation value={40} suffix="%" duration={1.5} />
                          </p>
                        </div>
                        <svg className="w-8 h-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      </motion.div>

                      <motion.div 
                        className="flex items-center justify-between p-4 rounded-lg bg-accent-purple/10 border border-accent-purple/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <p className="text-sm text-text-secondary">ROI (투자수익률)</p>
                          <p className="text-2xl font-bold text-accent-purple">
                            <CountUpAnimation value={280} suffix="%" duration={2} />
                          </p>
                        </div>
                        <svg className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </motion.div>
                    </div>

                    <p className="text-xs text-text-muted text-center mt-6">
                      * 실제 결과는 병원 상황에 따라 다를 수 있습니다
                    </p>
                  </Card>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-accent-green/20 to-accent-blue/20 rounded-full blur-2xl" />
                </div>
              </div>
            </Card>
          </div>
        </section>
      </AnimatedSection>

      {/* Success Stories Section */}
      <AnimatedSection>
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge variant="primary" size="sm" dot className="mb-4">
                Success Stories
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                이미 성공을 경험한 병원들
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                CareConnect AI와 함께 성장한 병원들의 실제 사례를 확인해보세요
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {successStories.map((story, index) => (
                <motion.div key={index} variants={fadeInUpVariants}>
                  <Card variant="elevated" hover className="text-center">
                    <div className="text-4xl mb-4">{story.logo}</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {story.hospital}
                    </h3>
                    <p className="text-2xl font-bold text-accent-primary mb-3">
                      {story.metric}
                    </p>
                    <p className="text-sm text-text-muted">
                      {story.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Logo Slider */}
            <div className="overflow-hidden relative">
              <div className="flex items-center justify-center gap-12 opacity-50">
                {['서울아산병원', '강남세브란스', '분당서울대병원', '건국대병원', '가톨릭대학교병원'].map((hospital, index) => (
                  <div key={index} className="flex-shrink-0">
                    <p className="text-text-muted font-medium">{hospital}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Final CTA Section */}
      <AnimatedSection>
        <section className="px-6 py-24 lg:px-8 bg-gradient-to-t from-background-secondary to-background-primary">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              AI와 함께 병원 마케팅의 새로운 가능성을 경험해보세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={() => setIsDemoModalOpen(true)}>
                데모 신청하기
              </Button>
              <Button variant="secondary" size="lg">
                요금제 보기
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Demo Request Modal */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
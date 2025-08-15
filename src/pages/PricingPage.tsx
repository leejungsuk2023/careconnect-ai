import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { cn } from '../utils/cn';

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number | string;
    yearly: number | string;
  };
  features: {
    text: string;
    included: boolean;
  }[];
  highlighted?: boolean;
  badge?: string;
}

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing', active: true },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Basic',
      description: '소규모 병원을 위한 필수 기능',
      price: {
        monthly: 299000,
        yearly: 2990000,
      },
      features: [
        { text: 'AI 콘텐츠 생성 (월 50건)', included: true },
        { text: '기본 SEO 최적화', included: true },
        { text: 'SNS 자동 발행 (3개 채널)', included: true },
        { text: '기본 분석 리포트', included: true },
        { text: '이메일 지원', included: true },
        { text: 'AI 퍼포먼스 마케팅', included: false },
        { text: 'AI 컨버세이션', included: false },
        { text: '전담 매니저', included: false },
      ],
    },
    {
      name: 'Pro',
      description: '성장하는 병원을 위한 전문 솔루션',
      price: {
        monthly: 599000,
        yearly: 5990000,
      },
      features: [
        { text: 'AI 콘텐츠 생성 (무제한)', included: true },
        { text: '고급 SEO 최적화', included: true },
        { text: 'SNS 자동 발행 (모든 채널)', included: true },
        { text: 'AI 퍼포먼스 마케팅', included: true },
        { text: '실시간 분석 대시보드', included: true },
        { text: 'A/B 테스트 도구', included: true },
        { text: '24/7 채팅 지원', included: true },
        { text: 'AI 컨버세이션 (기본)', included: true },
      ],
      highlighted: true,
      badge: '가장 인기 있는 선택',
    },
    {
      name: 'Enterprise',
      description: '대형 병원 및 네트워크를 위한 맞춤형',
      price: {
        monthly: '문의',
        yearly: '문의',
      },
      features: [
        { text: '모든 Pro 기능 포함', included: true },
        { text: 'AI 컨버세이션 (고급)', included: true },
        { text: '맞춤형 AI 모델 학습', included: true },
        { text: '무제한 사용자', included: true },
        { text: 'API 연동', included: true },
        { text: '전담 성공 매니저', included: true },
        { text: 'SLA 보장', included: true },
        { text: '온프레미스 설치 가능', included: true },
      ],
    },
  ];

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <NavigationBar links={navLinks} />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Badge variant="primary" size="sm" dot pulse className="mb-6">
            Pricing Plans
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            우리 병원에 맞는 플랜을 선택하세요
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">
            병원 규모와 필요에 따라 최적의 요금제를 선택하세요.
            모든 플랜은 14일 무료 체험이 가능합니다.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-background-secondary rounded-xl border border-border-primary">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                'px-6 py-2.5 rounded-lg font-medium transition-all',
                billingPeriod === 'monthly'
                  ? 'bg-accent-primary text-white shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              월간 결제
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                'px-6 py-2.5 rounded-lg font-medium transition-all',
                billingPeriod === 'yearly'
                  ? 'bg-accent-primary text-white shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              연간 결제
              <Badge variant="success" size="xs" className="ml-2">
                2개월 무료
              </Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                variant={plan.highlighted ? 'gradient' : 'elevated'}
                hover
                glow={plan.highlighted}
                className={cn(
                  'relative flex flex-col',
                  plan.highlighted && 'md:scale-105'
                )}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" size="sm" className="shadow-lg">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Plan Name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-muted">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-text-primary">
                      {typeof plan.price[billingPeriod] === 'string' 
                        ? plan.price[billingPeriod]
                        : `₩${formatPrice(plan.price[billingPeriod])}`
                      }
                    </span>
                    {typeof plan.price[billingPeriod] === 'number' && (
                      <span className="text-text-muted">
                        /{billingPeriod === 'monthly' ? '월' : '년'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && typeof plan.price.monthly === 'number' && (
                    <p className="text-sm text-accent-green mt-2">
                      연 ₩{formatPrice(plan.price.monthly * 2)} 절약
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={cn(
                        feature.included ? 'text-text-secondary' : 'text-text-muted line-through'
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                >
                  {plan.name === 'Enterprise' ? '상담 신청하기' : '시작하기'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 lg:px-8 bg-gradient-to-t from-background-secondary to-background-primary">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-text-secondary">
              요금제에 대해 궁금한 점이 있으신가요?
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: '무료 체험은 어떻게 이용하나요?',
                answer: '모든 플랜은 14일 무료 체험이 가능합니다. 신용카드 등록 없이 바로 시작할 수 있습니다.',
              },
              {
                question: '플랜 변경은 언제든 가능한가요?',
                answer: '네, 언제든지 상위 또는 하위 플랜으로 변경 가능합니다. 변경된 요금은 다음 결제일부터 적용됩니다.',
              },
              {
                question: '환불 정책은 어떻게 되나요?',
                answer: '서비스 이용 후 7일 이내 전액 환불이 가능합니다. 연간 결제의 경우 사용하지 않은 기간에 대해 일할 계산하여 환불해 드립니다.',
              },
            ].map((faq, index) => (
              <Card key={index} variant="default" padding="lg">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-text-secondary">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-text-secondary mb-4">
              더 궁금한 점이 있으신가요?
            </p>
            <Button variant="tertiary" size="lg" href="/contact">
              영업팀에 문의하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
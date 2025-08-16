import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';

const CasesPage: React.FC = () => {
  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases', active: true },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  const cases = [
    {
      hospital: '서울대학교병원',
      logo: '🏥',
      metric: '외국인 환자 문의 300% 증가',
      description: 'AI 컨버세이션 도입 후 3개월 만에 달성',
      details: 'CareConnect AI의 다국어 지원 기능을 통해 외국인 환자들의 접근성을 크게 개선했습니다.'
    },
    {
      hospital: '세브란스병원',
      logo: '🏥',
      metric: '마케팅 비용 45% 절감',
      description: 'AI 퍼포먼스 마케팅으로 효율 극대화',
      details: '자동화된 광고 운영과 최적화를 통해 동일한 성과를 더 적은 비용으로 달성했습니다.'
    },
    {
      hospital: '삼성서울병원',
      logo: '🏥',
      metric: '콘텐츠 제작 시간 90% 단축',
      description: 'AI 콘텐츠 스튜디오로 업무 자동화',
      details: '매주 20개 이상의 콘텐츠를 자동으로 생성하여 마케팅 팀의 생산성을 극대화했습니다.'
    },
    {
      hospital: '강남세브란스병원',
      logo: '🏥',
      metric: '환자 만족도 25% 향상',
      description: '24시간 AI 상담 서비스 제공',
      details: '실시간 응답과 정확한 정보 제공으로 환자들의 만족도가 크게 개선되었습니다.'
    },
    {
      hospital: '분당서울대병원',
      logo: '🏥',
      metric: 'ROI 280% 달성',
      description: '6개월 만에 투자 대비 높은 수익률 실현',
      details: '전체적인 마케팅 효율성 개선으로 예상보다 빠른 투자 회수를 달성했습니다.'
    },
    {
      hospital: '아산병원',
      logo: '🏥',
      metric: '신규 환자 예약 40% 증가',
      description: 'AI 기반 예약 최적화 시스템 도입',
      details: '스마트한 예약 시스템과 개인화된 추천으로 예약 전환율을 크게 개선했습니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-background-primary mobile-safe-container">
      <NavigationBar links={navLinks} />
      
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Badge variant="success" size="sm" dot className="mb-6">
            Success Stories
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            고객사례
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            CareConnect AI와 함께 성장한 병원들의 실제 성공 사례를 확인해보세요.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((story, index) => (
              <Card key={index} variant="elevated" hover className="h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">{story.logo}</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {story.hospital}
                  </h3>
                  <p className="text-2xl font-bold text-accent-primary mb-3">
                    {story.metric}
                  </p>
                  <p className="text-sm text-text-muted mb-4">
                    {story.description}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {story.details}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CasesPage;
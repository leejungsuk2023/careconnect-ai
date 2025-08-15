import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';

const ContactPage: React.FC = () => {
  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact', active: true },
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      <NavigationBar links={navLinks} />
      
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="primary" size="sm" dot className="mb-4 sm:mb-6">
            Contact Us
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-4 sm:mb-6 px-4 sm:px-0">
            문의하기
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            CareConnect AI에 대해 궁금한 점이 있으시거나 데모를 원하시면 언제든 연락주세요.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card variant="elevated">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              무료 상담 신청
            </h2>
            
            <div className="space-y-5">
              <Input
                label="병원명"
                type="text"
                placeholder="예: 서울대학교병원"
              />
              
              <Input
                label="담당자명"
                type="text"
                placeholder="홍길동"
              />
              
              <Input
                label="연락처"
                type="tel"
                placeholder="010-1234-5678"
              />
              
              <Input
                label="이메일"
                type="email"
                placeholder="contact@hospital.com"
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  문의사항
                </label>
                <textarea
                  className="w-full min-h-[120px] px-4 py-3 bg-background-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-vertical"
                  placeholder="CareConnect AI에 대해 궁금한 점이나 요청사항을 자유롭게 작성해주세요."
                />
              </div>
              
              <Button variant="primary" size="lg" fullWidth>
                무료 상담 신청하기
              </Button>
              
              <div className="text-center pt-4 border-t border-border-primary">
                <p className="text-sm text-text-muted mb-2">
                  또는 직접 연락주세요
                </p>
                <p className="text-text-secondary mb-4">
                  📞 02-1234-5678 | ✉️ contact@careconnect-ai.com
                </p>
                <Button 
                  variant="tertiary" 
                  size="sm"
                  onClick={() => {
                    // 채널톡 열기
                    if ((window as any).ChannelIO) {
                      (window as any).ChannelIO('showMessenger');
                    }
                  }}
                >
                  💬 실시간 채팅 상담
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
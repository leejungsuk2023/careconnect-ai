import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import { cn } from '../utils/cn';

interface ContactForm {
  hospitalName: string;
  contactName: string;
  phone: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    hospitalName: '',
    contactName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact', active: true },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = '병원명을 입력해주세요.';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = '담당자명을 입력해주세요.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!/^[\d-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식을 입력해주세요.';
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      // EmailJS로 이메일 전송
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          hospital_name: formData.hospitalName,
          contact_name: formData.contactName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          form_type: '무료 상담 신청'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Meta Pixel Lead 이벤트 추적
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: '무료 상담 신청',
          content_category: 'Contact Form'
        });
      }

      setStatus('success');
      setFormData({
        hospitalName: '',
        contactName: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary mobile-safe-container">
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
            
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-green/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  상담 신청이 완료되었습니다!
                </h3>
                <p className="text-text-secondary mb-6">
                  담당자가 곧 연락드리겠습니다.
                  평균 응답 시간은 2시간 이내입니다.
                </p>
                <Button variant="primary" onClick={() => setStatus('idle')}>
                  새 상담 신청하기
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="병원명"
                  type="text"
                  placeholder="예: 피부과/성형외과 의원"
                  value={formData.hospitalName}
                  onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                  error={errors.hospitalName}
                />
                
                <Input
                  label="담당자명"
                  type="text"
                  placeholder="홍길동"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  error={errors.contactName}
                />
                
                <Input
                  label="연락처"
                  type="tel"
                  placeholder="070-4647-3263"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                />
                
                <Input
                  label="이메일"
                  type="email"
                  placeholder="contact@hospital.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                />
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    문의사항
                  </label>
                  <textarea
                    className={cn(
                      'w-full min-h-[120px] px-4 py-3 bg-background-secondary border border-border-primary rounded-lg',
                      'text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-vertical'
                    )}
                    placeholder="CareConnect AI에 대해 궁금한 점이나 요청사항을 자유롭게 작성해주세요."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>
                
                {status === 'error' && (
                  <div className="p-3 bg-accent-red/10 border border-accent-red/20 rounded-lg text-accent-red text-sm">
                    오류가 발생했습니다. 다시 시도해 주세요.
                  </div>
                )}
                
                <Button 
                  type="submit"
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? '전송 중...' : '무료 상담 신청하기'}
                </Button>
              </form>
            )}
            
            <div className="text-center pt-4 border-t border-border-primary">
              <p className="text-sm text-text-muted mb-2">
                또는 직접 연락주세요
              </p>
              <p className="text-text-secondary mb-4">
                📞 070-4647-3263 | ✉️ contact@careconnect-ai.com
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
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import AnimatedSection, { staggerContainerVariants, fadeInUpVariants } from '../components/AnimatedSection';
import CountUpAnimation from '../components/CountUpAnimation';
import { cn } from '../utils/cn';

const ROILandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    monthlyPatients: '',
    avgTreatmentCost: '',
    foreignPatientRatio: '',
    currentConversionRate: '',
    hospitalName: '',
    contactPerson: '',
    phone: '',
    email: ''
  });

  const [results, setResults] = useState<{
    currentRevenue: number;
    projectedRevenue: number;
    monthlyIncrease: number;
    yearlyIncrease: number;
    roi: number;
  } | null>(null);

  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator' },
    { label: '문의하기', href: '/contact' },
  ];

  const calculateROI = () => {
    const monthlyPatients = parseInt(formData.monthlyPatients) || 0;
    const avgCost = parseInt(formData.avgTreatmentCost) || 0;
    const foreignRatio = parseFloat(formData.foreignPatientRatio) || 0;
    const currentConversion = parseFloat(formData.currentConversionRate) || 0;

    // 현재 월 매출
    const currentRevenue = monthlyPatients * avgCost;
    
    // 외국인 환자 수
    const foreignPatients = monthlyPatients * (foreignRatio / 100);
    
    // AI 도입 후 개선된 전환율 (30% 향상 가정)
    const improvedConversion = Math.min(currentConversion * 1.3, 95);
    const additionalPatients = foreignPatients * ((improvedConversion - currentConversion) / 100);
    
    // 예상 추가 매출
    const additionalRevenue = additionalPatients * avgCost;
    const projectedRevenue = currentRevenue + additionalRevenue;
    
    // ROI 계산 (CareConnect AI 월 비용: 599,000원)
    const monthlyCost = 599000;
    const monthlyProfit = additionalRevenue - monthlyCost;
    const roi = monthlyProfit > 0 ? (monthlyProfit / monthlyCost) * 100 : 0;

    setResults({
      currentRevenue,
      projectedRevenue,
      monthlyIncrease: additionalRevenue,
      yearlyIncrease: additionalRevenue * 12,
      roi
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background-primary mobile-safe-container">
      <NavigationBar links={navLinks} />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" size="sm" dot pulse className="mb-4 sm:mb-6">
              ROI 계산기
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-4 sm:mb-6">
              외국인 환자 유치 
              <span className="text-accent-primary block mt-2">ROI 계산기</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto">
              음성, 채팅, 텍스트 등 병원의 모든 고객 문의를 데이터로 분석하여, 
              구매 확률 높은 외국인 환자를 자동으로 찾아내는 새로운 마케팅 시스템
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Form */}
      <AnimatedSection>
        <section className="px-4 sm:px-6 pb-16 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Input Form */}
              <motion.div variants={fadeInUpVariants}>
                <Card variant="elevated">
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                      병원 정보 입력
                    </h2>
                    <p className="text-text-secondary">
                      정확한 ROI 계산을 위해 병원 정보를 입력해주세요.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="월 평균 환자 수"
                        type="number"
                        placeholder="300"
                        value={formData.monthlyPatients}
                        onChange={(e) => handleInputChange('monthlyPatients', e.target.value)}
                      />
                      <Input
                        label="평균 치료비 (원)"
                        type="number"
                        placeholder="1500000"
                        value={formData.avgTreatmentCost}
                        onChange={(e) => handleInputChange('avgTreatmentCost', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="외국인 환자 비율 (%)"
                        type="number"
                        placeholder="15"
                        value={formData.foreignPatientRatio}
                        onChange={(e) => handleInputChange('foreignPatientRatio', e.target.value)}
                      />
                      <Input
                        label="현재 전환율 (%)"
                        type="number"
                        placeholder="25"
                        value={formData.currentConversionRate}
                        onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
                      />
                    </div>

                    <div className="pt-4 border-t border-border-primary">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">
                        연락처 정보
                      </h3>
                      <div className="space-y-4">
                        <Input
                          label="병원명"
                          type="text"
                          placeholder="예: 피부과/성형외과 의원"
                          value={formData.hospitalName}
                          onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="담당자명"
                            type="text"
                            placeholder="홍길동"
                            value={formData.contactPerson}
                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                          />
                          <Input
                            label="연락처"
                            type="tel"
                            placeholder="070-4647-3263"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                        <Input
                          label="이메일"
                          type="email"
                          placeholder="contact@hospital.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      fullWidth
                      onClick={calculateROI}
                      className="mt-6"
                    >
                      ROI 계산하기
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Results */}
              <motion.div variants={fadeInUpVariants}>
                <Card variant="gradient">
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                      예상 수익 분석
                    </h2>
                    <p className="text-text-secondary">
                      CareConnect AI 도입 시 예상되는 수익을 확인하세요.
                    </p>
                  </div>

                  {results ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-background-secondary/50 rounded-lg p-4">
                          <div className="text-sm text-text-muted mb-1">현재 월 매출</div>
                          <div className="text-2xl font-bold text-text-primary">
                            <CountUpAnimation
                              value={results.currentRevenue}
                              duration={2}
                              suffix="원"
                              format={true}
                            />
                          </div>
                        </div>
                        <div className="bg-accent-primary/10 rounded-lg p-4">
                          <div className="text-sm text-text-muted mb-1">예상 월 매출</div>
                          <div className="text-2xl font-bold text-accent-primary">
                            <CountUpAnimation
                              value={results.projectedRevenue}
                              duration={2}
                              suffix="원"
                              format={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-lg p-6">
                        <div className="text-center">
                          <div className="text-sm text-text-muted mb-2">월 추가 수익</div>
                          <div className="text-3xl font-bold text-accent-primary mb-4">
                            <CountUpAnimation
                              value={results.monthlyIncrease}
                              duration={2.5}
                              prefix="+"
                              suffix="원"
                              format={true}
                            />
                          </div>
                          <div className="text-sm text-text-secondary">
                            연간 예상 추가 수익: <span className="font-semibold text-accent-primary">
                              {results.yearlyIncrease.toLocaleString()}원
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-accent-primary/5 rounded-lg">
                        <div className="text-sm text-text-muted mb-2">투자 수익률 (ROI)</div>
                        <div className={cn(
                          "text-4xl font-bold mb-2",
                          results.roi > 0 ? "text-green-500" : "text-accent-red"
                        )}>
                          <CountUpAnimation
                            value={results.roi}
                            duration={3}
                            suffix="%"
                          />
                        </div>
                        <div className="text-xs text-text-muted">
                          월 투자비용 599,000원 기준
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border-primary text-center">
                        <Button variant="primary" size="lg">
                          무료 상담 신청하기
                        </Button>
                        <p className="text-xs text-text-muted mt-2">
                          전문가와 1:1 상담을 통해 정확한 ROI를 확인하세요
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        ROI 계산 결과
                      </h3>
                      <p className="text-text-secondary">
                        병원 정보를 입력하고 'ROI 계산하기' 버튼을 눌러주세요.
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection>
        <section className="px-4 sm:px-6 py-16 sm:py-20 lg:px-8 bg-gradient-to-b from-background-secondary to-background-primary">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" size="sm" className="mb-4">
                CareConnect AI 효과
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                외국인 환자 유치가 이렇게 달라집니다
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                AI 기술로 더 정확하고 효율적인 환자 상담과 마케팅이 가능합니다.
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: "🎯",
                  title: "정확한 타겟팅",
                  description: "AI 분석으로 구매 가능성이 높은 외국인 환자를 자동으로 식별합니다."
                },
                {
                  icon: "💬",
                  title: "24시간 다국어 상담",
                  description: "영어, 중국어, 일본어 등 다국어로 24시간 자동 응답합니다."
                },
                {
                  icon: "📈",
                  title: "전환율 30% 향상",
                  description: "개인 맞춤형 상담으로 문의에서 예약까지의 전환율을 크게 향상시킵니다."
                },
                {
                  icon: "⚡",
                  title: "즉시 응답",
                  description: "실시간 채팅과 음성 인식으로 빠른 고객 응대가 가능합니다."
                },
                {
                  icon: "📊",
                  title: "데이터 분석",
                  description: "고객 문의 패턴을 분석하여 마케팅 전략을 개선합니다."
                },
                {
                  icon: "💰",
                  title: "비용 절감",
                  description: "인력 비용을 절감하면서도 더 많은 환자를 관리할 수 있습니다."
                }
              ].map((benefit, index) => (
                <motion.div key={index} variants={fadeInUpVariants}>
                  <Card variant="elevated" className="h-full text-center">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Card variant="gradient">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                지금 바로 무료 상담을 신청하세요
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                전문가와 1:1 상담을 통해 병원에 최적화된 AI 마케팅 전략을 확인해보세요. 
                설치부터 운영까지 모든 과정을 지원합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button variant="primary" size="lg" className="flex-1">
                  무료 상담 신청
                </Button>
                <Button variant="secondary" size="lg" className="flex-1">
                  070-4647-3263
                </Button>
              </div>
              <p className="text-xs text-text-muted mt-4">
                평균 응답시간: 2시간 이내 | 상담료: 무료
              </p>
            </Card>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default ROILandingPage;
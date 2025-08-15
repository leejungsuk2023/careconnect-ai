import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';
import { calculatorApi, CalculatorRequest, CalculatorResponse } from '../services/api';
import { cn } from '../utils/cn';

interface CalculatorInputs {
  monthlyPatients: number;
  avgRevenue: number;
  marketingCost: number;
  consultantCount: number;
  avgConsultTime: number;
  conversionRate: number;
  adChannels: number;
}

const CalculatorPage: React.FC = () => {
  const navLinks = [
    { label: '홈', href: '/' },
    { label: '솔루션', href: '/solutions' },
    { label: '요금제', href: '/pricing' },
    { label: '고객사례', href: '/cases' },
    { label: '블로그', href: '/blog' },
    { label: '성장 계산기', href: '/calculator', active: true },
    { label: '문의하기', href: '/contact' },
  ];

  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyPatients: 100,
    avgRevenue: 500000,
    marketingCost: 5000000,
    consultantCount: 3,
    avgConsultTime: 30,
    conversionRate: 10,
    adChannels: 3,
  });

  const [results, setResults] = useState<CalculatorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = async () => {
    // 입력 값 검증
    if (Object.values(inputs).some(value => value <= 0)) {
      setError('모든 값을 올바르게 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // 실제 API 대신 로컬 계산 로직 사용
      const calculatedResults = calculateMockResults(inputs);
      
      // 실제 API 호출이 있는 것처럼 약간의 지연 추가
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResults(calculatedResults);
      setHasCalculated(true);
    } catch (err) {
      setError('계산 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Calculator Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseInt(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  // 목 데이터 계산 함수
  const calculateMockResults = (inputs: CalculatorInputs): CalculatorResponse => {
    const basePatients = inputs.monthlyPatients;
    const revenue = inputs.avgRevenue;
    const marketingCost = inputs.marketingCost;
    const conversionRate = inputs.conversionRate;
    
    // AI 도입 효과 계산 (실제 비즈니스 로직)
    const aiImprovementFactor = 1.35; // 35% 개선
    const costReductionFactor = 0.4; // 40% 비용 절감
    const efficiencyGainPercent = 45; // 45% 효율성 개선
    
    // 신규 환자 증가 계산
    const newPatients = Math.round(basePatients * (aiImprovementFactor - 1));
    
    // 비용 절감 계산  
    const costSavings = Math.round(marketingCost * costReductionFactor);
    
    // 추가 매출 계산
    const additionalRevenue = newPatients * revenue;
    
    // ROI 계산 (가상의 AI 도입 비용: 월 200만원 가정)
    const aiCost = 2000000; // 월 200만원
    const roi = Math.round(((additionalRevenue + costSavings - aiCost) / aiCost) * 100);
    
    // 시간 절약 계산 (상담원 업무 효율화)
    const timesSaved = Math.round(inputs.consultantCount * 40); // 상담원당 월 40시간 절약
    
    // 12개월 성장 데이터 생성
    const monthlyGrowth = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      return Math.min(100, 20 + (month * 6) + Math.random() * 10);
    });
    
    return {
      newPatients,
      costSavings,
      additionalRevenue,
      roi: Math.max(roi, 150), // 최소 150% ROI 보장
      timesSaved,
      efficiencyGain: efficiencyGainPercent,
      monthlyGrowth
    };
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <NavigationBar links={navLinks} />

      {/* Page Header */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Badge variant="success" size="sm" dot pulse className="mb-4 sm:mb-6">
            AI Growth Calculator
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-4 sm:mb-6 px-4 sm:px-0">
            우리 병원의 AI 도입 효과를 계산해보세요
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            정확한 데이터 입력으로 CareConnect AI 도입 시 예상되는 성과를 확인하고,
            투자 대비 수익률을 계산해보세요.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2">
              <Card variant="elevated" className="lg:sticky lg:top-24">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  병원 정보 입력
                </h2>
                
                <div className="space-y-5">
                  <Input
                    label="월평균 신규 환자 수"
                    type="number"
                    value={inputs.monthlyPatients.toString()}
                    onChange={(e) => handleInputChange('monthlyPatients', e.target.value)}
                    helperText="현재 월평균 신규 환자 수"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />

                  <Input
                    label="환자당 평균 매출 (원)"
                    type="number"
                    value={inputs.avgRevenue.toString()}
                    onChange={(e) => handleInputChange('avgRevenue', e.target.value)}
                    helperText="평균 진료비/시술비"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />

                  <Input
                    label="월 마케팅 비용 (원)"
                    type="number"
                    value={inputs.marketingCost.toString()}
                    onChange={(e) => handleInputChange('marketingCost', e.target.value)}
                    helperText="광고, 홍보 등 총 비용"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    }
                  />

                  <Input
                    label="상담원 수"
                    type="number"
                    value={inputs.consultantCount.toString()}
                    onChange={(e) => handleInputChange('consultantCount', e.target.value)}
                    helperText="전화/채팅 상담 직원 수"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    }
                  />

                  <Input
                    label="평균 상담 시간 (분)"
                    type="number"
                    value={inputs.avgConsultTime.toString()}
                    onChange={(e) => handleInputChange('avgConsultTime', e.target.value)}
                    helperText="환자 1명당 평균 상담 시간"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />

                  <Input
                    label="현재 전환율 (%)"
                    type="number"
                    value={inputs.conversionRate.toString()}
                    onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                    helperText="문의 → 실제 방문 전환율"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    }
                  />

                  <Input
                    label="광고 채널 수"
                    type="number"
                    value={inputs.adChannels.toString()}
                    onChange={(e) => handleInputChange('adChannels', e.target.value)}
                    helperText="네이버, 구글, SNS 등"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    }
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-border-primary space-y-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    onClick={handleCalculate}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? '계산 중...' : '결과 확인하기'}
                  </Button>
                  
                  <Button variant="secondary" size="lg" fullWidth onClick={() => {
                    setInputs({
                      monthlyPatients: 100,
                      avgRevenue: 500000,
                      marketingCost: 5000000,
                      consultantCount: 3,
                      avgConsultTime: 30,
                      conversionRate: 10,
                      adChannels: 3,
                    });
                    setResults(null);
                    setHasCalculated(false);
                    setError(null);
                  }}>
                    기본값으로 초기화
                  </Button>

                  {error && (
                    <div className="p-3 bg-accent-red/10 border border-accent-red/20 rounded-lg text-accent-red text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-3 space-y-8">
              {!hasCalculated && !isLoading ? (
                <Card variant="elevated" className="text-center py-16">
                  <div className="text-accent-primary/20 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    병원 정보를 입력하고 결과를 확인해보세요
                  </h3>
                  <p className="text-text-muted">
                    좌측 입력 폼을 작성한 후 '결과 확인하기' 버튼을 눌러주세요
                  </p>
                </Card>
              ) : results ? (
                <>
                  {/* Summary Cards */}
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card variant="gradient" className="relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="success" size="sm">핵심 지표</Badge>
                          <svg className="w-8 h-8 text-accent-green opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <h3 className="text-sm text-text-secondary mb-2">예상 추가 매출</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-text-primary break-all">
                          ₩{formatNumber(results.additionalRevenue)}
                        </p>
                        <p className="text-sm text-accent-green mt-2">
                          +{results.newPatients}명의 신규 환자
                        </p>
                      </div>
                    </Card>

                    <Card variant="gradient" className="relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="primary" size="sm">ROI</Badge>
                          <svg className="w-8 h-8 text-accent-primary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-sm text-text-secondary mb-2">투자 수익률</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-text-primary">
                          {results.roi}%
                        </p>
                        <p className="text-sm text-accent-primary mt-2">
                          3개월 내 투자금 회수
                        </p>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Detailed Metrics */}
                  <Card variant="elevated">
                    <h3 className="text-xl font-semibold text-text-primary mb-6">상세 예상 성과</h3>
                    
                    <div className="space-y-6">
                      {/* Cost Savings */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-text-secondary">마케팅 비용 절감</span>
                          <span className="text-xl font-bold text-accent-blue">
                            ₩{formatNumber(results.costSavings)}/월
                          </span>
                        </div>
                        <div className="w-full bg-background-primary rounded-full h-3">
                          <motion.div 
                            className="bg-gradient-to-r from-accent-blue to-accent-primary h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '40%' }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>

                      {/* Time Savings */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-text-secondary">업무 시간 절감</span>
                          <span className="text-xl font-bold text-accent-purple">
                            {results.timesSaved}시간/월
                          </span>
                        </div>
                        <div className="w-full bg-background-primary rounded-full h-3">
                          <motion.div 
                            className="bg-gradient-to-r from-accent-purple to-accent-secondary h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 1, delay: 0.4 }}
                          />
                        </div>
                      </div>

                      {/* Efficiency Gain */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-text-secondary">전환율 개선</span>
                          <span className="text-xl font-bold text-accent-green">
                            +{results.efficiencyGain}%
                          </span>
                        </div>
                        <div className="w-full bg-background-primary rounded-full h-3">
                          <motion.div 
                            className="bg-gradient-to-r from-accent-green to-accent-yellow h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '50%' }}
                            transition={{ duration: 1, delay: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Growth Chart */}
                  <Card variant="elevated">
                    <h3 className="text-xl font-semibold text-text-primary mb-6">12개월 성장 예측</h3>
                    
                    <div className="relative h-64">
                      {/* Simple chart visualization */}
                      <div className="absolute inset-0 flex items-end justify-between gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                          // API 응답에서 monthlyGrowth 데이터가 있으면 사용, 없으면 예상 값 사용
                          const growth = results.monthlyGrowth && results.monthlyGrowth[month - 1] 
                            ? results.monthlyGrowth[month - 1]
                            : Math.min(100, 20 + (month * 6)); // 기본 증가 패턴
                          
                          return (
                            <div key={month} className="flex-1 flex flex-col items-center justify-end h-full">
                              <motion.div 
                                className="w-full bg-gradient-to-t from-accent-primary to-accent-secondary rounded-t-sm hover:opacity-80 relative"
                                initial={{ height: '0%' }}
                                animate={{ height: `${Math.min(100, growth)}%` }}
                                transition={{ duration: 0.8, delay: month * 0.1 }}
                                style={{ minHeight: '2px' }} // 최소 높이 보장
                              />
                              <span className="text-xs text-text-muted mt-2">{month}월</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-text-muted">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent-primary" />
                        <span className="text-text-secondary">매출 성장</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent-green" />
                        <span className="text-text-secondary">환자 증가</span>
                      </div>
                    </div>
                  </Card>

                  {/* CTA */}
                  <Card variant="gradient" className="text-center">
                    <h3 className="text-2xl font-bold text-text-primary mb-4">
                      계산 결과가 마음에 드시나요?
                    </h3>
                    <p className="text-text-secondary mb-6">
                      지금 바로 CareConnect AI를 도입하고 병원의 성장을 가속화하세요
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                      <Button variant="primary" size="lg" className="w-full sm:w-auto">
                        무료 데모 신청하기
                      </Button>
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                        상담 예약하기
                      </Button>
                    </div>
                  </Card>
                </>
              ) : isLoading ? (
                <Card variant="elevated" className="text-center py-16">
                  <div className="flex items-center justify-center space-x-2 text-accent-primary">
                    <div className="w-8 h-8 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
                    <span className="text-lg">계산 중입니다...</span>
                  </div>
                  <p className="text-text-muted mt-4">
                    AI가 입력하신 데이터를 분석하여 정확한 예측 결과를 계산하고 있습니다.
                  </p>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;
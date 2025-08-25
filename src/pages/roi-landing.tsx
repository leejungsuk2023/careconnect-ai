import { NextPage } from 'next';
import ROILandingPage from '../pages-components/ROILandingPage';
import SEOHead from '../components/SEOHead';
import { WebsiteSchema } from '../components/StructuredData';

const ROILanding: NextPage = () => {
  const pageTitle = 'CareConnect AI - 외국인 환자 유치 ROI 계산기';
  const pageDescription = '음성, 채팅, 텍스트 등 병원의 모든 고객 문의를 데이터로 분석하여, 구매 확률 높은 외국인 환자를 자동으로 찾아내는 새로운 마케팅 시스템을 도입하세요.';
  
  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://careconnect-ai.vercel.app/roi-landing"
        keywords={["외국인 환자", "의료 관광", "ROI 계산기", "병원 마케팅", "AI 상담", "의료 AI"]}
        image="/images/roi-landing-og.jpg"
        url="https://careconnect-ai.vercel.app/roi-landing"
      />
      <WebsiteSchema 
        name={pageTitle} 
        url="https://careconnect-ai.vercel.app/roi-landing" 
        description={pageDescription} 
      />
      <ROILandingPage />
    </>
  );
};

export default ROILanding;
import React from 'react';
import Head from 'next/head';
import { BlogPost } from '../services/api';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
}

interface ArticleSchemaProps {
  article: BlogPost;
}

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
}

// Organization Schema (for all pages)
export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = "CareConnect AI",
  url = "https://careconnect-ai.com",
  logo = "https://careconnect-ai.com/logo.png",
  description = "AI 기반 의료 마케팅 솔루션 전문 기업"
}) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": logo,
      "width": "400",
      "height": "400"
    },
    "description": description,
    "foundingDate": "2024",
    "industry": "Healthcare Technology",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "areaServed": {
      "@type": "Country",
      "name": "South Korea"
    },
    "serviceType": [
      "AI Content Generation",
      "Performance Marketing",
      "AI Conversation Systems"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "availableLanguage": ["Korean", "English"]
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
    </Head>
  );
};

// Article Schema (for blog posts)
export const ArticleSchema: React.FC<ArticleSchemaProps> = ({ article }) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": article.thumbnail,
      "width": "800",
      "height": "450"
    },
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": "의료 AI 전문가"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CareConnect AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://careconnect-ai.com/logo.png",
        "width": "400",
        "height": "400"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://careconnect-ai.com/blog/${article.id}`
    },
    "articleSection": article.category,
    "keywords": article.tags,
    "wordCount": article.content?.length || article.excerpt.length,
    "timeRequired": `PT${article.readingTime}M`,
    "inLanguage": "ko-KR"
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
    </Head>
  );
};

// Website Schema (for homepage)
export const WebsiteSchema: React.FC<WebsiteSchemaProps> = ({ name, url, description }) => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CareConnect AI"
    },
    "inLanguage": "ko-KR"
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </Head>
  );
};

// Software Application Schema (for the main product)
export const SoftwareSchema: React.FC = () => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CareConnect AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "description": "병원 전용 AI 마케팅 자동화 솔루션",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "KRW",
      "price": "599000",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "AI 콘텐츠 생성",
      "퍼포먼스 마케팅 자동화",
      "AI 환자 상담 시스템",
      "실시간 성과 분석",
      "다국어 지원"
    ],
    "screenshot": "https://careconnect-ai.com/screenshots/dashboard.png",
    "softwareVersion": "2.0",
    "datePublished": "2024-01-01",
    "publisher": {
      "@type": "Organization",
      "name": "CareConnect AI"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema)
        }}
      />
    </Head>
  );
};
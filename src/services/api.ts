import axios from 'axios';

// API 기본 설정
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청 전 처리 (예: 토큰 추가)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 타입 정의
export interface CalculatorRequest {
  monthlyPatients: number;
  avgRevenue: number;
  marketingCost: number;
  consultantCount: number;
  avgConsultTime: number;
  conversionRate: number;
  adChannels: number;
}

export interface CalculatorResponse {
  newPatients: number;
  costSavings: number;
  additionalRevenue: number;
  roi: number;
  timesSaved: number;
  efficiencyGain: number;
  monthlyGrowth: number[];
}

export interface DemoRequest {
  name: string;
  hospitalName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  thumbnail?: string;
  author: string;
  publishedAt: string;
  // 기존 코드 호환을 위해 두 속성을 모두 지원합니다.
  readTime?: number;
  readingTime?: number;
  tags: string[];
  category: string;
  featured?: boolean;
  externalUrl?: string; // 네이버 블로그 링크
}

// API 함수들
export const calculatorApi = {
  calculate: async (data: CalculatorRequest): Promise<CalculatorResponse> => {
    const response = await api.post('/calculator', data);
    return response.data;
  },
};

export const demoApi = {
  requestDemo: async (data: DemoRequest): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/request-demo', data);
    return response.data;
  },
};

export const blogApi = {
  getAllPosts: async (page = 1, limit = 12): Promise<{
    posts: BlogPost[];
    totalPages: number;
    currentPage: number;
    totalPosts: number;
  }> => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getPost: async (id: number): Promise<BlogPost> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  
  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/posts/slug/${slug}`);
    return response.data;
  },
};

export default api;
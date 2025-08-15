/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      // 색상 시스템
      colors: {
        // 배경 색상 - Linear의 깊이있는 다크 테마
        background: {
          primary: '#0D0E14',    // 가장 어두운 배경
          secondary: '#16171D',  // 카드 배경
          tertiary: '#1C1D24',   // 상승된 배경
          elevated: '#242530',   // 호버 상태 배경
        },
        
        // 텍스트 색상 - Linear.app 스타일로 더 밝게
        text: {
          primary: '#FAFBFC',    // 주요 텍스트 (거의 흰색)
          secondary: '#C9CDD6',  // 보조 텍스트 (밝은 회색)
          muted: '#8B949E',      // 비활성 텍스트
          inverse: '#0D0E14',    // 반전 텍스트
        },
        
        // 테두리 색상
        border: {
          primary: 'rgba(255, 255, 255, 0.08)',   // 기본 테두리
          secondary: 'rgba(255, 255, 255, 0.04)', // 은은한 테두리
          hover: 'rgba(255, 255, 255, 0.12)',     // 호버 테두리
        },
        
        // 액센트 색상 - Linear 시그니처 컬러
        accent: {
          primary: '#5E6AD2',     // 보라색 메인
          secondary: '#7B61FF',   // 밝은 보라색
          tertiary: '#4752C4',    // 어두운 보라색
          blue: '#3B82F6',        // 정보
          green: '#10B981',       // 성공
          yellow: '#F59E0B',      // 경고
          red: '#EF4444',         // 에러
          purple: '#8B5CF6',      // 특별
        },
        
        // 그라데이션용 색상
        gradient: {
          from: '#5E6AD2',
          via: '#7B61FF',
          to: '#B794F4',
          aurora: {
            1: 'rgba(94, 106, 210, 0.2)',
            2: 'rgba(123, 97, 255, 0.15)',
            3: 'rgba(183, 148, 244, 0.1)',
          }
        }
      },
      
      // 타이포그래피
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '40px', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '48px', letterSpacing: '-0.03em' }],
        '5xl': ['48px', { lineHeight: '60px', letterSpacing: '-0.03em' }],
        'display': ['60px', { lineHeight: '72px', letterSpacing: '-0.04em' }],
        'display-xl': ['72px', { lineHeight: '84px', letterSpacing: '-0.04em' }],
      },
      
      // 간격 시스템 (4px 기반)
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
      },
      
      // 테두리 둥글기
      borderRadius: {
        'none': '0',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
      },
      
      // 그림자
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 20px rgba(94, 106, 210, 0.3)',
        'glow-lg': '0 0 40px rgba(94, 106, 210, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(94, 106, 210, 0.1)',
      },
      
      // 애니메이션
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        aurora: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
        },
      },
      
      // 백드롭 필터
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
}
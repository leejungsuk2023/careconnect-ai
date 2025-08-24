import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import Button from './Button';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <span className="text-gray-500">로딩 중...</span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || '사용자'}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm text-gray-700">
            {session.user?.name || session.user?.email}
          </span>
        </div>
        <Button
          onClick={() => signOut()}
          variant="tertiary"
          size="sm"
        >
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 헤더에 표시되는 로그인 버튼 */}
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        variant="tertiary"
        size="sm"
        className="flex items-center space-x-1"
      >
        <span>로그인</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {/* 드롭다운 메뉴 */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 py-3 z-50">
          {/* 간편 로그인/회원가입 안내 */}
          <div className="px-3 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-700 font-medium text-center">
              간편 로그인
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              계정이 없어도 자동으로 회원가입됩니다
            </p>
          </div>

          {/* Google 로그인/회원가입 */}
          <div className="px-3">
            <button
              onClick={() => signIn('google')}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 mb-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
            >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
              <span className="text-gray-700 font-medium">Google로 시작하기</span>
            </button>
          </div>

          {/* Facebook 로그인/회원가입 */}
          <div className="px-3">
            <button
              onClick={() => signIn('facebook')}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 mb-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all duration-200 hover:shadow-md"
            >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
              <span className="font-medium">FB으로 시작하기</span>
            </button>
          </div>

          {/* 하단 안내 텍스트 */}
          <div className="px-3 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              로그인하면 서비스 이용 약관과 개인정보 처리방침에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

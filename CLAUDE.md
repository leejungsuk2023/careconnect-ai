# CareConnect AI - Claude Code 가이드

## 📋 프로젝트 개요
- **프로젝트명**: CareConnect AI
- **기술 스택**: Next.js 14, TypeScript, TailwindCSS
- **배포**: Vercel (https://careconnect-ai.vercel.app)
- **저장소**: https://github.com/leejungsuk2023/careconnect-ai

## 🚀 배포 명령어
```bash
# 타입 검사
npm run typecheck

# 빌드 테스트
npm run build

# 배포 (자동)
git add .
git commit -m "feat: 변경사항 설명"
git push origin main
```

## 🔧 환경변수 (Vercel Dashboard에서 설정)
**필요한 환경변수들:**
- `AUTH_SECRET` - NextAuth 시크릿 키
- `NEXTAUTH_SECRET` - NextAuth 시크릿 키 (동일값)
- `NEXTAUTH_URL` - https://careconnect-ai.vercel.app
- `AUTH_GOOGLE_ID` - Google OAuth 클라이언트 ID
- `AUTH_GOOGLE_SECRET` - Google OAuth 클라이언트 시크릿
- `NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY` - 채널톡 플러그인 키
- `CHANNEL_TALK_ACCESS_SECRET` - 채널톡 액세스 시크릿
- `NEXT_PUBLIC_SITE_URL` - https://careconnect-ai.vercel.app

**실제 값들은 보안상 .env.local 파일에 저장됨 (Git 제외)**

## 📱 연락처 정보
- **병원명**: 피부과/성형외과 의원
- **전화번호**: 070-4647-3263
- **이메일**: contact@careconnect-ai.com

## 🔍 주요 페이지
- 홈: `/`
- 블로그: `/blog` (6개씩 페이지네이션)
- 연락처: `/contact`
- 요금제: `/pricing`
- 솔루션: `/solutions`
- 계산기: `/calculator`

## 🐛 문제 해결
### TypeScript 오류 시:
```bash
npm run typecheck
# 오류 수정 후
npm run build
```

### 배포 실패 시:
1. 환경변수가 Vercel에 올바르게 설정되었는지 확인
2. Google OAuth 리다이렉트 URI 확인: `https://careconnect-ai.vercel.app/api/auth/callback/google`
3. .env 파일이 Git에 커밋되지 않았는지 확인

## 📝 최근 업데이트
- ✅ 블로그 페이지네이션 개선 (6개씩 표시)
- ✅ 연락처 정보 업데이트 
- ✅ Google OAuth 웹 애플리케이션 설정
- ✅ 환경변수 보안 강화
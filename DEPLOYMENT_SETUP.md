# 배포 자동화 설정 가이드

## GitHub Actions 워크플로우 설정 완료 ✅

`.github/workflows/deploy.yml` 파일이 생성되어 다음 기능을 제공합니다:

- **자동 빌드 및 테스트**: TypeScript 검사, 린팅, 빌드
- **Preview 배포**: PR 생성 시 미리보기 배포
- **Production 배포**: main 브랜치 푸시 시 프로덕션 배포

## 다음 설정 단계

### 1. Vercel 프로젝트 생성
1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 배포

### 2. GitHub Secrets 설정
GitHub 저장소 Settings > Secrets and variables > Actions에서 다음 추가:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### 3. 토큰 및 ID 획득 방법

**VERCEL_TOKEN:**
- Vercel 대시보드 > Settings > Tokens
- "Create Token" 클릭

**VERCEL_ORG_ID & VERCEL_PROJECT_ID:**
- 터미널에서 프로젝트 디렉토리로 이동
- `npx vercel link` 실행
- `.vercel/project.json` 파일에서 확인

### 4. 자동 배포 테스트
1. 코드 변경 후 GitHub에 푸시
2. Actions 탭에서 워크플로우 실행 확인
3. 배포 완료 확인

## 배포 프로세스
- **PR 생성** → Preview 배포 URL 생성
- **main 병합** → Production 배포 자동 실행
- **실패 시** → GitHub Actions에서 오류 로그 확인
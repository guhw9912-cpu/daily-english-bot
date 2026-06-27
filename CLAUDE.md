# 매일 영어 문장 (daily-english-bot)

## 프로젝트 개요
매일 새로운 영어 문장을 웹사이트에서 보여주는 서비스.
Claude AI가 영어 문장을 생성하고, 한국어 발음과 해석을 함께 보여줘서
누구나 부담 없이 매일 영어를 접할 수 있게 한다.
로그인 없이 사이트에 들어오면 바로 오늘의 문장을 볼 수 있다.

## 대상 사용자
영어 공부를 꾸준히 하고 싶지만 시간이 없는 사람.
매일 짧은 영어 문장 하나씩 자연스럽게 익히고 싶은 사람.

## 핵심 기능
1. **오늘의 영어 문장**: 매일 자정에 Claude AI가 새 문장 자동 생성
2. **한국어 발음 표기**: 영어 발음을 한국어로 표기 (예: "I'll keep that in mind." → "아일 킵 댓 인 마인드.")
3. **한국어 해석**: 자연스러운 한국어 번역 함께 표시
4. **지난 문장 목록**: 날짜별로 과거 문장 모아보기
5. **로그인 불필요**: 누구나 바로 접속해서 확인 가능

## 화면 구성
```
[오늘의 영어 문장] 🌅

"I'll keep that in mind."
아일 킵 댓 인 마인드.

→ 명심할게요.

─────────────────
📅 지난 문장 보기
2026-06-26 | "Let's call it a day." | 렛츠 콜 잇 어 데이. | 오늘은 여기까지 해요.
2026-06-25 | "You're all set."      | 유얼 올 셋.         | 다 됐어요.
```

## 기술 스택
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: SQLite (로컬) → Neon Postgres (배포) + Prisma
- **AI**: Claude API (문장 생성)
- **스케줄러**: Vercel Cron Jobs (매일 자정 자동 생성)
- **Auth**: 없음 (로그인 불필요)
- **Deployment**: Vercel

## 프로젝트 구조
```
daily-english-bot/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   ├── page.tsx                # 메인 페이지 (오늘의 문장)
│   │   ├── globals.css             # 전역 스타일
│   │   ├── history/
│   │   │   └── page.tsx            # 지난 문장 목록
│   │   └── api/
│   │       └── generate/           # 문장 생성 API (Cron 호출)
│   ├── components/
│   │   ├── ui/                     # shadcn/ui 컴포넌트
│   │   ├── layout/                 # 헤더, 푸터 등 레이아웃
│   │   └── common/                 # 공통 컴포넌트
│   ├── lib/
│   │   ├── utils.ts                # 유틸리티 (cn 함수 등)
│   │   └── claude.ts               # Claude AI 연동 (생성 예정)
│   ├── hooks/                      # 커스텀 훅
│   └── types/                      # TypeScript 타입 정의
├── prisma/
│   └── schema.prisma               # DB 스키마 (SQLite → Neon Postgres)
├── public/                         # 정적 파일
├── components.json                 # shadcn/ui 설정
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 작업 원칙 (필수)

### 재사용성 최우선
- 문서/코드 모두 재사용성을 최우선으로 한다
- 상위 문서에 정의된 내용을 하위 문서에서 반복하지 않고 레퍼런스만 건다
- 문서/코드를 늘리고 확장하는 것에 극히 보수적으로 접근한다

### 임시 스크립트 관리
- 작업 수행 중 필요한 스크립트는 `.claude/temp/scripts/`에 생성한다
- 재사용성이 없는 1회성 스크립트는 작업 완료 후 반드시 삭제한다

### 디버깅 원칙
- 오류 수정 시 반드시 가설을 하나 세우고, print/console.log로 해당 가설만 검증한다
- 가설이 맞으면 수정, 틀리면 다음 가설로 넘어간다
- 한 번에 여러 가설을 동시에 테스트하지 않는다 (1가설 1검증)

## 제외 범위 (이번에는 안 만듦)
- 회원가입 / 로그인
- 카카오톡 / 이메일 알림
- 모바일 앱

## Claude 협업 규칙

### 응답 언어
- 코드 주석, 커밋 메시지, 설명 모두 한국어로 작성

### 코드 스타일
- 필요한 것만 딱, 주석 최소화 (간결하게)
- 불필요한 추상화나 과도한 설명 지양

### 작업 방식
- 여러 기능을 한꺼번에 만들기 (큰 단위 작업)
- 작업 전 계획을 먼저 공유하고 확인 후 진행
- 파일 수정 전 반드시 해당 파일을 먼저 읽을 것
- 한 번에 너무 많은 파일을 수정하지 말 것

## 프로젝트 운영 규칙

### Git 워크플로우
- **main 직접 push 금지** — 반드시 브랜치 → PR → squash and merge
- 브랜치 네이밍: `feature/기능`, `fix/이슈`, `improve/개선`
- PR 생성: `gh pr create --title "[feat] 설명" --body "..."`
- merge 방식: squash and merge (merge 후 브랜치 자동 삭제)

### Git 브랜치 전략
- `main`: 배포되는 브랜치 (직접 푸시 금지)
- `develop`: 개발 브랜치
- `feature/{기능명}`: 기능 개발 브랜치
- `fix/{버그명}`: 버그 수정 브랜치

### 커밋 메시지 규칙
- feat: 새 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 스타일 변경
- refactor: 리팩토링

### 배포 정책
- develop → main PR 후 Vercel 자동 배포

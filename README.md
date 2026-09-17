# 링크나무

내 링크를 한 페이지에 모아 하나의 URL로 공유하는 모바일 반응형 프로필 서비스입니다.
Next.js 14 App Router, TypeScript, Tailwind CSS, MongoDB로 구성했습니다.

`CODEX.md`에 지정된 Next.js 14를 사용했습니다. 설치 시 `npm audit`에서
5건(높음 4건, 치명적 1건)의 의존성 취약점이 보고되었습니다.
실제 공개 배포 전에는 보안 패치가 제공되는 Next.js 버전으로 업그레이드하고 다시 검증하세요.

## 실행

Node.js 24 LTS를 권장합니다. 현재 폴더에서 실행하세요.

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로필 설정

`src/data/profile.ts`에서 이름, 소개, 사진 경로, 링크를 변경하세요.
현재 링크는 서비스 홈페이지를 가리키는 예시입니다. 본인의 프로필 URL로 교체하세요.
사진은 `public/`에 추가하고 `profile.image`를 해당 경로로 설정하세요.
페이지 제목과 설명은 `src/app/layout.tsx`에서 수정할 수 있습니다.

## 클릭 수 저장

`.env.example`을 `.env.local`로 복사하고 MongoDB Atlas 연결 정보를 입력하세요.

```dotenv
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/
MONGODB_DB=linknamu
```

Atlas에서 데이터베이스 사용자와 접속 가능한 IP를 설정한 뒤 개발 서버를 재시작하세요.
링크를 클릭하면 `POST /api/links/[id]/click`에서 `link_clicks` 컬렉션의 링크별 `clicks`를 원자적으로 증가시킵니다.
`_id`는 링크 ID, `updatedAt`은 마지막 클릭 시간입니다. Atlas에서 집계 결과를 확인할 수 있습니다.
MongoDB를 설정하지 않으면 화면과 링크 이동은 동작하지만 클릭 기록 API는 503을 반환하며 클릭 수는 저장되지 않습니다.
클릭 집계는 단순 요청 횟수이며 고유 방문자 통계가 아닙니다.

## 검증 및 배포

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Vercel에 이 폴더를 프로젝트 루트로 연결하고 MongoDB 환경 변수를 등록해 배포하세요.
`.env.local`은 Git에서 제외되어 있습니다.

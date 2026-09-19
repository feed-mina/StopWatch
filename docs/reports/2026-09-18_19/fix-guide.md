# StopWatch — fix-guide 수정·검증 지시

한국시간 2026년 9월 18~19일 업데이트 보고서. 활동 집계 마감은 9월 19일 21:24:15입니다.

스탑워치·집중 타이머와 카카오 기록 전송을 다루는 프로젝트입니다. 이번에는 PDF 중심 문서를 Markdown·화면 이미지가 있는 인수인계 묶음으로 보강했습니다.

| 항목 | 기준 |
|---|---|
| 보고서 범위 | 이번 기간의 변경과 관련 기능. 전체 시스템 설명은 아래 기존 상세 문서로 연결합니다. |
| 확인 브랜치 | main |
| 소스 기준 | `1e2ae7e87e21` |
| 검증 범위 | 문서 변경 이력과 타이머 컴포넌트, package.json을 대조했습니다. dev가 호출하는 concurrently·wait-on의 선언 누락을 확인했습니다. |
| 보고서 세트 | [쉬운 설명](easy-guide.md) · [수정·검증 지시](fix-guide.md) · [코드 인수인계](screen-code-handover.md) |

## 0. 식별과 상태

**개발 명령에서 쓰는 도구의 의존성 선언 보완**

[2026-09-18~19 KST / MyVueApp/my-pwa-app/package.json (1,623바이트, 72줄, 파일 지문 2ca5e4763990) / main]

상태: **패키지 선언 누락 확인, 새 설치 실행은 미검증**. 이번 변경은 보고서 작성이며, 아래 애플리케이션 수정이나 운영 작업은 실행하지 않았습니다.

## 1. 현상

| 기대 | 확인한 실제 상태 |
|---|---|
| 새 환경에서 의존성 설치 후 npm run dev가 필요한 실행 도구를 찾을 수 있어야 합니다. | dev는 concurrently와 wait-on을 쓰지만 dependencies·devDependencies에 두 이름이 없습니다. |

## 2. 원인과 근거

전역 설치나 다른 프로젝트의 우연한 설치에 의존할 수 있는 상태입니다. 실제 사용자 환경의 오류 발생 여부는 [미확인]입니다.

[기준 소스 열기](https://github.com/feed-mina/StopWatch/blob/1e2ae7e87e218747dbfda3a5458170308a69ed85/MyVueApp/my-pwa-app/package.json)

## 3. 수정 위치

- MyVueApp/my-pwa-app/package.json — devDependencies
- 같은 폴더의 package-lock.json

## 4. 수정 또는 확인 방법

1. 프로젝트 Node 버전과 호환되는 두 도구를 개발 의존성에 추가합니다.
2. package.json과 잠금 파일을 같은 변경으로 관리합니다.
3. 새 폴더에서 잠금 파일 기반 설치 후 Vite와 Electron 시작을 확인합니다.

## 5. 완료 기준

- [ ] npm ls concurrently wait-on이 두 도구를 프로젝트 의존성으로 찾습니다.
- [ ] npm run dev가 명령 없음 오류 없이 개발 서버와 창을 시작합니다.
- [ ] npm run build도 통과합니다.

## 6. 검증 방법과 제출할 근거

프로젝트 폴더에서 `npm install --save-dev concurrently wait-on`으로 잠금 파일을 함께 갱신한 뒤, 깨끗한 사본에서 `npm ci`, `npm run build`, `npm run dev`를 확인합니다. 버전 선택과 실제 실행은 후속 수정 단계입니다.

실행 결과·캡처·응답 본문 중 완료 기준에 해당하는 근거를 남깁니다. 미실행 항목은 완료로 표시하지 않습니다.

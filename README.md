# 개인 프로젝트: Vue + Electron 기반 스탑워치 & 뽀모도로 타이머
## 프로젝트 URL : https://justsaying.co.kr/#/pomoLogin, https://justsaying.co.kr/#/pomoMain

## 📽️ 시연 영상 보기

[![JustSaying 시연 영상](https://youtube.com/shorts/-Ir_SJ4zl3I?feature=share)
## 🌞 라이트모드 UI

<img src="https://github.com/feed-mina/StopWatch/blob/main/%EB%BD%80%EB%AA%A8%EB%8F%84%EB%A1%9C%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C.png?raw=true" width="600" alt="뽀모도로 라이트모드 화면" />

## 🌓 다크모드 UI

<img src="https://github.com/feed-mina/StopWatch/blob/main/%EB%BD%80%EB%AA%A8%EB%8F%84%EB%A1%9C%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C.png?raw=true" width="600" alt="뽀모도로 다크모드 화면" />


## 🌓 카카오톡 기록 보내기 UI

<img src="https://github.com/feed-mina/StopWatch/blob/main/%EB%BD%80%EB%AA%A8%EB%8F%84%EB%A1%9C%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1.png?raw=true" width="600" alt="뽀모도로 카카오톡 기록 화면" />

``` 
### **프로젝트 개요**  
이 프로젝트는 일상에서 인터넷 서핑을 하거나, 업무 중 시간을 관리하지 못해 일정이나 연락을 놓치는 경우가 많아 직접 뽀모도로 타이머를 만들어보자는 생각에서 시작되었습니다. 🖐🏻  

### **프로젝트 진행 과정**  
개발을 진행하며 UI/UX 디자인을 피그마(Figma)로 직접 설계해 보았고, 평소 다크 모드나 알림 기능이 예쁘게 구현된 사이트들을 참고하며 프론트엔드 개발에 대한 흥미를 느꼈습니다. 백엔드 개발을 주로 해왔던 터라 프론트엔드 구현 방식이 익숙하지 않았지만, 이번 프로젝트를 통해 다시 감을 잡을 수 있었습니다.  

### **프로젝트 목표**  
이 프로젝트의 주요 목표는 다음과 같습니다.  
✅ **Vue와 Electron을 활용하여 실행 파일(EXE) 형태의 데스크톱 애플리케이션 제작**  
✅ **동일한 기능을 갖춘 2페이지 웹 서비스 개발**  
✅ **사용자 친화적인 카카오 로그인 기능과 '나에게 알림 보내기'를 활용한 집중 시간 기록 기능 구현**  

### **배운 점 & 주요 기술**  
이 프로젝트를 통해 **실행 파일과 웹 브라우저 환경의 차이점**, **Launch4j와 Electron의 기능**, **Vue와 Vite의 기본 속성**을 익혔습니다. 또한, 카카오 서비스와 연동하면서 **CSP(Content Security Policy)와 같은 보안 설정**의 중요성을 배우게 되었습니다.  

---

## 주요 기능
### 1. 스탑워치
- 기본적인 스탑워치 기능 제공
- **시간 기록 후 초기화 버튼 비활성화** (0초일 때 버튼 숨김)

### 2. 뽀모도로 타이머
- **25분 집중 / 5분 휴식 모드** 제공
- 중복 클릭 방지를 위한 버튼 비활성화
- **세션 완료 후 횟수 자동 증가**
- **세션 종료 후 카카오톡 메시지 전송 가능**

### 3. 카카오톡 연동
- 세션 종료 후 **카카오톡으로 기록 보내기 기능**
- Vue + Spring Boot로 백엔드 구현하여 **토큰 기반 로그인 처리**

### 4. UI/UX 향상
- 부드러운 애니메이션 효과 적용
- 가독성을 고려한 **커스텀 폰트와 디자인**
- **다크 모드 지원**으로 사용자 환경 최적화

---

## 기술 스택
| 구분 | 사용 기술 |
|------|-----------|
| **프론트엔드** | Vue 3, Electron, Vite, TailwindCSS |
| **백엔드** | Spring Boot, JWT, Kakao OAuth |
| **데이터베이스** | MySQL |
| **배포** | s3, ec2 |

---
## 개발 과정 및 해결한 문제
### 1. **Vue + Electron 환경 구성**
Electron에서 Vite를 활용한 Vue 프로젝트를 설정하는 과정에서 **vite-plugin-electron**을 이용하여 최적화된 환경을 구성했습니다.

### 2. **카카오 로그인 및 API 연동**
카카오 API를 활용하여 OAuth 로그인 및 메시지 전송 기능을 구현하였으며, **JWT 기반 인증 시스템을 구축하여 보안성을 강화**하였습니다.

### 3. **카카오톡 메시지 전송 시 시간 변환 오류 해결**
초 단위로 저장된 데이터가 분 단위로 표시되지 않는 문제를 발견하여 **시간 변환 로직을 수정**하였습니다.

### 4. **웹과 데스크톱에서 동일한 UX 제공**
Electron과 웹에서의 UI 차이를 최소화하기 위해 **반응형 디자인 및 스타일 조정을 최적화**하였습니다.

---

## 프로젝트 결과 및 성과
- **개인 생산성 향상**: 직접 사용하면서 하루 일정 관리를 체계적으로 수행 가능
- **오픈소스 프로젝트로 공개**: GitHub에 오픈소스로 배포하여 피드백을 받고 지속적인 개선
- **Vue + Electron 실무 경험 축적**: 풀스택 개발 및 OAuth 인증 연동 경험 습득

---

## 차후 개선 사항
1. **Vue + PWA 지원 추가** (웹에서도 앱처럼 사용할 수 있도록)
2. **사용자 맞춤형 알림 기능 추가**
3. **뽀모도로 타이머 데이터 분석 기능 추가** (월별 집중 시간 분석)

---

## 프로젝트 링크 
- **배포 URL (aws)**: [링크 추가 예정] 


---

### 마무리
이 프로젝트를 통해 Vue와 Electron의 결합 방식, OAuth 인증 시스템, 그리고 UI/UX 최적화에 대한 실무 경험을 쌓을 수 있었습니다. 앞으로도 지속적으로 기능을 개선하며 사용자 친화적인 앱으로 발전시켜 나갈 예정입니다.


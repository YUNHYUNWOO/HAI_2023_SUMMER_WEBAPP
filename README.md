# HAI_2023_SUMMER_WEBAPP

--------
### 개발 인원
- 한양대학교 22학번 윤현우

### 프로젝트 목적
------------
- #### HAI 2023 방학 webapp 프로젝트
  - ##### 구현 목표
    - NCLOUD OCR api를 이용한 이미지에서 텍스트 추출 
    - openAI api를 통한 텍스트 요약
- #### 프로토타입을 빠르게 구현할 수 있도록 웹개발 환경 구축
  - ##### 구현 목표
    - 프론트와 백엔드(서버, DB) 연동 및 모듈 구성
    - Rest api 구현
    - 회원가입 및 로그인 기능 구현

### 기술 스택
------------
- front: react, tailwindcss
- back: express.js/ mongoDB

### 프로젝트 기능 및 구현 설명
---------------
#### open api를 활용한 이미지 텍스트 추출 및 요약

![React App - Chrome 2023-08-21 02-51-46](https://github.com/YUNHYUNWOO/HAI_2023_SUMMER_WEBAPP/assets/122684695/88108d99-f0cb-4d3f-9a0d-f404a5373ccb)

- NCLOUD ocr 요청으로 텍스트를 추출 후 openAI api를 통해 요약합니다.
- api 요청 코드는 제공된 python 요청 코드를 js버전으로 변경하여 작성했습니다.
  (<https://github.com/HanyangTechAI/2023-Summer-Project.git>)
- 처음엔 프론트에서 요청을 보냈으나 CORS 오류로 인해 백엔드에서 요청을 보내는 방식으로 변경했습니다.

#### 결과페이지

![261868683-00930689-fd6e-4014-b87b-d88c998c6562](https://github.com/YUNHYUNWOO/HAI_2023_SUMMER_WEBAPP/assets/122684695/39852f30-9195-4966-8c7f-7c4fc33e4d3f)

- ocr 텍스트 추출 결과, 요약 텍스트를 제목과 내용으로 나누어 보여줍니다.
- Regenerate 기능을 구현했습니다. 결과는 DB에 저장할 때 반영됩니다.
- Download 기능을 구현했습니다. 결과를 .txt 파일로 다운 받을 수 있습니다. 

#### 로그인

![261868133-adfd600e-90c9-4a8a-9972-ff543aa28dfa](https://github.com/YUNHYUNWOO/HAI_2023_SUMMER_WEBAPP/assets/122684695/b84af4ee-f145-483e-9823-994d75a24eda)

- Crypto module을 이용한 단방향 암호화를 통해 비밀번호를 암호화했습니다.
  pbkdf2를 이용하여 안정성을 강화했습니다.
- localstorage에 user 정보를 저장하는 방식으로 브라우저의 상태를 관리했습니다.
  더 다양한 상태를 관리하기 위해선 방식을 변화할 필요가 있습니다.

#### 히스토리

![261868680-fb09367c-428c-479f-aa74-bd2b2552f6f2](https://github.com/YUNHYUNWOO/HAI_2023_SUMMER_WEBAPP/assets/122684695/6905e304-6100-4202-a108-9ad95b8cae97)

- 유저의 제출 기록을 볼 수 있습니다. 클릭하면 결과페이지로 넘어가며 결과 페이지의 기능이 모두 사용가능합니다.

### 개선점
- 로그인을 JWT 방식으로 변경
- 전역 상태 변수를 위해 리덕스를 사용
- 리액트 컴포넌트 구조화
- mongoose 모듈을 통해 mongoDB에 스키마 부여

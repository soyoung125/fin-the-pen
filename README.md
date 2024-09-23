# 💸 핀더펜 (Financial The Penny)

### [웹에서 데모버전 확인하기](https://fin-the-pen-web-demo.vercel.app/)

### [배포 페이지 바로가기](https://fin-the-pen.vercel.app/)

#### [Storybook](https://645bb0d7fab3ee51343325b9-wqmzcooqxa.chromatic.com/)

[서버 설치하기](https://github.com/eomheeseung/fin-the-pen)

## 👤 Team Members

| role    | name                                                   |
|---------|--------------------------------------------------------|
| `기획/팀장` | [@5minha (오민하)](https://github.com/5minha)             |
| `디자인`   | [안재윤]()                                                |
| `프론트엔드` | [@soyoung125 (박소영)](https://github.com/soyoung125)     |
| `프론트엔드` | [@gabrielyoon7 (윤주현)](https://github.com/gabrielyoon7) |
| `백엔드`   | [이태양]()                                                |
| `백엔드`   | [엄희승]()                                                |

## ⚙️ Tech

- React + TypeScript
- Redux Took Kit
- TanStack Query (적용중)
- Material UI
- Chart js

- Axios
- React Router Dom
- vite

- MSW (적용중)
- PWA

## ✅ Features

    .
    ├─홈화면
    │  ├─일정 등록 하기
    │  │  ├─일정 이름
    │  │  ├─날짜
    │  │  ├─일정 시작/종료 일시
    │  │  ├─카테고리 (미구현)
    │  │  ├─예상 수입/지출 금액
    │  │  ├─일정 중요도
    │  │  └─예산 제외 기능
    │  ├─달력으로 일정 표시git pull origin

    │  │  ├─달력 월별 페이지 전환
    │  │  └─달력에 일정 요약 표시
    │  └─리스트로 일정 표시
    │     └─특정 일자의 일정을 상세히 표시
    ├─분석
    │  ├─..
    │  └─..
    ├─알림
    │  ├─..
    │  └─..
    └─마이페이지
       ├─로그인
       └─회원가입

## ⚙️ Run Locally

1. Node.js 설치를 확인해주세요. (v18.0.0 이상 권장, vite 문제로 인해 v20.0.0 ~ v20.6.0 버전은 지원하지 않습니다. v20.6.1 이후 버전은 사용이 가능합니다.)

````bash
2. yarn 설치를 확인해주세요.

```bash
npm i -g yarn

yarn set version stable
````

3. 프로젝트를 클론 합니다.

```bash
  git clone https://github.com/soyoung125/fin-the-pen-web.git
```

4. 프로젝트에 진입합니다.

```bash
  cd fin-the-pen-web
```

5. 패키지를 설치합니다.

```bash
  yarn
```

6. 서버를 실행합니다.

```bash
  yarn dev
```

7. 빌드가 안되는 경우

```bash
yarn cache clean --all

npm install -g npm@latest
npm install -g yarn@latest

rm node_modules/ yarn.lock package-lock.json

yarn
```

## 📜 Documentation

[Figma](https://www.figma.com/file/jvJSoUfl0I4SKo59OB6Sua/%ED%95%80%EB%8D%94%ED%8E%9C?node-id=0%3A1&t=XbgFd2dax5HIYz3J-0)

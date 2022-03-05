![image](https://user-images.githubusercontent.com/73876068/148671692-f6cdd096-dab3-4d8e-9b51-443eb3b947ba.png)
<br/>
![Mask Group (6)](https://user-images.githubusercontent.com/61549796/149991038-0b011c62-fecf-48f4-9d68-652c09950baf.png)

<br/>

# 📚 북스테어즈는 어떤 서비스인가요? 🧐

### **_진짜 독서가들의 독서법, 북스테어즈 💡_**

북스테어즈는 여러분들의 보다 똑똑한 독서를 돕습니다! [랜딩페이지 바로가기](https://bookstairs.netlify.app/)

<br/>

SOPT 29th APPJAM

- 프로젝트 기간: 2022.12.18 ~
- [Notion](https://rose-prepared-583.notion.site/d454c4437530405f9e526e86e66912b3)
- [API 명세서](https://rose-prepared-583.notion.site/API-42e1ea2497d344399fda98cfbe55febd)
- [코드 컨벤션](https://rose-prepared-583.notion.site/Code-Convention-27afc41450b74fd8a5f1688bfb0b2ede)
- [Git 전략](https://rose-prepared-583.notion.site/Git-Branch-cb7891a287b049a7965659fb2679e5e1)

<br/>

# 🐉 워크플로우

![워크플로우](https://user-images.githubusercontent.com/61549796/150529139-ece76c3d-dd7d-4f6e-bde0-6067adb67e72.png)

<br />

# 🛠 기술 스택

![badge](https://img.shields.io/badge/Part-Back--end-brightgreen) ![lang](https://img.shields.io/badge/Language-TypeScript-blue) ![react](https://img.shields.io/badge/Tech--stack-Node.js-orange) ![realease](https://img.shields.io/badge/release-v1.0.0-yellow)

```json
"dependencies": {
  "@types/express-serve-static-core": "^4.17.28",
  "aws-sdk": "^2.1057.0",
  "axios": "^0.24.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^8.6.0",
  "express": "^4.17.1",
  "express-validator": "^6.10.0",
  "gravatar": "^1.8.1",
  "jsonwebtoken": "^8.5.1",
  "moment": "^2.29.1",
  "multer": "^1.4.2",
  "multer-s3": "^2.9.0",
  "pg": "^8.7.1",
  "pg-hstore": "^2.3.4",
  "reflect-metadata": "^0.1.13",
  "request": "^2.88.2",
  "sequelize": "^6.13.0",
  "sequelize-cli": "^6.3.0",
  "sequelize-typescript": "^2.1.0"
}
```

<br/>

# 🌲 Git 전략

![gitbranch](https://user-images.githubusercontent.com/61549796/150546516-a52e8b8a-3a74-48a7-b4ca-494596bef4a2.png)

<br/>

# 🏗 아키텍쳐

![아아키텍처](https://user-images.githubusercontent.com/61549796/150623420-3c754153-62b3-42ee-8c4f-20819545b937.png)

<br/>

# 🗂 프로젝트 폴더 구조

```
📦src
 ┣ 📂config
 ┃ ┣ 📜config.ts
 ┃ ┗ 📜index.ts
 ┣ 📂controller
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜book.ts
 ┃ ┣ 📜review.ts
 ┃ ┗ 📜user.ts
 ┣ 📂library
 ┃ ┣ 📜checkValidation.ts
 ┃ ┣ 📜constant.ts
 ┃ ┣ 📜response.ts
 ┃ ┗ 📜returnCode.ts
 ┣ 📂middleware
 ┃ ┣ 📜authMiddleware.ts
 ┃ ┗ 📜upload.ts
 ┣ 📂models
 ┃ ┣ 📜Book.ts
 ┃ ┣ 📜Review.ts
 ┃ ┣ 📜User.ts
 ┃ ┗ 📜index.ts
 ┣ 📂others
 ┃ ┗ 📂slack
 ┃ ┃ ┣ 📜slack.ts
 ┃ ┃ ┗ 📜slackAPI.ts
 ┣ 📂router
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜book.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜review.ts
 ┃ ┗ 📜user.ts
 ┣ 📂service
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜book.ts
 ┃ ┣ 📜review.ts
 ┃ ┗ 📜user.ts
 ┣ 📂test
 ┃ ┣ 📂library
 ┃ ┃ ┗ 📜checkValidation.spec.ts
 ┃ ┗ 📂service
 ┃ ┃ ┣ 📜auth.spec.ts
 ┃ ┃ ┣ 📜book.spec.ts
 ┃ ┃ ┣ 📜review.spec.ts
 ┃ ┃ ┗ 📜user.spec.ts
 ┣ 📜.sequelizerc.ts
 ┗ 📜index.ts
```

<br/>

# 🪜 ERD

![image](https://user-images.githubusercontent.com/68222629/150541524-3583fe28-fd09-4e4b-813f-37fb0c37e99d.png)

<br/>

# 💌 커밋 컨벤션

|    제목    | 내용                                       |
| :--------: | ------------------------------------------ |
|  **feat**  | **새로운 기능 / 특징**                     |
|  **fix**   | **버그를 고침**                            |
| **hotfix** | **현재 프로덕션에 크리티컬한 버그를 고침** |
|   chore    | 프로덕션 코드가 바뀌지 않는 가벼운 일들    |
|    docs    | 도큐먼트 / 문서화 업데이트                 |
|  refactor  | 프로덕션 코드를 리팩토링                   |
|    test    | 테스트 코드 추가 및 업데이트               |
|    deps    | Dependency와 관련 있는 내용                |

<br/>

# 👨‍👧‍👦 Team

|                **🙋 [고성용](https://github.com/holmir97)**                 |               **🙋 [장서현](https://github.com/seohyun-106)**               |                 **🙋 [이동근](https://github.com/geeneve)**                 |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| [![FVCproductions](https://avatars.githubusercontent.com/u/64517473?v=4)]() | [![FVCproductions](https://avatars.githubusercontent.com/u/61549796?v=4)]() | [![FVCproductions](https://avatars.githubusercontent.com/u/68222629?v=4)]() |
|                                 서버 개발자                                 |                                 서버 개발자                                 |                                 서버 개발자                                 |
|           프로젝트 세팅<br />웹 배포<br />서버 배포<br />DB 설계            |                     테스팅<br />서버 배포<br />DB 설계                      |               디버깅<br />웹 배포<br />서버 배포<br />DB 설계               |

<br/>


# 📄 API

| Route  | URI                             | HTTP<br>메서드 |           설명            | 담당 | 완료 |
| :----: | :------------------------------ | :------------: | :-----------------------: | :--: | :--: |
|  Auth  | /auth/email/?email=             |     `GET`      |    이메일 유효성 검사     | 동근 |  🧐  |
|        | /auth/nickname/?nickname=       |     `GET`      |    닉네임 유효성 검사     | 서현 |  🧐  |
|        | /auth/login                     |     `POST`     |        유저 로그인        | 서현 |  🧐  |
|        | /auth/signup                    |     `POST`     |         회원가입          | 동근 |  🧐  |
|        | /auth/check                     |     `GET`      |     로그인 여부 판별      | 서현 |  🧐  |
|  User  | /user/myInfo                    |     `GET`      |       내 정보 조회        | 서현 |  🧐  |
|        | /user/img                       |    `PATCH`     |     프로필 사진 수정      | 서현 |  🧐  |
|  Book  | /book                           |     `POST`     | 서재 / 리뷰에 책 추가하기 | 동근 |  🧐  |
|        | /book                           |     `GET`      |     서재 책 전체 조회     | 동근 |  🧐  |
| Review | /review/before/:reviewId        |    `PATCH`     |       독서 전 단계        | 성용 |  🧐  |
|        | /review/:reviewId/question-list |     `GET`      |     질문 리스트 조회      | 성용 |  🧐  |
|        | /review/now/:reviewId           |    `PATCH`     |       독서 중 단계        | 성용 |  🧐  |
|        | /review/:reviewId               |     `GET`      |         리뷰 조회         | 서현 |  🧐  |
|        | /review/:reviewId               |    `PATCH`     |         리뷰 수정         | 동근 |  🧐  |
|        | /review/:reviewId               |    `DELETE`    |         리뷰 삭제         | 성용 |  🧐  |

<br />

<br/>

# 🛠 Version

| Version | Content                                        |                                 Detail                                  |    Date    |
| :-----: | :--------------------------------------------- | :---------------------------------------------------------------------: | :--------: |
|  1.0.0  | initial version                                | [📄](https://github.com/TeamBookTez/booktez-server/releases/tag/v1.0.0) | 2022.02.06 |
|  1.0.1  | bug fix, add api                               | [📄](https://github.com/TeamBookTez/booktez-server/releases/tag/v1.0.1) | 2022.02.10 |
|  1.0.2  | bug fix, modify api                            | [📄](https://github.com/TeamBookTez/booktez-server/releases/tag/v1.0.2) | 2022.02.21 |
|  2.0.0  | switch database <br>from postgreSQL to mongoDB | [📄](https://github.com/TeamBookTez/booktez-server/releases/tag/v2.0.0) | 2022.03.03 |
|  2.0.1  | bug fix                                        | [📄](https://github.com/TeamBookTez/booktez-server/releases/tag/v2.0.`) | 2022.03.06 |

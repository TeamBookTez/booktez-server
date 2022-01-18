![image](https://user-images.githubusercontent.com/73876068/148671692-f6cdd096-dab3-4d8e-9b51-443eb3b947ba.png)
<br/>
![Mask Group (6)](https://user-images.githubusercontent.com/61549796/149991038-0b011c62-fecf-48f4-9d68-652c09950baf.png)


<br/>

# 📚 북스테어즈는 어떤 서비스인가요?


### ***진짜 독서가들의 독서법, 북스테어즈 💡***
북스테어즈는 여러분들의 보다 똑똑한 독서를 돕습니다! [랜딩페이지 바로가기](https://bookstairs.netlify.app/)

<br/>

SOPT 29th APPJAM   

- 프로젝트 기간: 2022.12.18 ~ 
- [Notion](https://rose-prepared-583.notion.site/d454c4437530405f9e526e86e66912b3)
- [API 명세서](https://rose-prepared-583.notion.site/API-42e1ea2497d344399fda98cfbe55febd)
- [코드 컨벤션](https://rose-prepared-583.notion.site/Code-Convention-27afc41450b74fd8a5f1688bfb0b2ede)
- [Git 전략](https://rose-prepared-583.notion.site/Git-Branch-cb7891a287b049a7965659fb2679e5e1)

<br/>

# 🛠 기술 스택


 ![badge](https://img.shields.io/badge/Part-Back--end-brightgreen) ![lang](https://img.shields.io/badge/Language-TypeScript-blue) ![react](https://img.shields.io/badge/Tech--stack-Node.js-orange) ![realease](https://img.shields.io/badge/release-v1.0.0-yellow)


```json
"dependencies": {
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
  "sequelize": "^6.12.5",
  "sequelize-cli": "^6.3.0",
  "sequelize-typescript": "^2.1.0"
}
```
<br/>

# 🗂 프로젝트 폴더 구조
```
📦 Back-end
┣ 📂 src
┃ ┣ 📂 config
┃ ┃ ┣ 📜 config.ts
┃ ┃ ┗ 📜 index.ts
┃ ┣ 📂 controller
┃ ┃ ┗ 📜 auth.ts
┃ ┣ 📂 library
┃ ┃ ┣ 📜 constant.ts
┃ ┃ ┣ 📜 response.ts
┃ ┃ ┗ 📜 returnCode.ts
┃ ┣ 📂 models
┃ ┃ ┣ 📜 Book.ts
┃ ┃ ┣ 📜 index.ts
┃ ┃ ┣ 📜 Review.ts
┃ ┃ ┗ 📜 User.ts
┃ ┣ 📂 others
┃ ┃ ┣ 📂 slack
┃ ┃ ┃ ┣ 📜 sampleEndpoint.ts
┃ ┃ ┃ ┣ 📜 slack.ts
┃ ┃ ┃ ┗ 📜 slackAPI.ts
┃ ┣ 📂 router
┃ ┃ ┣ 📜 index.ts
┃ ┃ ┗ 📜 auth.ts
┃ ┣ 📂service
┃ ┃ ┗ 📜 auth.ts
┃ ┗ 📜index.ts
┣ 📜 .gitignore
┣ 📜 nodemon.json
┣ 📜 package.json
┣ 📜 prettierrc.json
┣ 📜 README.md
┗ 📜 tsconfig.json
```
<br/>

# 🪜 ERD
<img width="652" alt="스크린샷 2022-01-12 오전 3 06 30" src="https://user-images.githubusercontent.com/68222629/148997682-050bd9da-4942-41a8-b53b-b6df2685dcc3.png">

<br/>

# 💌 커밋 컨벤션
|제목|내용|
|:-:|---|
|**feat**|**새로운 기능 / 특징**|
|**fix**|**버그를 고침**|
|**hotfix**|**현재 프로덕션에 크리티컬한 버그를 고침**|
|chore|프로덕션 코드가 바뀌지 않는 가벼운 일들|
|docs|도큐먼트 / 문서화 업데이트|
|refactor|프로덕션 코드를 리팩토링|
|test|테스트 코드 추가 및 업데이트|
|deps|Dependency와 관련 있는 내용|

<br/>

# 👨‍👧‍👦 Team
| **🙋 [고성용](https://github.com/holmir97)** | **🙋 [장서현](https://github.com/seohyun-106)** | **🙋 [이동근](https://github.com/geeneve)** |
| :---: | :---: | :---: |
| [![FVCproductions](https://avatars.githubusercontent.com/u/64517473?v=4)]()    | [![FVCproductions](https://avatars.githubusercontent.com/u/61549796?v=4)]() |[![FVCproductions](https://avatars.githubusercontent.com/u/68222629?v=4)]() |
| 서버 개발자 | 서버 개발자 | 서버 개발자 |
 프로젝트 세팅<br /> DB 설계|프로젝트 세팅<br /> DB 설계|프로젝트 세팅<br /> DB 설계|

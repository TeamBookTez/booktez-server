"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// 개발 환경 설정
// default: 'development'
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // 모든 프로세스 중지
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    // 포트 번호
    port: parseInt(process.env.PORT, 10),
    // mongoDB 주소
    mongoURI: process.env.MONGODB_URI,
    // slack WebHook 주소
    slackURI: process.env.DEV_WEB_HOOK_ERROR_MONITORING,
    // 기본 이미지
    defaultImg: {
        user: process.env.DEFAULT_IMG,
        book: process.env.DEFAULT_BOOK_IMG,
    },
    // jwt 관련
    jwt: {
        secret: process.env.JWT_SECRET,
        algorithm: process.env.JWT_ALGO,
    },
    // S3 관련
    aws: {
        bucket: process.env.AWS_BUCKET,
        s3AccessKey: process.env.AWS_ACCESS_KEY,
        s3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};
//# sourceMappingURL=index.js.map
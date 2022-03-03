"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    // 프로필 이미지
    img: {
        type: String,
        required: false,
        default: process.env.DEFAULT_IMG,
    },
    // 리프레시 토큰
    refresh_token: {
        type: String,
        required: false,
    },
    // 이메일 인증번호
    email_code: {
        type: String,
        required: false,
    },
    // 생성 일자
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // 수정 일자
    updated_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});
exports.default = mongoose_1.default.model("user", UserSchema);
//# sourceMappingURL=User.js.map
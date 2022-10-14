import mongoose from "mongoose";
import config from "../config";
import { convertTimeZone } from "../library/convertTimezone";

// interface
import { IUser } from "../interface/IUser";

const date: Date = convertTimeZone(Date.now());

const UserSchema = new mongoose.Schema({
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
    default: config.defaultImg.user,
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

  // 만료 일자
  expired_at: {
    type: Date,
    required: false,
  },

  // 생성 일자
  created_at: {
    type: Date,
    required: true,
    default: date,
  },
  // 수정 일자
  updated_at: {
    type: Date,
    required: true,
    default: date,
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<IUser & mongoose.Document>("user", UserSchema);

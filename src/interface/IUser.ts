import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  nickname: string;
  img: string;
  refresh_token: string;
  email_code: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

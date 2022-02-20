import mongoose from "mongoose";
export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  email: String;
  password: String;
  nickname: String;
  img: String;
  refresh_token: String;
  email_code: String;
  created_at: Date;
  updated_at: Date;
  is_deleted: Boolean;
}

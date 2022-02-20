import mongoose from "mongoose";

export interface IReview {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  book_id: mongoose.Schema.Types.ObjectId;
  question_list: [string];
  answer_one: string;
  answer_two: string;
  answer_three: object;
  review_st: number;
  finish_St: boolean;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

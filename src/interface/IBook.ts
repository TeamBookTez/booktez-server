import mongoose from "mongoose";
export interface IReview {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  book_id: mongoose.Schema.Types.ObjectId;
  question_list: [String];
  answer_one: String;
  answer_two: String;
  answer_three: Object;
  review_st: Number;
  finish_St: Boolean;
  created_at: Date;
  updated_at: Date;
  is_deleted: Boolean;
}

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// interface
import { IReview } from "../interface/IReview";

const ReviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
  question_list: {
    type: [String],
    required: false,
    default: [""],
  },
  answer_one: {
    type: String,
    required: false,
    default: "",
  },
  answer_two: {
    type: String,
    required: false,
    default: "",
  },
  answer_three: {
    type: Object,
    required: false,
    default: {
      type: "",
      content: "",
      children: [{ type: "", content: "", children: [] }],
    },
  },
  // 리뷰 상태
  review_st: {
    type: Number,
    required: true,
    default: 2,
  },
  // 리뷰 종료 상태
  finish_st: {
    type: Boolean,
    required: true,
    default: false,
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

export default mongoose.model<IReview & mongoose.Document>(
  "review",
  ReviewSchema
);

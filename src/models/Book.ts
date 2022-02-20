import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// interface
import { IBook } from "../interface/IBook";

const BookSchema = new mongoose.Schema({
  // 도서 고유번호
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  // 도서 고유번호_sub
  isbn_sub: {
    type: String,
    unique: true,
    required: false,
  },

  title: {
    type: String,
    required: true,
  },
  // 저자
  author: {
    type: [String],
    required: true,
  },
  // 엮은이
  translator: {
    type: [String],
    required: false,
  },
  // 표지
  thumbnail: {
    type: String,
    required: false,
    default: process.env.DEFAULT_BOOK_IMG,
  },
  // 생성 일자
  publication_dt: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IBook & mongoose.Document>("book", BookSchema);

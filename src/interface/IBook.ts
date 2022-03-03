import mongoose from "mongoose";

export interface IBook {
  _id: mongoose.Schema.Types.ObjectId;
  isbn: number;
  isbn_sub: number;
  title: string;
  author: [string];
  translator: [string];
  thumbnail: string;
  publication_dt: string;
}

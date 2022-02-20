import mongoose from "mongoose";

export interface IBook {
  _id: mongoose.Schema.Types.ObjectId;
  isbn: Number;
  isbn_sub: Number;
  title: String;
  author: [String];
  translator: [String];
  thumbnail: String;
  publication_dt: String;
}

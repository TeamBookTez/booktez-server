import mongoose from "mongoose";
import config from "../config";

// models
import User from "../models/User";
import Book from "../models/Book";
import Review from "../models/Review";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {});

    await User.createCollection().then(function (collection) {
      console.log("User Collection is created!");
    });
    await Book.createCollection().then(function (collection) {
      console.log("Book Collection is created!");
    });
    await Review.createCollection().then(function (collection) {
      console.log("Review Collection is created!");
    });

    console.log("Mongoose Connected ...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

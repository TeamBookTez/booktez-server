import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./User";
import Book from "./Book";
import Review from "./Review";

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DB,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  timezone: "+09:00",
});

sequelize.addModels([User, Book, Review]);

export { User, Book, Review };
export default sequelize;
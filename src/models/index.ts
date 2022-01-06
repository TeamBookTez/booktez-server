import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./User";
const db = {};

dotenv.config();

export const sequelize = new Sequelize(
  // config.development.database,
  // config.development.username,
  // config.development.password,
  {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DBNAME,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    timezone: "+09:00",
  }
);

sequelize.addModels([User]);

export { User };
export default sequelize;

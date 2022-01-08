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
    database: process.env.DB_DB,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    timezone: "+09:00",
  }
);

sequelize.addModels([User]);

// DB를 밀어버리고 새로 만들 때만 {force: true}
User.sync({ force: false })
  .then(() => {
    console.log("✅Success Create Tables");
  })
  .catch((err) => {
    console.log("❗️Error in Create Tables : ", err);
  });

export { User };
export default sequelize;

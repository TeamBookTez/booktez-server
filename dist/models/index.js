"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Book = exports.User = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Book_1 = __importDefault(require("./Book"));
exports.Book = Book_1.default;
const Review_1 = __importDefault(require("./Review"));
exports.Review = Review_1.default;
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DB,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    timezone: "+09:00",
});
exports.sequelize.addModels([User_1.default, Book_1.default, Review_1.default]);
exports.default = exports.sequelize;
//# sourceMappingURL=index.js.map
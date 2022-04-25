"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const BookSchema = new mongoose_1.default.Schema({
    // 도서 고유번호
    isbn: {
        type: String,
        unique: true,
        required: true,
    },
    // 도서 고유번호_sub
    isbn_sub: {
        type: String,
        unique: false,
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
        default: config_1.default.defaultImg.book,
    },
    // 생성 일자
    publication_dt: {
        type: String,
        required: false,
    },
});
exports.default = mongoose_1.default.model("book", BookSchema);
//# sourceMappingURL=Book.js.map
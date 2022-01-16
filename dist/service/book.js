"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// libraries
const constant_1 = __importDefault(require("../library/constant"));
// models
const models_1 = require("../models");
/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let books = [];
    yield models_1.Review.findAll({
        attributes: ["reviewSt"],
        include: [
            {
                model: models_1.Book,
                attributes: ["title", "author", "thumbnail"],
            },
        ],
        where: {
            userId,
            isDeleted: false,
        },
        order: [["updatedAt", "DESC"]],
    }).then((reviews) => reviews.forEach((review) => {
        books.push({
            thumbnail: review.book.thumbnail,
            title: review.book.title,
            author: review.book.author,
            state: review.reviewSt,
        });
    }));
    return { books: books };
});
/**
 *  @서재에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   필요한 값이 없을 때
 */
const postBookService = (isLogin, isbn, thumbnail, title, author) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isbn || !title || !author) {
        return constant_1.default.NULL_VALUE;
    }
    let isbnOne, isbnTwo;
    let exist;
    if (/\s/.test(isbn)) {
        // isbn이 2개일 경우
        [isbnOne, isbnTwo] = isbn.split(" ");
        exist = yield models_1.Book.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { isbn: isbnOne },
                    { isbn: isbnTwo },
                    { isbnSub: isbnOne },
                    { isbnSub: isbnTwo },
                ],
                isDeleted: false,
            },
        });
    }
    else {
        // isbn 1개
        isbnOne = isbn;
        exist = yield models_1.Book.findOne({
            where: {
                [sequelize_1.Op.or]: [{ isbn: isbnOne }, { isbnSub: isbnOne }],
            },
        });
    }
    if (!exist) {
        yield models_1.Book.create(Object.assign(Object.assign(Object.assign({ isbn: isbnOne }, (isbnTwo && { isbnSub: isbnTwo })), { title,
            author }), (thumbnail && { thumbnail })));
    }
    return isLogin;
});
const bookService = {
    getBookService,
    postBookService,
};
exports.default = bookService;
//# sourceMappingURL=book.js.map
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
// library
const constant_1 = __importDefault(require("../library/constant"));
// model
const models_1 = require("../models");
/**
 *  @서재,리뷰에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   1. 필요한 값이 없을 때
 *         2. 리뷰가 이미 존재할 때
 */
const postBookService = (isLogin, userId, isbn, thumbnail, title, author, translator, publicationDate) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isbn || !title || !author || !translator || !publicationDate) {
        return constant_1.default.NULL_VALUE;
    }
    if (!isLogin) {
        return constant_1.default.ANONYMOUS_USER;
    }
    let isbnOne, isbnTwo;
    let bookExist;
    let book;
    if (/\s/.test(isbn)) {
        // isbn이 2개일 경우
        [isbnOne, isbnTwo] = isbn.split(" ");
        bookExist = yield models_1.Book.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { isbn: isbnOne },
                    { isbn: isbnTwo },
                    { isbnSub: isbnOne },
                    { isbnSub: isbnTwo },
                ],
            },
        });
    }
    else {
        // isbn 1개
        isbnOne = isbn;
        bookExist = yield models_1.Book.findOne({
            where: {
                [sequelize_1.Op.or]: [{ isbn: isbnOne }, { isbnSub: isbnOne }],
            },
        });
    }
    if (!bookExist) {
        book = yield models_1.Book.create(Object.assign(Object.assign(Object.assign(Object.assign({ isbn: isbnOne }, (isbnTwo && { isbnSub: isbnTwo })), { title,
            author }), (thumbnail && { thumbnail })), { translator, publicationDt: publicationDate }));
    }
    else {
        book = bookExist;
    }
    // review 중복 체크
    const exist = yield models_1.Review.findOne({
        where: {
            bookId: book.id,
            userId,
            isDeleted: false,
        },
    });
    if (exist) {
        return constant_1.default.VALUE_ALREADY_EXIST;
    }
    // create review
    const review = yield models_1.Review.create({
        userId: userId,
        bookId: book.id,
        questionList: [],
        answerOne: "",
        answerTwo: "",
        reviewSt: 2,
        finishSt: false,
    });
    return {
        isLogin,
        reviewId: review.id,
    };
});
/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let books = [];
    yield models_1.Review.findAll({
        attributes: ["id", "reviewSt"],
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
            reviewId: review.id,
            thumbnail: review.book.thumbnail,
            title: review.book.title,
            author: review.book.author,
            state: review.reviewSt,
        });
    }));
    return { books: books };
});
const bookService = {
    postBookService,
    getBookService,
};
exports.default = bookService;
//# sourceMappingURL=book.js.map
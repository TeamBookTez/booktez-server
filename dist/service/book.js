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
// library
const constant_1 = __importDefault(require("../library/constant"));
const convertSnakeToCamel_1 = require("../library/convertSnakeToCamel");
const Review_1 = __importDefault(require("../models/Review"));
const Book_1 = __importDefault(require("../models/Book"));
/**
 *  @서재,리뷰에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   1. 필요한 값이 없을 때
 *         2. 리뷰가 이미 존재할 때
 */
const postBookService = (isLogin, userId, isbn, thumbnail, title, author, translator, publicationDt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isbn || !title || !author || !translator || !publicationDt) {
        return constant_1.default.NULL_VALUE;
    }
    isbn = isbn.trim();
    if (!isLogin) {
        return constant_1.default.ANONYMOUS_USER;
    }
    let isbnOne, isbnTwo;
    let bookExist;
    let book;
    if (/\s/.test(isbn)) {
        // isbn이 2개일 경우
        [isbnOne, isbnTwo] = isbn.split(" ");
        bookExist = yield Book_1.default.exists({
            $or: [
                { isbn: isbnOne },
                { isbn: isbnTwo },
                (0, convertSnakeToCamel_1.keysToSnake)({ isbnSub: isbnOne }),
                (0, convertSnakeToCamel_1.keysToSnake)({ isbnSub: isbnTwo }),
            ],
        });
    }
    else {
        // isbn 1개
        isbnOne = isbn;
        bookExist = yield Book_1.default.exists({
            $or: [{ isbn: isbnOne }, (0, convertSnakeToCamel_1.keysToSnake)({ isbnSub: isbnOne })],
        });
    }
    if (!bookExist) {
        book = yield Book_1.default.create((0, convertSnakeToCamel_1.keysToSnake)(Object.assign(Object.assign(Object.assign(Object.assign({ isbn: isbnOne }, (isbnTwo && { isbnSub: isbnTwo })), { title,
            author }), (thumbnail && { thumbnail })), { translator,
            publicationDt })));
    }
    else {
        book = bookExist;
    }
    // review 중복 체크
    const exist = yield Review_1.default.findOne((0, convertSnakeToCamel_1.keysToSnake)({
        bookId: book._id,
        userId,
        isDeleted: false,
    }));
    if (exist) {
        return constant_1.default.VALUE_ALREADY_EXIST;
    }
    // create review
    const review = yield Review_1.default.create((0, convertSnakeToCamel_1.keysToSnake)({
        userId,
        bookId: book,
        reviewSt: 2,
        finishSt: false,
    }));
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
    const reviews = yield Review_1.default.find((0, convertSnakeToCamel_1.keysToSnake)({
        userId,
        isDeleted: false,
    }), (0, convertSnakeToCamel_1.keysToSnake)({ _id: true, bookId: true, reviewSt: true })).sort((0, convertSnakeToCamel_1.keysToSnake)({ updatedAt: -1 }));
    const books = yield Promise.all(reviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
        // snake to camel
        const originReview = (0, convertSnakeToCamel_1.keysToCamel)(review);
        const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
        const findBook = yield Book_1.default.findById(camelReview.bookId);
        const book = {
            reviewId: review.id,
            thumbnail: findBook.thumbnail,
            title: findBook.title,
            author: findBook.author,
            reviewSt: camelReview.reviewSt,
        };
        return book;
    })));
    return { books: books };
});
/**
 *  @서재  독서전 책 조회
 *  @route GET /book/pre
 *  @access private
 */
const getBookPreService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield Review_1.default.find((0, convertSnakeToCamel_1.keysToSnake)({
        userId,
        isDeleted: false,
        reviewSt: 2,
    }), (0, convertSnakeToCamel_1.keysToSnake)({ _id: true, bookId: true, reviewSt: true })).sort((0, convertSnakeToCamel_1.keysToSnake)({ updatedAt: -1 }));
    const books = yield Promise.all(reviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
        // snake to camel
        const originReview = (0, convertSnakeToCamel_1.keysToCamel)(review);
        const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
        const findBook = yield Book_1.default.findById(camelReview.bookId);
        const book = {
            reviewId: review.id,
            thumbnail: findBook.thumbnail,
            title: findBook.title,
            author: findBook.author,
            reviewSt: camelReview.reviewSt,
        };
        return book;
    })));
    return { books: books };
});
/**
 *  @서재 독서중 책 조회
 *  @route GET /book/peri
 *  @access private
 */
const getBookPeriService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield Review_1.default.find((0, convertSnakeToCamel_1.keysToSnake)({
        userId,
        isDeleted: false,
        reviewSt: 3,
    }), (0, convertSnakeToCamel_1.keysToSnake)({ _id: true, bookId: true, reviewSt: true })).sort((0, convertSnakeToCamel_1.keysToSnake)({ updatedAt: -1 }));
    const books = yield Promise.all(reviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
        // snake to camel
        const originReview = (0, convertSnakeToCamel_1.keysToCamel)(review);
        const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
        const findBook = yield Book_1.default.findById(camelReview.bookId);
        const book = {
            reviewId: review.id,
            thumbnail: findBook.thumbnail,
            title: findBook.title,
            author: findBook.author,
            reviewSt: camelReview.reviewSt,
        };
        return book;
    })));
    return { books: books };
});
/**
 *  @서재 독서완료 책 조회
 *  @route GET /book/post
 *  @access private
 */
const getBookPostService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield Review_1.default.find((0, convertSnakeToCamel_1.keysToSnake)({
        userId,
        isDeleted: false,
        reviewSt: 4,
        finishSt: true,
    }), (0, convertSnakeToCamel_1.keysToSnake)({ _id: true, bookId: true, reviewSt: true })).sort((0, convertSnakeToCamel_1.keysToSnake)({ updatedAt: -1 }));
    const books = yield Promise.all(reviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
        // snake to camel
        const originReview = (0, convertSnakeToCamel_1.keysToCamel)(review);
        const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
        const findBook = yield Book_1.default.findById(camelReview.bookId);
        const book = {
            reviewId: review.id,
            thumbnail: findBook.thumbnail,
            title: findBook.title,
            author: findBook.author,
            reviewSt: camelReview.reviewSt,
        };
        return book;
    })));
    return { books: books };
});
const bookService = {
    postBookService,
    getBookService,
    getBookPreService,
    getBookPeriService,
    getBookPostService,
};
exports.default = bookService;
//# sourceMappingURL=book.js.map
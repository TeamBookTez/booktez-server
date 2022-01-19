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
const assert_1 = __importDefault(require("assert"));
// library
const constant_1 = __importDefault(require("../../library/constant"));
// model
const models_1 = require("../../models");
// service
const book_1 = __importDefault(require("../../service/book"));
describe("bookService test", () => {
    describe("postBookService test", () => {
        it("fail: null value given", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield book_1.default.postBookService(true, 1, null, "thumbnail", "title", ["author"], ["translator"], "2021년 12월 18일"), constant_1.default.NULL_VALUE);
        }));
        it("fail: not logged in user", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield book_1.default.postBookService(false, 1, "isbn", "thumbnail", "title", ["author"], ["translator"], "2021년 12월 18일"), constant_1.default.ANONYMOUS_USER);
        }));
        it("fail: review already exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield models_1.Book.create({
                isbn: "12345",
                title: "mocha",
                author: ["mocha"],
            });
            const review = yield models_1.Review.create({
                userId: 1,
                bookId: book.id,
                reviewSt: 2,
                finishSt: false,
                isDeleted: false,
            });
            assert_1.default.strictEqual(yield book_1.default.postBookService(true, 1, "12345", "thumbnail", "title", ["author"], ["translator"], "2021년 12월 18일"), constant_1.default.VALUE_ALREADY_EXIST);
            yield models_1.Book.destroy({
                where: {
                    id: book.id,
                },
            });
            yield models_1.Review.destroy({
                where: {
                    id: review.id,
                },
            });
        }));
        it("success", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield book_1.default.postBookService(true, 1, "123454321234321", "thumbnail", "title", ["author"], ["translator"], "2021년 12월 18일");
            assert_1.default.ok(result.isLogin);
            yield models_1.Book.destroy({
                where: {
                    isbn: "123454321234321",
                },
            });
            yield models_1.Review.destroy({
                where: {
                    id: result.reviewId,
                },
            });
        }));
    });
    describe("getBookService test", () => {
        it("success", () => __awaiter(void 0, void 0, void 0, function* () {
            const mochaUser = yield models_1.User.create({
                email: "mocha@test.com",
                password: "!234qwer",
                nickname: "mocha",
            });
            const mochaBook = yield models_1.Book.create({
                isbn: "12345",
                title: "mocha",
                author: ["mocha"],
            });
            const mochaReview = yield models_1.Review.create({
                userId: mochaUser.id,
                bookId: mochaBook.id,
                reviewSt: 2,
                finishSt: false,
                isDeleted: false,
            });
            const resultBooks = yield book_1.default.getBookService(mochaUser.id);
            const resultBook = resultBooks.books[0];
            assert_1.default.strictEqual(mochaBook.thumbnail, resultBook.thumbnail);
            assert_1.default.strictEqual(mochaBook.title, resultBook.title);
            assert_1.default.deepStrictEqual(mochaBook.author, resultBook.author);
            assert_1.default.strictEqual(mochaReview.reviewSt, resultBook.state);
            yield models_1.User.destroy({
                where: {
                    id: mochaUser.id,
                },
            });
            yield models_1.Book.destroy({
                where: {
                    id: mochaBook.id,
                },
            });
            yield models_1.Review.destroy({
                where: {
                    id: mochaReview.id,
                },
            });
        }));
    });
});
//# sourceMappingURL=book.spec.js.map
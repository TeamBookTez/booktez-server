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
const review_1 = __importDefault(require("../../service/review"));
describe("reviewService test", () => __awaiter(void 0, void 0, void 0, function* () {
    // MARK: - before, after
    let testUser, testBook, testReview;
    before("create user, book, empty review", () => __awaiter(void 0, void 0, void 0, function* () {
        testUser = yield models_1.User.create({
            email: "mocha@test.com",
            nickname: "mocha",
            password: "mocha123!",
        });
        testBook = yield models_1.Book.create({
            isbn: "mochamocha",
            title: "mochaBook",
            author: ["mo", "cha"],
        });
        testReview = yield models_1.Review.create({
            userId: testUser.id,
            bookId: testBook.id,
            questionList: ["모카?", "좋아하세요?"],
            answerOne: "모카 좋아하져",
            answerTwo: "캐페모카",
            reviewSt: 2,
        });
    }));
    after("delete user, book", () => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.User.destroy({ where: { id: testUser.id } });
        yield models_1.Book.destroy({ where: { id: testBook.id } });
    }));
    //MARK: - 독서 전 작성 테스트
    describe("patchReviewBefore test", () => __awaiter(void 0, void 0, void 0, function* () {
        it("success: patchReviewBefore returns reviewId correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const patchedReview = yield review_1.default.patchReviewBeforeController(testReview.id, testUser.id, testReview.answerOne, testReview.answerTwo, testReview.questionList, 3);
            assert_1.default.ok(patchedReview.reviewId === testReview.id);
        }));
        it("fail: try to patch review which doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.patchReviewBeforeController(-50, testUser.id, testReview.answerOne, testReview.answerTwo, testReview.questionList, 3), constant_1.default.DB_NOT_FOUND);
        }));
    }));
    // MARK: - 질문리스트 조회 테스트
    describe("getQuestionList test", () => __awaiter(void 0, void 0, void 0, function* () {
        it("success: getQuestionList returns question list correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const questionList = yield review_1.default.getQuestionService(testUser.id, testReview.id);
            // TODO: - strictEqual Vs deepStrictEqual
            assert_1.default.deepStrictEqual(questionList.questionList, testReview.questionList);
        }));
        it("fail: try to get questionList whose reviewId doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.getQuestionService(testUser.id, -50), constant_1.default.WRONG_REQUEST_VALUE);
        }));
    }));
    // MARK: - 독서 중 작성 테스트
    describe("patchReviewNow test", () => __awaiter(void 0, void 0, void 0, function* () {
        it("success: patchReviewNow returns reviewId and bookData correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const answerThree = {
                root: [
                    {
                        depth: 1,
                        question: "북테즈는 왜 전부 이쁘고 잘생겼을까?",
                        answer: [
                            {
                                text: "유전자가 우월해서",
                                children: [
                                    {
                                        depth: 2,
                                        question: "왜 유전자가 우월할까?",
                                        answer: [
                                            {
                                                text: "세상은 우리를 그렇게 만들었다.",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        depth: 1,
                        question: "북테즈는 왜 이렇게 성격이 다 좋을까?",
                        answer: [
                            {
                                text: "유전자가 우월해서",
                                children: [
                                    {
                                        depth: 2,
                                        question: "왜 유전자가 우월할까?",
                                        answer: [
                                            {
                                                text: "세상은 우리를 그렇게 만들었다.",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        depth: 1,
                        question: "북테즈는 왜 다 일을 잘할까?",
                        answer: [
                            {
                                text: "유전자가 우월해서",
                                children: [
                                    {
                                        depth: 2,
                                        question: "왜 유전자가 우월할까?",
                                        answer: [
                                            {
                                                text: "세상은 우리를 그렇게 만들었다.",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            yield review_1.default.patchReviewNowService(testReview.id, testReview.userId, answerThree, 4);
            const updatedReview = yield models_1.Review.findOne({
                where: {
                    id: testReview.id,
                },
            });
            assert_1.default.deepStrictEqual(updatedReview.answerThree, answerThree);
        }));
        it("fail: return null when arguments are null", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.patchReviewNowService(testReview.id, testReview.userId, null, 4), constant_1.default.NULL_VALUE);
        }));
        it("fail: return wrong request value when request wrong", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.patchReviewNowService(-100, testReview.userId, { test: "hi" }, 4), constant_1.default.WRONG_REQUEST_VALUE);
        }));
    }));
    // MARK: - 독후감 조회 테스트
    describe("getReview test", () => __awaiter(void 0, void 0, void 0, function* () {
        it("success: getReview returns book title and review data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const foundReview = yield models_1.Review.findOne({
                where: { id: testReview.id },
            });
            const foundBook = yield models_1.Book.findOne({
                where: { id: foundReview.bookId },
            });
            assert_1.default.strictEqual(foundReview.userId, testUser.id);
            assert_1.default.strictEqual(foundBook.title, testBook.title);
        }));
        it("fail: try to get review which doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.getReviewService(testUser.id, -50), constant_1.default.WRONG_REQUEST_VALUE);
        }));
    }));
    // MARK: - 독서 완료 후 답변 수정 테스트
    describe("patchReview test", () => __awaiter(void 0, void 0, void 0, function* () {
        it("success: patchReview returns changed data", () => __awaiter(void 0, void 0, void 0, function* () {
            const answerOne = "모카 수정 질문 1";
            const answerTwo = "모카 수정 질문 2";
            const answerThree = {
                root: [
                    {
                        depth: 1,
                        question: "모카 수정 질문 3",
                        answer: [
                            {
                                text: "유전자가 우월해서",
                                children: [
                                    {
                                        depth: 2,
                                        question: "왜 유전자가 우월할까?",
                                        answer: [
                                            {
                                                text: "세상은 우리를 그렇게 만들었다.",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        depth: 1,
                        question: "북테즈는 왜 이렇게 성격이 다 좋을까?",
                        answer: [
                            {
                                text: "유전자가 우월해서",
                                children: [
                                    {
                                        depth: 2,
                                        question: "왜 유전자가 우월할까?",
                                        answer: [
                                            {
                                                text: "세상은 우리를 그렇게 만들었다.",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        depth: 1,
                        question: "북테즈는 왜 다 일을 잘할까?",
                        answer: [
                            {
                                text: "유전자가 우월해서",
                                children: [
                                    {
                                        depth: 2,
                                        question: "왜 유전자가 우월할까?",
                                        answer: [
                                            {
                                                text: "세상은 우리를 그렇게 만들었다.",
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            const resData = yield review_1.default.patchReviewService(testReview.id, answerOne, answerTwo, answerThree);
            const updatedReview = yield models_1.Review.findOne({
                where: {
                    id: testReview.id,
                },
            });
            assert_1.default.strictEqual(resData, constant_1.default.SUCCESS);
            assert_1.default.strictEqual(updatedReview.answerOne, answerOne);
            assert_1.default.strictEqual(updatedReview.answerTwo, answerTwo);
            assert_1.default.deepStrictEqual(updatedReview.answerThree, answerThree);
        }));
        it("fail: return null when arguments are null", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.patchReviewService(testReview.id, null, null, null), constant_1.default.NULL_VALUE);
        }));
        it("fail: return wrong request value when request wrong", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.patchReviewService(-100, "answerOne", "answerTwo", {
                test: "hi",
            }), constant_1.default.WRONG_REQUEST_VALUE);
        }));
    }));
    // MARK: - 리뷰 삭제 테스트
    describe("deleteReview test", () => __awaiter(void 0, void 0, void 0, function* () {
        it("success: deleteReview deletes review correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const testReviewId = testReview.id;
            yield review_1.default.deleteReviewService(testUser.id, testReview.id);
            const deletedReview = yield models_1.Review.findOne({
                where: { id: testReviewId },
            });
            assert_1.default.ok(deletedReview.isDeleted);
        }));
        it("fail: try to delete non-existent review", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield review_1.default.deleteReviewService(testUser.id, -50), constant_1.default.WRONG_REQUEST_VALUE);
        }));
        it("fail: try to delete review which is already deleted", () => __awaiter(void 0, void 0, void 0, function* () {
            yield review_1.default.deleteReviewService(testUser.id, testReview.id);
            const deletedReview = yield models_1.Review.findOne({
                where: { id: testReview.id },
            });
            assert_1.default.strictEqual(yield review_1.default.deleteReviewService(testUser.id, deletedReview.id), constant_1.default.VALUE_ALREADY_DELETED);
        }));
    }));
}));
//# sourceMappingURL=review.spec.js.map
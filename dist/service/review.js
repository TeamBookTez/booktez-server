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
 *  @독서중 독서 전 작성
 *  @route POST /review/before/:isbn
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 ISBN
 *      3. 이미 존재하는 독후감
 */
const postReviewBeforeService = (isbn, userId, answerOne, answerTwo, questionList, progress) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isbn ||
        !userId ||
        !answerOne ||
        !answerTwo ||
        !questionList ||
        !progress) {
        return constant_1.default.NULL_VALUE;
    }
    // user 확인
    const user = yield models_1.User.findOne({ where: { id: userId, isDeleted: false } });
    // isbn 체킹
    let mainIsbn, subIsbn;
    let isbnList = isbn.split(" ");
    isbnList.length >= 2
        ? ([mainIsbn, subIsbn] = isbnList)
        : ([mainIsbn, subIsbn] = [isbnList[0], "-1"]);
    // book 확인
    const book = yield models_1.Book.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { isbn: mainIsbn },
                { isbn: subIsbn },
                { isbnSub: mainIsbn },
                { isbnSub: subIsbn },
            ],
        },
    });
    if (!book) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // 중복 review 확인
    const exist = yield models_1.Review.findOne({
        where: {
            bookId: book.id,
            userId: user.id,
            isDeleted: false,
        },
    });
    if (exist) {
        return constant_1.default.VALUE_ALREADY_EXIST;
    }
    // review 확인 - 기존의 독서 전 단계가 완료된 리뷰
    const review = yield models_1.Review.create({
        userId: user.id,
        bookId: book.id,
        questionList,
        answerOne,
        answerTwo,
        reviewSt: progress,
        finishSt: false,
    });
    return { reviewId: review.id };
});
/**
 *  @질문리스트 조회하기
 *  @route GET /review/:reviewId/question-list
 *  @access private
 *  @error
 *      1. 필요한 값이 없습니다.
 *      2. 존재하지 않는 Review 입니다.
 */
const getQuestionService = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    // 필요한 값이 없을 때
    if (!userId || !reviewId) {
        return constant_1.default.NULL_VALUE;
    }
    // review 조회
    const review = yield models_1.Review.findOne({
        where: {
            id: reviewId,
            userId,
            isDeleted: false,
        },
    });
    // 존재하지 않는 리뷰일 때
    if (!review) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    return { questionList: review.questionList };
});
/**

 *  @독서중 독서 중 작성
 *  @route PATCH /review/now/:reviewId
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewNowService = (reviewId, userId, answerThree, progress) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reviewId || !userId || !answerThree || !progress) {
        return constant_1.default.NULL_VALUE;
    }
    // user 확인
    const user = yield models_1.User.findOne({ where: { id: userId, isDeleted: false } });
    // 해당 review 조회
    const review = yield models_1.Review.findOne({
        where: { id: reviewId, userId: user.id, isDeleted: false },
    });
    // 2. 존재하지 않는 review
    if (!review) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    let finishSt = Number(progress) === 4 ? true : false;
    // 3. review update
    yield review.update({
        answerThree,
        reviewSt: progress,
        finishSt,
    });
    // 변경 리뷰 저장
    yield review.save();
    // 책 확인
    const book = yield models_1.Book.findOne({ where: { id: review.bookId } });
    return {
        reviewId: review.id,
        bookData: {
            thumbnail: book.thumbnail,
            title: book.title,
            authors: book.author,
            translators: book.translator,
            publicationDt: book.publicationDt,
        },
    };
});
/**
 *  @독후감 조회하기
 *  @route GET /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewService = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    // 필요한 값이 없을 때
    if (!userId || !reviewId) {
        return constant_1.default.NULL_VALUE;
    }
    const reviewToShow = yield models_1.Review.findOne({
        where: {
            id: reviewId,
            userId,
            isDeleted: false,
        },
    });
    // 존재하지 않는 리뷰일 때
    if (!reviewToShow) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    const bookToShow = yield models_1.Book.findOne({
        where: { id: reviewToShow.bookId },
    });
    return {
        bookTitle: bookToShow.title,
        answerOne: reviewToShow.answerOne,
        answerTwo: reviewToShow.answerTwo,
        questionList: reviewToShow.questionList,
        answerThree: reviewToShow.answerThree,
        reviewState: reviewToShow.reviewSt,
        finishState: reviewToShow.finishSt,
    };
});
/**
 *  @독서 완료 후 답변 수정
 *  @route PATCH /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const patchReviewService = (reviewId, answerOne, answerTwo, answerThree) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reviewId || !answerOne || !answerTwo || !answerThree) {
        return constant_1.default.NULL_VALUE;
    }
    const reviewToChange = yield models_1.Review.findOne({
        where: { id: reviewId, isDeleted: false },
    });
    if (!reviewToChange) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    yield models_1.Review.update({
        answerOne,
        answerTwo,
        answerThree,
    }, {
        where: { id: reviewId, isDeleted: false },
    });
    return constant_1.default.SUCCESS;
});
/**
 *  @독후감 삭제
 *  @route DELETE /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 삭제될 리뷰가 없을 때
 *      3. 이미 삭제된 리뷰일 때
 */
const deleteReviewService = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. 필요한 값이 없을 때
    if (!userId || !reviewId) {
        return constant_1.default.NULL_VALUE;
    }
    // user 확인
    const user = yield models_1.User.findOne({ where: { id: userId, isDeleted: false } });
    // 해당 review 조회
    const review = yield models_1.Review.findOne({
        where: { id: reviewId, userId: user.id, isDeleted: false },
    });
    // 2. 존재하지 않는 review
    if (!review) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // 3. 이미 삭제된 Review 입니다.
    if (review.isDeleted) {
        return constant_1.default.VALUE_ALREADY_DELETED;
    }
    // 독후감 삭제
    yield review.update({
        isDeleted: true,
    });
    // 삭제 리뷰 저장
    yield review.save();
    return constant_1.default.SUCCESS;
});
const reviewService = {
    postReviewBeforeService,
    getQuestionService,
    patchReviewNowService,
    getReviewService,
    patchReviewService,
    deleteReviewService,
};
exports.default = reviewService;
//# sourceMappingURL=review.js.map
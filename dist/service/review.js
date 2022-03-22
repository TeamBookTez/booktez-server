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
const mongoose_1 = __importDefault(require("mongoose"));
// library
const constant_1 = __importDefault(require("../library/constant"));
const convertSnakeToCamel_1 = require("../library/convertSnakeToCamel");
const mongoose_2 = require("mongoose");
const Review_1 = __importDefault(require("../models/Review"));
const Book_1 = __importDefault(require("../models/Book"));
/**
 *  @독서중 독서 전 작성
 *  @route PATCH /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPreService = (reviewId, userId, answerOne, answerTwo, questionList, reviewSt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reviewId ||
        !userId ||
        answerOne === undefined ||
        answerOne === null ||
        answerTwo === undefined ||
        answerTwo === null ||
        questionList === undefined ||
        questionList === null ||
        !reviewSt) {
        return constant_1.default.NULL_VALUE;
    }
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // review 체크
    const review = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    if (!review) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // review 수정
    yield review.updateOne({
        $set: (0, convertSnakeToCamel_1.keysToSnake)({
            questionList,
            answerOne,
            answerTwo,
            reviewSt,
            finishSt: false,
        }),
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
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // review 조회
    const review = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    // 존재하지 않는 리뷰
    if (!review) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // snake to camel
    const originReview = (0, convertSnakeToCamel_1.keysToCamel)(review);
    const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
    // 질문리스트
    let questionList = camelReview.questionList;
    return { questionList };
});
/**
 *  @독서중 독서 중 작성
 *  @route PATCH /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPeriService = (reviewId, userId, answerThree, reviewSt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reviewId ||
        !userId ||
        answerThree === undefined ||
        answerThree === null ||
        !reviewSt) {
        return constant_1.default.NULL_VALUE;
    }
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // 해당 review 조회
    const review = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    // 2. 존재하지 않는 review
    if (!review) {
        return constant_1.default.DB_NOT_FOUND;
    }
    let finishSt = Number(reviewSt) === 4 ? true : false;
    // 3. review update
    yield review.updateOne({
        $set: (0, convertSnakeToCamel_1.keysToSnake)({
            answerThree,
            reviewSt,
            finishSt,
        }),
    });
    // snake to camel
    const originReview = (0, convertSnakeToCamel_1.keysToCamel)(review);
    const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
    // 책 확인
    const book = yield Book_1.default.findById(new mongoose_1.default.Types.ObjectId(camelReview.bookId));
    // snake to camel
    const originBook = (0, convertSnakeToCamel_1.keysToCamel)(book);
    const camelBook = (0, convertSnakeToCamel_1.keysToCamel)(originBook.Doc);
    return {
        reviewId: review.id,
        bookData: {
            title: camelBook.title,
            author: camelBook.author,
            translator: camelBook.translator,
            thumbnail: camelBook.thumbnail,
            publicationDt: camelBook.publicationDt,
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
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // review 조회
    const reviewToShow = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    // 존재하지 않는 리뷰일 때
    if (!reviewToShow) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // snake to camel
    const originReview = (0, convertSnakeToCamel_1.keysToCamel)(reviewToShow);
    const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
    // book 조회
    const bookToShow = yield Book_1.default.findById(camelReview.bookId);
    return {
        bookTitle: bookToShow.title,
        answerOne: camelReview.answerOne,
        answerTwo: camelReview.answerTwo,
        questionList: camelReview.questionList,
        answerThree: camelReview.answerThree,
        reviewSt: camelReview.reviewSt,
        finishSt: camelReview.finishSt,
    };
});
/**
 *  @독후감_전단계_조회하기
 *  @route GET /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewPreService = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    // 필요한 값이 없을 때
    if (!userId || !reviewId) {
        return constant_1.default.NULL_VALUE;
    }
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    const reviewToShow = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    // 존재하지 않는 리뷰일 때
    if (!reviewToShow) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // snake to camel
    const originReview = (0, convertSnakeToCamel_1.keysToCamel)(reviewToShow);
    const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
    return {
        answerOne: camelReview.answerOne,
        answerTwo: camelReview.answerTwo,
        questionList: camelReview.questionList,
        reviewSt: camelReview.reviewSt,
        finishSt: camelReview.finishSt,
    };
});
/**
 *  @독후감_중단계_조회하기
 *  @route GET /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewPeriService = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    // 필요한 값이 없을 때
    if (!userId || !reviewId) {
        return constant_1.default.NULL_VALUE;
    }
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    const reviewToShow = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    // 존재하지 않는 리뷰일 때
    if (!reviewToShow) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // snake to camel
    const originReview = (0, convertSnakeToCamel_1.keysToCamel)(reviewToShow);
    const camelReview = (0, convertSnakeToCamel_1.keysToCamel)(originReview.Doc);
    return {
        answerThree: camelReview.answerThree,
        reviewSt: camelReview.reviewSt,
        finishSt: camelReview.finishSt,
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
    if (!reviewId ||
        answerOne === undefined ||
        answerOne === null ||
        answerTwo === undefined ||
        answerTwo === null ||
        answerThree === undefined ||
        answerThree === null) {
        return constant_1.default.NULL_VALUE;
    }
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // find review
    const reviewToChange = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ isDeleted: false }));
    // 존재하지 않는 리뷰
    if (!reviewToChange) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // review 수정
    yield reviewToChange.updateOne({
        $set: (0, convertSnakeToCamel_1.keysToSnake)({
            answerOne,
            answerTwo,
            answerThree,
        }),
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
    // MongoDB id 형식이 아닐 때
    if (!(0, mongoose_2.isValidObjectId)(reviewId) || !(0, mongoose_2.isValidObjectId)(userId)) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // 해당 review 조회
    const review = yield Review_1.default.findById(new mongoose_1.default.Types.ObjectId(reviewId)).where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    // 2. 존재하지 않거나 삭제된 review
    if (!review) {
        return constant_1.default.DB_NOT_FOUND;
    }
    // 독후감 삭제
    yield review.updateOne({
        $set: (0, convertSnakeToCamel_1.keysToSnake)({
            isDeleted: true,
        }),
    });
    return constant_1.default.SUCCESS;
});
const reviewService = {
    patchReviewPreService,
    getQuestionService,
    patchReviewPeriService,
    getReviewService,
    getReviewPreService,
    getReviewPeriService,
    patchReviewService,
    deleteReviewService,
};
exports.default = reviewService;
//# sourceMappingURL=review.js.map
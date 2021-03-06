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
// slack
const slack_1 = __importDefault(require("../others/slack/slack"));
// library
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
const constant_1 = __importDefault(require("../library/constant"));
// service
const review_1 = __importDefault(require("../service/review"));
/**
 *  @독서중 독서 전 작성
 *  @route PATCH /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPreController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.patchReviewPreService(req.params.reviewId, req.user.id, req.body.answerOne, req.body.answerTwo, req.body.questionList, req.body.reviewSt);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "요청값이 잘못되었습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "작성/수정이 완료되었습니다.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @질문리스트 조회하기
 *  @route GET /review/:reviewId/question-list
 *  @access private
 *  @error
 *      1. 필요한 값이 없습니다.
 *      2. 존재하지 않는 Review 입니다.
 */
const getQuestionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.getQuestionService(req.user.id, req.params.reviewId);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "질문리스트 조회 성공.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @독서중 독서 중 작성
 *  @route PATCH /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const patchReviewPeriController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.patchReviewPeriService(req.params.reviewId, req.user.id, req.body.answerThree, req.body.reviewSt);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "요청값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "작성/수정이 완료되었습니다.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @독후감 조회하기
 *  @route GET /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.getReviewService(req.user.id, req.params.reviewId);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "독후감 조회 성공.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @독후감_전단계_조회하기
 *  @route GET /review/:reviewId/pre
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewPreController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.getReviewPreService(req.user.id, req.params.reviewId);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "독후감 전단계 조회 성공.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @독후감_중단계_조회하기
 *  @route GET /review/:reviewId/peri
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewPeriController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.getReviewPeriService(req.user.id, req.params.reviewId);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "독후감 중단계 조회 성공.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @독서 완료 후 답변 수정
 *  @route PATCH /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const patchReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.patchReviewService(req.params.reviewId, req.body.answerOne, req.body.answerTwo, req.body.answerThree);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않는 Review입니다.");
        }
        return response_1.default.basicResponse(res, returnCode_1.default.OK, true, "수정이 완료되었습니다.");
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
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
const deleteReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield review_1.default.deleteReviewService(req.user.id, req.params.reviewId);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "ID 형식이 잘못되었습니다.");
        }
        if (resData === constant_1.default.DB_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "존재하지 않거나 삭제된 Review입니다.");
        }
        if (resData === constant_1.default.VALUE_ALREADY_DELETED) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "이미 삭제된 Review 입니다.");
        }
        return response_1.default.basicResponse(res, returnCode_1.default.OK, true, "독후감 삭제 성공.");
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
const reviewController = {
    patchReviewPreController,
    getQuestionController,
    patchReviewPeriController,
    getReviewController,
    getReviewPreController,
    getReviewPeriController,
    patchReviewController,
    deleteReviewController,
};
exports.default = reviewController;
//# sourceMappingURL=review.js.map
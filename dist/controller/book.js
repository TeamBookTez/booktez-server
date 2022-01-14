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
// libraries
const constant_1 = __importDefault(require("../library/constant"));
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
// services
const book_1 = __importDefault(require("../service/book"));
/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield book_1.default.getBookService(req.body.userID.id);
        response_1.default.dataResponse(res, returnCode_1.default.OK, true, "서재 조회 성공", resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @서재에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   필요한 값이 없을 때
 */
const postBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield book_1.default.postBookService(req.body.isLogin, req.body.isbn, req.body.thumbnail, req.body.title, req.body.author);
        if (resData == constant_1.default.NULL_VALUE) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        else {
            response_1.default.dataResponse(res, returnCode_1.default.OK, true, "책 선택이 완료되었습니다.", { isLogin: resData });
        }
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
const bookController = {
    getBookController,
    postBookController,
};
exports.default = bookController;
//# sourceMappingURL=book.js.map
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
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
const constant_1 = __importDefault(require("../library/constant"));
// service
const user_1 = __importDefault(require("../service/user"));
/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err
 */
const getMyInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield user_1.default.getMyInfoService(req.body.userID.id);
        response_1.default.dataResponse(res, returnCode_1.default.OK, "마이페이지 조회 성공.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access public
 *  @err 잘못된 폼데이터
 */
const patchImgController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const img = req.file.location ? req.file.location : null;
        const resData = yield user_1.default.patchImgService(req.body.userID.id, img);
        // 폼데이터 잘못된 경우
        if (resData === constant_1.default.NULL_VALUE) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 데이터가 없습니다.");
        }
        else if (resData === constant_1.default.WRONG_IMG_FORM) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "잘못된 폼 데이터입니다.");
        }
        else {
            // 모두 성공시
            response_1.default.basicResponse(res, returnCode_1.default.OK, true, "프로필 이미지 변경 완료.");
        }
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
const userController = {
    getMyInfoController,
    patchImgController,
};
exports.default = userController;
//# sourceMappingURL=user.js.map
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
const auth_1 = __importDefault(require("../service/auth"));
/**
 *  @회원가입
 *  @route POST /auth/signup
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 *       2. 이메일 형식이 올바르지 않을 때
 *       3. 닉네임 형식이 올바르지 않을 때
 *       4. 패스워드 형식이 올바르지 않을 때
 *       5. 이메일이 이미 존재할 때
 *       6. 닉네임이 이미 존재할 때
 */
const postSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield auth_1.default.postSignupService(req.body);
        if (resData === constant_1.default.NULL_VALUE) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        else if (resData === constant_1.default.WRONG_EMAIL_CONVENTION) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "올바르지 않은 이메일 형식 입니다.");
        }
        else if (resData === constant_1.default.WRONG_NICKNAME_CONVENTION) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "올바르지 않은 닉네임 형식 입니다.");
        }
        else if (resData === constant_1.default.WRONG_PASSWORD_CONVENTION) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "올바르지 않은 패스워드 형식 입니다.");
        }
        else if (resData === constant_1.default.EMAIL_ALREADY_EXIST) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "이미 존재하는 이메일 입니다.");
        }
        else if (resData === constant_1.default.NICKNAME_ALREADY_EXIST) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "이미 존재하는 닉네임 입니다.");
        }
        else {
            response_1.default.tokenResponse(res, returnCode_1.default.CREATED, "이동근의 북스테어즈에 온 것을 환영합니다.", true, resData);
        }
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 *       2. 존재하지 않는 이메일입니다.
 *       3. 비밀번호가 일치하지 않습니다.
 */
const postLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield auth_1.default.postLoginService(req.body.email, req.body.password);
        if (resData === constant_1.default.NULL_VALUE) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        else if (resData === -100) {
            response_1.default.basicResponse(res, returnCode_1.default.NOT_FOUND, false, "존재하지 않는 이메일입니다.");
        }
        else if (resData === -101) {
            response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "비밀번호가 일치하지 않습니다.");
        }
        else {
            response_1.default.dataResponse(res, returnCode_1.default.OK, "장서현의 첫 api 소중히 다뤄주세요 💋", true, resData);
        }
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
const authController = {
    postSignupController,
    postLoginController,
};
exports.default = authController;
//# sourceMappingURL=auth.js.map
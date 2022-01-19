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
const constant_1 = __importDefault(require("../library/constant"));
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
// service
const auth_1 = __importDefault(require("../service/auth"));
/**
 *  @이메일_유효성_검사
 *  @route GET /auth/email?email=
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 */
const getEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield auth_1.default.getEmailService(req.query.email ? String(req.query.email) : undefined);
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.dataResponse(res, returnCode_1.default.OK, "잘못된 요청 값이 들어왔습니다.", true, { isValid: false });
        }
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_EMAIL_CONVENTION) {
            return response_1.default.dataResponse(res, returnCode_1.default.OK, "이메일 형식에 맞지 않는 메일 주소입니다.", true, { isValid: false });
        }
        if (resData === constant_1.default.EMAIL_ALREADY_EXIST) {
            return response_1.default.dataResponse(res, returnCode_1.default.OK, "이미 사용 중인 이메일입니다.", true, { isValid: false });
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "사용할 수 있는 이메일입니다.", true, { isValid: true });
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @닉네임_유효성_검사
 *  @route GET /auth/nickname?nickname=
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 */
const getNicknameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield auth_1.default.getNicknameService(req.query.nickname ? String(req.query.nickname) : undefined);
        if (resData === constant_1.default.WRONG_REQUEST_VALUE) {
            return response_1.default.dataResponse(res, returnCode_1.default.OK, "잘못된 요청 값이 들어왔습니다.", true, { isValid: false });
        }
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_NICKNAME_CONVENTION) {
            return response_1.default.dataResponse(res, returnCode_1.default.OK, "10자 이내 영문/한글/숫자로 입력해주세요.", true, { isValid: false });
        }
        if (resData === constant_1.default.NICKNAME_ALREADY_EXIST) {
            return response_1.default.dataResponse(res, returnCode_1.default.OK, "이미 사용 중인 닉네임입니다.", true, { isValid: false });
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "사용 가능한 닉네임입니다.", true, { isValid: true });
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
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
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.EMAIL_NOT_FOUND) {
            return response_1.default.basicResponse(res, returnCode_1.default.NOT_FOUND, false, "존재하지 않는 이메일입니다.");
        }
        if (resData === constant_1.default.PW_NOT_CORRECT) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "비밀번호가 일치하지 않습니다.");
        }
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "장서현의 첫 api 소중히 다뤄주세요 💋", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
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
        const resData = yield auth_1.default.postSignupService(req.body.email, req.body.nickname, req.body.password);
        if (resData === constant_1.default.NULL_VALUE) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "필요한 값이 없습니다.");
        }
        if (resData === constant_1.default.WRONG_EMAIL_CONVENTION) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "올바르지 않은 이메일 형식 입니다.");
        }
        if (resData === constant_1.default.WRONG_NICKNAME_CONVENTION) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "올바르지 않은 닉네임 형식 입니다.");
        }
        if (resData === constant_1.default.WRONG_PASSWORD_CONVENTION) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "올바르지 않은 패스워드 형식 입니다.");
        }
        if (resData === constant_1.default.EMAIL_ALREADY_EXIST) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "이미 존재하는 이메일 입니다.");
        }
        if (resData === constant_1.default.NICKNAME_ALREADY_EXIST) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "이미 존재하는 닉네임 입니다.");
        }
        return response_1.default.tokenResponse(res, returnCode_1.default.CREATED, "이동근의 북스테어즈에 온 것을 환영합니다. 😘", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
/**
 *  @로그인_여부_검사
 *  @route GET /auth/check
 *  @access public
 *  @err
 */
const getLoginFlagController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield auth_1.default.getLoginFlagService(req.user ? true : false);
        return response_1.default.dataResponse(res, returnCode_1.default.OK, "로그인 여부 확인 성공.", true, resData);
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        return response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
const authController = {
    getEmailController,
    getNicknameController,
    postLoginController,
    postSignupController,
    getLoginFlagController,
};
exports.default = authController;
//# sourceMappingURL=auth.js.map
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
const config_1 = __importDefault(require("../config"));
// library
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const constant_1 = __importDefault(require("../library/constant"));
const checkValidation_1 = require("../library/checkValidation");
const convertSnakeToCamel_1 = require("../library/convertSnakeToCamel");
// model
const User_1 = __importDefault(require("../models/User"));
/**
 *  @이메일_유효성_검사
 *  @route GET /auth/email?email=
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 */
const getEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // 잘못된 요청값이 들어왔을 때 (query !== email)
    if (email === undefined) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // 필요한 값이 존재하지 않는 경우
    if (!email) {
        return constant_1.default.NULL_VALUE;
    }
    // email 형식이 잘못되었을 때
    if (!(0, isEmail_1.default)(email)) {
        return constant_1.default.WRONG_EMAIL_CONVENTION;
    }
    // email이 이미 존재할 때
    // TODO: DB에서 isDeleted string으로 되있는 것 변경
    const emailExist = yield User_1.default.exists((0, convertSnakeToCamel_1.keysToSnake)({ email, isDeleted: false }));
    if (emailExist) {
        return constant_1.default.EMAIL_ALREADY_EXIST;
    }
    return constant_1.default.SUCCESS;
});
/**
 *  @닉네임_유효성_검사
 *  @route GET /auth/nickname?nickname=
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 */
const getNicknameService = (nickname) => __awaiter(void 0, void 0, void 0, function* () {
    // 잘못된 요청값이 들어왔을 때 (query !== nickname)
    if (nickname === undefined) {
        return constant_1.default.WRONG_REQUEST_VALUE;
    }
    // 필요한 값이 존재하지 않는 경우
    if (!nickname) {
        return constant_1.default.NULL_VALUE;
    }
    // nickname 형식이 잘못되었을 때
    if (!(0, checkValidation_1.checkNicknameValid)(nickname)) {
        return constant_1.default.WRONG_NICKNAME_CONVENTION;
    }
    // nickname이 이미 존재할 때
    const nicknameExist = yield User_1.default.find({
        nickname,
        isDeleted: false,
    });
    if (nicknameExist.length > 0) {
        return constant_1.default.NICKNAME_ALREADY_EXIST;
    }
    return constant_1.default.SUCCESS;
});
/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 *       2. 존재하지 않는 이메일입니다.
 *       3. 비밀번호가 일치하지 않습니다.
 */
const postLoginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // 요청 바디 부족
    if (!email || !password) {
        return constant_1.default.NULL_VALUE;
    }
    // 존재하지 않는 이메일
    const user = yield User_1.default.findOne({
        email,
        isDeleted: false,
    });
    if (!user) {
        return constant_1.default.EMAIL_NOT_FOUND;
    }
    // 비밀번호 일치 X
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return constant_1.default.PW_NOT_CORRECT;
    }
    // 성공 시
    // 토큰 만들기
    const payload = {
        user: {
            id: user.id,
        },
    };
    const nickname = user.nickname;
    const userEmail = user.email;
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: "14d" });
    return { email: userEmail, nickname, token };
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
const postSignupService = (email, nickname, password) => __awaiter(void 0, void 0, void 0, function* () {
    // 필요한 값이 존재하지 않는 경우
    if (!email || !nickname || !password) {
        return constant_1.default.NULL_VALUE;
    }
    // email 형식이 잘못되었을 때
    if (!(0, isEmail_1.default)(email)) {
        return constant_1.default.WRONG_EMAIL_CONVENTION;
    }
    // nickname 형식이 잘못되었을 때
    if (!(0, checkValidation_1.checkNicknameValid)(nickname)) {
        return constant_1.default.WRONG_NICKNAME_CONVENTION;
    }
    // password 형식이 잘못되었을 때
    if (!(0, checkValidation_1.checkPasswordValid)(password)) {
        return constant_1.default.WRONG_PASSWORD_CONVENTION;
    }
    // email이 이미 존재할 때
    const emailExist = yield User_1.default.exists((0, convertSnakeToCamel_1.keysToSnake)({ email, isDeleted: false }));
    if (emailExist) {
        return constant_1.default.EMAIL_ALREADY_EXIST;
    }
    // nickname이 이미 존재할 때
    const nicknameExist = yield User_1.default.exists((0, convertSnakeToCamel_1.keysToSnake)({ nickname, isDeleted: false }));
    if (nicknameExist) {
        return constant_1.default.NICKNAME_ALREADY_EXIST;
    }
    // 새로운 유저 생성 & 토큰 발급
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield User_1.default.create({
        email,
        password: hashedPassword,
        nickname,
    });
    const payload = {
        user: {
            id: user.id,
        },
    };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
        expiresIn: "14d",
    });
    return token;
});
/**
 *  @로그인_여부_검사
 *  @route GET /auth/check
 *  @access public
 *  @err
 */
const getLoginFlagService = (isLogin) => __awaiter(void 0, void 0, void 0, function* () {
    return { isLogin };
});
const authService = {
    getEmailService,
    getNicknameService,
    postLoginService,
    postSignupService,
    getLoginFlagService,
};
exports.default = authService;
//# sourceMappingURL=auth.js.map
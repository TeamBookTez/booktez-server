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
const checkValidation_1 = require("../../library/checkValidation");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const constant_1 = __importDefault(require("../../library/constant"));
// model
const models_1 = require("../../models");
// service
const auth_1 = __importDefault(require("../../service/auth"));
describe("auth test", function () {
    let user;
    // getEmailService test - 이메일 유효성 검사
    describe("getEmailService test", () => __awaiter(this, void 0, void 0, function* () {
        const mochaEmail = "mocha@naver.com";
        // 이메일이 이미 사용중인 경우
        it("fail: email already exist", () => __awaiter(this, void 0, void 0, function* () {
            user = yield models_1.User.create({
                email: mochaEmail,
                nickname: "mocha",
                password: "mocha!234",
            });
            assert_1.default.strictEqual(yield auth_1.default.getEmailService(mochaEmail), constant_1.default.EMAIL_ALREADY_EXIST);
        }));
        // 적합하지 않은 이메일
        it("fail: invalid email", () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.ok(!(0, isEmail_1.default)("mochaInvalid"));
        }));
        // 성공
        it("success", () => __awaiter(this, void 0, void 0, function* () {
            yield user.destroy();
            assert_1.default.strictEqual(yield auth_1.default.getEmailService(mochaEmail), constant_1.default.SUCCESS);
        }));
    }));
    // getNicknameService test - 닉네임 유효성 검사
    describe("getNicknameService test", () => __awaiter(this, void 0, void 0, function* () {
        // 테스트 이메일
        let user;
        const mochaNickname = "mochatest";
        // 닉네임이 이미 사용중인 경우
        it("fail: nickname already exist", () => __awaiter(this, void 0, void 0, function* () {
            user = yield models_1.User.create({
                email: "mocha@naver.com",
                nickname: mochaNickname,
                password: "mocha!234",
            });
            assert_1.default.strictEqual(yield auth_1.default.getNicknameService(mochaNickname), constant_1.default.NICKNAME_ALREADY_EXIST);
        }));
        // 적합하지 않은 닉네임
        it("fail: invalid nickname", () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("룡"));
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("12345678901"));
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("do ng"));
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("닉#네임"));
        }));
        // 성공
        it("success", () => __awaiter(this, void 0, void 0, function* () {
            yield user.destroy();
            assert_1.default.ok((0, checkValidation_1.checkNicknameValid)("부욱테에즈으모카"));
        }));
    }));
    // postLoginService test - 로그인
    describe("postLoginService test", () => {
        const mochaEmail = "mochatest@naver.com";
        const mochaNickname = "mochaNickkk";
        const mochaPwd = "mocha!234";
        // 존재하지 않는 이메일
        it("fail: email not found", () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield auth_1.default.postLoginService(mochaEmail, mochaPwd), constant_1.default.EMAIL_NOT_FOUND);
        }));
        // 패스워드가 일지하지 않음
        it("fail: invalid password", () => __awaiter(this, void 0, void 0, function* () {
            user = yield models_1.User.create({
                email: mochaEmail,
                nickname: mochaNickname,
                password: mochaPwd,
            });
            assert_1.default.strictEqual(yield auth_1.default.postLoginService(mochaEmail, "mochatt"), constant_1.default.PW_NOT_CORRECT);
            yield user.destroy();
        }));
    });
    // postSignupService - 회원가입
    describe("getSignupService test", () => {
        // 적합하지 않은 이메일
        it("fail: invalid email", () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.ok(!(0, isEmail_1.default)("mochaInvalid"));
        }));
        // 적합하지 않은 닉네임
        it("fail: invalid nickname", () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("룡"));
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("12345678901"));
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("do ng"));
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("닉#네임"));
        }));
        it("fail: wrong password convention", () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("q!1"));
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("!@#$%^&*()qwertyuiop1234567890!@#$%^&*()qwertyuiop123456789012345"));
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("!234 qwer"));
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("1234qwer"));
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("1234!@#$"));
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("qwer!@#$"));
            assert_1.default.ok((0, checkValidation_1.checkPasswordValid)("!234qwer"));
        }));
        // 성공
        it("success", () => __awaiter(this, void 0, void 0, function* () {
            let user;
            const mochaEmail = "mochatest@naver.com";
            const mochaNickname = "mochaNickkk";
            const mochaPwd = "mocha!234";
            assert_1.default.ok(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield auth_1.default.postSignupService(mochaEmail, mochaNickname, mochaPwd);
                    user = yield models_1.User.findOne({
                        where: { email: mochaEmail, isDeleted: false },
                    });
                    if (user)
                        return true;
                    else
                        return false;
                });
            });
            yield models_1.User.destroy({ where: { email: mochaEmail } });
        }));
    });
});
//# sourceMappingURL=auth.spec.js.map
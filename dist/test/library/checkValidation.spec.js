"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
// library
const checkValidation_1 = require("../../library/checkValidation");
describe("checkValidation test", () => {
    describe("checkNicknameValid test", () => {
        it("fail: length is less than 2", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("룡"));
        });
        it("fail: length is longer than 10", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("12345678901"));
        });
        it("fail: include space", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("do ng"));
        });
        it("fail: include special character", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkNicknameValid)("닉#네임"));
        });
        it("success: 2-8 letters, no special character", () => {
            assert_1.default.ok((0, checkValidation_1.checkNicknameValid)("닉네임"));
        });
    });
    describe("checkPasswordValid test", () => {
        it("fail: length is less than 8", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("q!1"));
        });
        it("fail: length is longer than 64", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("!@#$%^&*()qwertyuiop1234567890!@#$%^&*()qwertyuiop123456789012345"));
        });
        it("fail: include space", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("!234 qwer"));
        });
        it("fail: not include special character", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("1234qwer"));
        });
        it("fail: not include english character", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("1234!@#$"));
        });
        it("fail: not include number character", () => {
            assert_1.default.ok(!(0, checkValidation_1.checkPasswordValid)("qwer!@#$"));
        });
        it("success: 8-64 letters, include english, number, special character", () => {
            assert_1.default.ok((0, checkValidation_1.checkPasswordValid)("!234qwer"));
        });
    });
});
//# sourceMappingURL=checkValidation.spec.js.map
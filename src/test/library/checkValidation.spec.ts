import assert from "assert";
import {
  checkNicknameValid,
  checkPasswordValid,
} from "../../library/checkValidation";

describe("checkValidation test", function () {
  describe("checkNicknameValid test", function () {
    it("false: length is less than 2", function () {
      assert.ok(!checkNicknameValid("룡"));
    });
    it("false: length is longer than 10", function () {
      assert.ok(!checkNicknameValid("12345678901"));
    });
    it("false: include space", function () {
      assert.ok(!checkNicknameValid("do ng"));
    });
    it("false: include special character", function () {
      assert.ok(!checkNicknameValid("닉#네임"));
    });
    it("true: 2-8 letters, no special character", function () {
      assert.ok(checkNicknameValid("닉네임"));
    });
  });

  describe("checkPasswordValid test", () => {
    it("fail: length is less than 8", () => {
      assert.ok(!checkPasswordValid("q!1"));
    });
    it("fail: length is longer than 64", () => {
      assert.ok(
        !checkPasswordValid(
          "!@#$%^&*()qwertyuiop1234567890!@#$%^&*()qwertyuiop123456789012345"
        )
      );
    });
    it("fail: include space", () => {
      assert.ok(!checkPasswordValid("!234 qwer"));
    });
    it("fail: not include special character", () => {
      assert.ok(!checkPasswordValid("1234qwer"));
    });
    it("fail: not include english character", () => {
      assert.ok(!checkPasswordValid("1234!@#$"));
    });
    it("fail: not include number character", () => {
      assert.ok(!checkPasswordValid("qwer!@#$"));
    });
    it("success: 8-64 letters, include english, number, special character", () => {
      assert.ok(checkPasswordValid("!234qwer"));
    });
  });
});

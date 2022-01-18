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

  describe("checkPasswordValid test", function () {
    it("false: length is less than 8", function () {
      assert.ok(!checkPasswordValid("q!1"));
    });
    it("false: length is longer than 64", function () {
      assert.ok(
        !checkPasswordValid(
          "!@#$%^&*()qwertyuiop1234567890!@#$%^&*()qwertyuiop123456789012345"
        )
      );
    });
    it("false: include space", function () {
      assert.ok(!checkPasswordValid("!234 qwer"));
    });
    it("false: not include special character", function () {
      assert.ok(!checkPasswordValid("1234qwer"));
    });
    it("false: not include english character", function () {
      assert.ok(!checkPasswordValid("1234!@#$"));
    });
    it("false: not include number character", function () {
      assert.ok(!checkPasswordValid("qwer!@#$"));
    });
    it("true: 8-64 letters, include english, number, special character", function () {
      assert.ok(checkPasswordValid("!234qwer"));
    });
  });
});

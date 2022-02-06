import assert from "assert";

// library
import {
  checkNicknameValid,
  checkPasswordValid,
} from "../../library/checkValidation";
import isEmail from "validator/lib/isEmail";
import constant from "../../library/constant";

// model
import { User } from "../../models";

// service
import authService from "../../service/auth";

describe("auth test", function () {
  let user: User;

  // getEmailService test - 이메일 유효성 검사
  describe("getEmailService test", async () => {
    const mochaEmail: string = "mocha@naver.com";

    // 이메일이 이미 사용중인 경우
    it("fail: email already exist", async () => {
      user = await User.create({
        email: mochaEmail,
        nickname: "mocha",
        password: "mocha!234",
      });

      assert.strictEqual(
        await authService.getEmailService(mochaEmail),
        constant.EMAIL_ALREADY_EXIST
      );
    });

    // 적합하지 않은 이메일
    it("fail: invalid email", async () => {
      assert.ok(!isEmail("mochaInvalid"));
    });

    // 성공
    it("success", async () => {
      await user.destroy();
      assert.strictEqual(
        await authService.getEmailService(mochaEmail),
        constant.SUCCESS
      );
    });
  });

  // getNicknameService test - 닉네임 유효성 검사
  describe("getNicknameService test", async () => {
    // 테스트 이메일
    let user: User;
    const mochaNickname: string = "mochatest";

    // 닉네임이 이미 사용중인 경우
    it("fail: nickname already exist", async () => {
      user = await User.create({
        email: "mocha@naver.com",
        nickname: mochaNickname,
        password: "mocha!234",
      });
      assert.strictEqual(
        await authService.getNicknameService(mochaNickname),
        constant.NICKNAME_ALREADY_EXIST
      );
    });

    // 적합하지 않은 닉네임
    it("fail: invalid nickname", async () => {
      assert.ok(!checkNicknameValid("룡"));
      assert.ok(!checkNicknameValid("12345678901"));
      assert.ok(!checkNicknameValid("do ng"));
      assert.ok(!checkNicknameValid("닉#네임"));
    });

    // 성공
    it("success", async () => {
      await user.destroy();
      assert.ok(checkNicknameValid("부욱테에즈으모카"));
    });
  });

  // postLoginService test - 로그인
  describe("postLoginService test", () => {
    const mochaEmail: string = "mochatest@naver.com";
    const mochaNickname: string = "mochaNickkk";
    const mochaPwd: string = "mocha!234";

    // 존재하지 않는 이메일
    it("fail: email not found", async () => {
      assert.strictEqual(
        await authService.postLoginService(mochaEmail, mochaPwd),
        constant.EMAIL_NOT_FOUND
      );
    });

    // 패스워드가 일지하지 않음
    it("fail: invalid password", async () => {
      user = await User.create({
        email: mochaEmail,
        nickname: mochaNickname,
        password: mochaPwd,
      });
      assert.strictEqual(
        await authService.postLoginService(mochaEmail, "mochatt"),
        constant.PW_NOT_CORRECT
      );

      await user.destroy();
    });
  });

  // postSignupService - 회원가입
  describe("getSignupService test", () => {
    // 적합하지 않은 이메일
    it("fail: invalid email", async () => {
      assert.ok(!isEmail("mochaInvalid"));
    });

    // 적합하지 않은 닉네임
    it("fail: invalid nickname", async () => {
      assert.ok(!checkNicknameValid("룡"));
      assert.ok(!checkNicknameValid("12345678901"));
      assert.ok(!checkNicknameValid("do ng"));
      assert.ok(!checkNicknameValid("닉#네임"));
    });

    it("fail: wrong password convention", async () => {
      assert.ok(!checkPasswordValid("q!1"));
      assert.ok(
        !checkPasswordValid(
          "!@#$%^&*()qwertyuiop1234567890!@#$%^&*()qwertyuiop123456789012345"
        )
      );
      assert.ok(!checkPasswordValid("!234 qwer"));
      assert.ok(!checkPasswordValid("1234qwer"));
      assert.ok(!checkPasswordValid("1234!@#$"));
      assert.ok(!checkPasswordValid("qwer!@#$"));
      assert.ok(checkPasswordValid("!234qwer"));
    });

    // 성공
    it("success", async () => {
      let user: User;
      const mochaEmail: string = "mochatest@naver.com";
      const mochaNickname: string = "mochaNickkk";
      const mochaPwd: string = "mocha!234";

      assert.ok(async function () {
        await authService.postSignupService(
          mochaEmail,
          mochaNickname,
          mochaPwd
        );
        user = await User.findOne({
          where: { email: mochaEmail, isDeleted: false },
        });

        if (user) return true;
        else return false;
      });

      await User.destroy({ where: { email: mochaEmail } });
    });
  });
});

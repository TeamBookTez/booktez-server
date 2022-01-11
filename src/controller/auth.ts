import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// libraries
import constant from "../library/constant";
import response from "../library/response";
import returnCode from "../library/returnCode";

// services
import authService from "../service/auth";

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
const postSignupController = async (req: Request, res: Response) => {
  try {
    const resData = await authService.postSignupService(req.body);

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === constant.WRONG_EMAIL_CONVENTION) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 이메일 형식 입니다."
      );
    } else if (resData === constant.WRONG_NICKNAME_CONVENTION) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 닉네임 형식 입니다."
      );
    } else if (resData === constant.WRONG_PASSWORD_CONVENTION) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 패스워드 형식 입니다."
      );
    } else if (resData === constant.EMAIL_ALREADY_EXIST) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 존재하는 이메일 입니다."
      );
    } else if (resData === constant.NICKNAME_ALREADY_EXIST) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 존재하는 닉네임 입니다."
      );
    } else {
      response.tokenResponse(
        res,
        returnCode.CREATED,
        "이동근의 북스테어즈에 온 것을 환영합니다.",
        true,
        resData.token
      );
    }
  } catch (err) {
    slack.slackWebhook(req, err.message);
    console.error(err.message);
    response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
};
const authController = {
  postSignupController,
};

export default authController;

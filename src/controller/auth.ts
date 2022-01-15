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
 *  @이메일 유효성 검사
 *  @route GET /auth/email
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 */
const getEmailController = async (req: Request, res: Response) => {
  try {
    const resData: number = await authService.getEmailService(req.body.email);

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === constant.WRONG_EMAIL_CONVENTION) {
      response.dataResponse(
        res,
        returnCode.OK,
        "올바른 형식이 아닙니다.",
        true,
        { isValid: false }
      );
    } else if (resData === constant.EMAIL_ALREADY_EXIST) {
      response.dataResponse(
        res,
        returnCode.OK,
        "이미 사용 중인 이메일입니다.",
        true,
        { isValid: false }
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        "사용할 수 있는 이메일입니다.",
        true,
        { isValid: true }
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
        resData
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

/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 *       2. 존재하지 않는 이메일입니다.
 *       3. 비밀번호가 일치하지 않습니다.
 */

const postLoginController = async (req: Request, res: Response) => {
  try {
    const resData = await authService.postLoginService(
      req.body.email,
      req.body.password
    );

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === -100) {
      response.basicResponse(
        res,
        returnCode.NOT_FOUND,
        false,
        "존재하지 않는 이메일입니다."
      );
    } else if (resData === -101) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "비밀번호가 일치하지 않습니다."
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        "장서현의 첫 api 소중히 다뤄주세요 💋",
        true,
        resData
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

/**
 *  @닉네임_유효성_검사
 *  @route get auth/nickname
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 */

const getNicknameController = async (req: Request, res: Response) => {
  try {
    const resData = await authService.getNicknameService(req.body.nickname);

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === constant.WRONG_NICKNAME_CONVENTION) {
      response.dataResponse(
        res,
        returnCode.OK,
        "올바른 형식이 아닙니다.",
        true,
        { isValid: false }
      );
    } else if (resData === constant.NICKNAME_ALREADY_EXIST) {
      response.dataResponse(
        res,
        returnCode.OK,
        "이미 사용 중인 닉네임입니다.",
        true,
        { isValid: false }
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        "사용 가능한 닉네임입니다.",
        true,
        { isValid: true }
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
  getEmailController,
  getNicknameController,
  postSignupController,
  postLoginController,
};

export default authController;

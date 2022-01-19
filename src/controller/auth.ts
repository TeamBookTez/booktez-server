import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// library
import constant from "../library/constant";
import response from "../library/response";
import returnCode from "../library/returnCode";

// service
import authService from "../service/auth";

/**
 *  @이메일_유효성_검사
 *  @route GET /auth/email?email=
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 */
const getEmailController = async (req: Request, res: Response) => {
  try {
    const resData: number = await authService.getEmailService(
      req.query.email ? String(req.query.email) : undefined
    );

    if (resData === constant.WRONG_REQUEST_VALUE) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "잘못된 요청 값이 들어왔습니다.",
        true,
        { isValid: false }
      );
    }

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.WRONG_EMAIL_CONVENTION) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "이메일 형식에 맞지 않는 메일 주소입니다.",
        true,
        { isValid: false }
      );
    }

    if (resData === constant.EMAIL_ALREADY_EXIST) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "이미 사용 중인 이메일입니다.",
        true,
        { isValid: false }
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      "사용할 수 있는 이메일입니다.",
      true,
      { isValid: true }
    );
  } catch (err) {
    slack.slackWebhook(req, err.message);
    console.error(err.message);
    return response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
};

/**
 *  @닉네임_유효성_검사
 *  @route GET /auth/nickname?nickname=
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 */
const getNicknameController = async (req: Request, res: Response) => {
  try {
    const resData = await authService.getNicknameService(
      req.query.nickname ? String(req.query.nickname) : undefined
    );

    if (resData === constant.WRONG_REQUEST_VALUE) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "잘못된 요청 값이 들어왔습니다.",
        true,
        { isValid: false }
      );
    }

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.WRONG_NICKNAME_CONVENTION) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "10자 이내 영문/한글/숫자로 입력해주세요.",
        true,
        { isValid: false }
      );
    }

    if (resData === constant.NICKNAME_ALREADY_EXIST) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "이미 사용 중인 닉네임입니다.",
        true,
        { isValid: false }
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      "사용 가능한 닉네임입니다.",
      true,
      { isValid: true }
    );
  } catch (err) {
    slack.slackWebhook(req, err.message);
    console.error(err.message);
    return response.basicResponse(
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
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.EMAIL_NOT_FOUND) {
      return response.basicResponse(
        res,
        returnCode.NOT_FOUND,
        false,
        "존재하지 않는 이메일입니다."
      );
    }

    if (resData === constant.PW_NOT_CORRECT) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "비밀번호가 일치하지 않습니다."
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      "장서현의 첫 api 소중히 다뤄주세요 💋",
      true,
      resData
    );
  } catch (err) {
    slack.slackWebhook(req, err.message);
    console.error(err.message);
    return response.basicResponse(
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
    const resData = await authService.postSignupService(
      req.body.email,
      req.body.nickname,
      req.body.password
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.WRONG_EMAIL_CONVENTION) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 이메일 형식 입니다."
      );
    }

    if (resData === constant.WRONG_NICKNAME_CONVENTION) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 닉네임 형식 입니다."
      );
    }

    if (resData === constant.WRONG_PASSWORD_CONVENTION) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 패스워드 형식 입니다."
      );
    }

    if (resData === constant.EMAIL_ALREADY_EXIST) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 존재하는 이메일 입니다."
      );
    }

    if (resData === constant.NICKNAME_ALREADY_EXIST) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 존재하는 닉네임 입니다."
      );
    }

    return response.tokenResponse(
      res,
      returnCode.CREATED,
      "이동근의 북스테어즈에 온 것을 환영합니다. 😘",
      true,
      resData
    );
  } catch (err) {
    slack.slackWebhook(req, err.message);
    console.error(err.message);
    return response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
};

/**
 *  @로그인_여부_검사
 *  @route GET /auth/check
 *  @access public
 *  @err 
 */
const getLoginFlagController = async(req: Request, res: Response) => {
  try {
    const resData = await authService.getLoginFlagService(
      req.user ? true : false
    )
    return response.dataResponse(
      res, 
      returnCode.OK,
      "로그인 여부 확인 성공.", 
      true, 
      resData
    );
  } catch (err) {
    slack.slackWebhook(req, err.message);
    console.error(err.message);
    return response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
}

const authController = {
  getEmailController,
  getNicknameController,
  postLoginController,
  postSignupController,
  getLoginFlagController,
};

export default authController;

import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";

// services
import authService from "../service/auth";

/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 *  @err
 */

const postLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.postLoginService(email, password);

    if (data === -1) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다.",
      );
    } else if (data === -2) {
      response.basicResponse(
        res,
        returnCode.NOT_FOUND,
        false,
        "존재하지 않는 이메일입니다.",
      );
    } else if (data === -3) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "비밀번호가 일치하지 않습니다.",
      );
    } else {
      const { nickname, token } = data;
      response.dataResponse(res, returnCode.OK,  "장서현의 첫 api 소중히 다뤄주세요 💋", true, data);
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
  postLoginController,
};

export default authController;

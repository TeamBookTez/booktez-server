import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";
import constant from "../library/constant";

// service
import userService from "../service/user";
import { resolveModelGetter } from "sequelize-typescript";

/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err
 */

const getMyInfoController = async (req: Request, res: Response) => {
  try {
    const resData = await userService.getMyInfoService(req.body.userID.id);
    response.dataResponse(
      res,
      returnCode.OK,
      "마이페이지 조회 성공.",
      true,
      resData
    );
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

const userController = {
  getMyInfoController,
};

export default userController;

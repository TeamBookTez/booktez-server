import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// library
import response from "../library/response";
import returnCode from "../library/returnCode";
import constant from "../library/constant";

// service
import userService from "../service/user";

/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err
 */
const getMyInfoController = async (req: Request, res: Response) => {
  try {
    const resData = await userService.getMyInfoService(req.user.id);

    if (resData === constant.NON_EXISTENT_USER) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 유저입니다."
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      "마이페이지 조회 성공.",
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
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access private
 *  @err 1. 잘못된 폼 데이터
 *       2. 존재하지 않는 유저
 */
const patchImgController = async (req: Request, res: Response) => {
  try {
    const img = req.file.location ? req.file.location : null;

    const resData = await userService.patchImgService(req.user.id, img);

    // 폼데이터 잘못된 경우
    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 데이터가 없습니다."
      );
    }

    if (resData === constant.WRONG_IMG_FORM) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "잘못된 폼 데이터입니다."
      );
    }

    if (resData === constant.NON_EXISTENT_USER) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 유저입니다."
      );
    }

    // 모두 성공시
    return response.dataResponse(
      res,
      returnCode.OK,
      "프로필 이미지 변경 성공.",
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

const userController = {
  getMyInfoController,
  patchImgController,
};

export default userController;

import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";
import constant from "../library/constant";

// services
import reviewService from "../service/review";

/**
 *  @독서중 독서 전 작성
 *  @route POST /review/before/:isbn
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 */
const postReviewBeforeController = async (req: Request, res: Response) => {
  try {
    const resData = await reviewService.postReviewBeforeService(
      req.params.isbn,
      req.body.userID.id,
      req.body.answerOne,
      req.body.answerTwo,
      req.body.questionList,
      req.body.progress
    );

    if (resData === constant.WRONG_REQUEST_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "요청값이 잘못되었습니다."
      );
    } else if (resData === -101) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 ISBN입니다."
      );
    } else if (resData === constant.VALUE_ALREADY_EXIST) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 독후감이 존재합니다."
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        true,
        "독서 중 등록 성공",
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

const reivewController = {
  postReviewBeforeController,
};

export default reivewController;

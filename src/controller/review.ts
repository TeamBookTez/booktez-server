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
 *      2. 존재하지 않는 ISBN
 *      3. 이미 존재하는 독후감
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
        "작성이 완료되었습니다.",
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
 *  @독서중 독서 중 작성
 *  @route POST /review/now/:reviewId
 *  @access private
 *  @error
 *      1. 요청 값이 잘못됨
 *      2. 존재하지 않는 Review
 */
const postReviewNowController = async (req: Request, res: Response) => {
  try {
    const resData = await reviewService.postReviewNowService(
      Number(req.params.reviewId),
      req.body.userID.id,
      req.body.answerThree,
      req.body.progress
    );

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "요청값이 없습니다."
      );
    } else if (resData === constant.WRONG_REQUEST_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 Review입니다."
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        true,
        "작성이 완료되었습니다.",
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
 *  @독서 완료 후 답변 수정
 *  @route PATCH /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const patchReviewController = async (req: Request, res: Response) => {
  try {
    const resData = await reviewService.patchReviewService(
      Number(req.params.reviewId),
      req.body.answerOne,
      req.body.answerTwo,
      req.body.answerThree
    );

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === constant.WRONG_REQUEST_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 Review입니다."
      );
    } else {
      response.basicResponse(
        res,
        returnCode.OK,
        true,
        "수정이 완료되었습니다."
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
 *  @독후감 조회하기
 *  @route GET /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 리뷰가 존재하지 않을 때
 */
const getReviewController = async (req: Request, res: Response) => {
  try {
    const resData = await reviewService.getReviewService(
      Number(req.body.userID.id),
      Number(req.params.reviewId)
    );

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === constant.WRONG_REQUEST_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 Review입니다."
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        "독후감 조회 성공.",
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
 *  @독후감 삭제
 *  @route DELETE /review/:reviewId
 *  @access private
 *  @error
 *      1. 필요한 값이 없을 때
 *      2. 삭제될 리뷰가 없을 때
 *      3. 이미 삭제된 리뷰일 때
 */
const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const resData = await reviewService.deleteReviewService(
      Number(req.body.userID.id),
      Number(req.params.reviewId)
    );

    if (resData === constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else if (resData === constant.WRONG_REQUEST_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 Review입니다."
      );
    } else if (resData === constant.VALUE_ALREADY_DELETED) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 삭제된 Review 입니다."
      );
    } else {
      response.basicResponse(res, returnCode.OK, true, "독후감 삭제 성공.");
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

const reviewController = {
  postReviewBeforeController,
  postReviewNowController,
  patchReviewController,
  getReviewController,
  deleteReviewController,
};

export default reviewController;

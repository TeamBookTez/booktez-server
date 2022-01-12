import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// libraries
import constant from "../library/constant";
import response from "../library/response";
import returnCode from "../library/returnCode";

// services
import bookService from "../service/book";

/**
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.getBookService(req.body.userID.id);
    response.dataResponse(res, returnCode.OK, true, "서재 조회 성공", resData);
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
 *  @서재에 책 추가하기
 *  @route POST /book
 *  @access public
 *  @access private
 *  @err   필요한 값이 없을 때
 */
const postBookController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.postBookService(
      req.body.isLogin,
      req.body.isbn,
      req.body.thumbnail,
      req.body.title,
      req.body.author
    );

    if (resData == constant.NULL_VALUE) {
      response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    } else {
      response.dataResponse(
        res,
        returnCode.OK,
        true,
        "책 선택이 완료되었습니다.",
        { isLogin: resData }
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

const bookController = {
  getBookController,
  postBookController,
};

export default bookController;

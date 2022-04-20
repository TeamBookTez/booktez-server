import { Request, Response } from "express";

// slack
import slack from "../others/slack/slack";

// library
import constant from "../library/constant";
import response from "../library/response";
import returnCode from "../library/returnCode";

// service
import bookService from "../service/book";

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
      req.user ? true : false,
      req.user ? req.user.id : constant.ANONYMOUS_USER,
      req.body.isbn,
      req.body.thumbnail,
      req.body.title,
      req.body.author,
      req.body.translator,
      req.body.publicationDt
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.ANONYMOUS_USER) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "회원가입이 필요합니다.",
        true,
        {
          isLogin: false,
          reviewId: constant.ANONYMOUS_USER,
        }
      );
    }

    if (resData === constant.VALUE_ALREADY_EXIST) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 독후감이 존재합니다."
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      "책 선택이 완료되었습니다.",
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
 *  @서재 책 조회
 *  @route GET /book
 *  @access private
 */
const getBookController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.getBookService(req.user.id);
    return response.dataResponse(
      res,
      returnCode.OK,
      "서재 조회 성공",
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
 *  @서재  독서전 책 조회
 *  @route GET /book/pre
 *  @access private
 */
const getBookPreController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.getBookPreService(req.user.id);
    return response.dataResponse(
      res,
      returnCode.OK,
      "독서전 서재 조회 성공",
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
 *  @서재 독서중 책 조회
 *  @route GET /book/peri
 *  @access private
 */
const getBookPeriController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.getBookPeriService(req.user.id);
    return response.dataResponse(
      res,
      returnCode.OK,
      "독서중 서재 조회 성공",
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
 *  @서재 독서완료 책 조회
 *  @route GET /book/post
 *  @access private
 */
const getBookPostController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.getBookPostService(req.user.id);
    return response.dataResponse(
      res,
      returnCode.OK,
      "독서완료 서재 조회 성공",
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
 * @서재 중복검사
 * @route GET /book/exist/:isbn
 * @access private
 */
const getBookExistController = async (req: Request, res: Response) => {
  try {
    const resData = await bookService.getBookExistService(
      req.user.id,
      req.params.isbn
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.VALUE_ALREADY_EXIST) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "이미 추가된 책입니다.",
        true,
        { isExist: true }
      );
    }

    if (resData === constant.SUCCESS) {
      return response.dataResponse(
        res,
        returnCode.OK,
        "추가할 수 있는 책입니다.",
        true,
        { isExist: false }
      );
    }
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

const bookController = {
  postBookController,
  getBookController,
  getBookPreController,
  getBookPeriController,
  getBookPostController,
  getBookExistController,
};

export default bookController;

// libararies
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";

export default (req: Request, res: Response, next) => {
  // 로그인 변수
  let isLogin;

  // 토큰이 없을 경우
  if (req.headers.authorization == null) {
    isLogin = false;
    req.body.isLogin = isLogin;
    next();
  }

  const token = req.headers.authorization;
  try {
    // 적합한 토큰이 있을 경우
    // 로그인 상태
    const decoded = jwt.verify(token, config.jwtSecret);
    isLogin = true;

    req.body.userID = decoded.user;
    req.body.isLogin = isLogin;
    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "만료된 토큰입니다"
      );
    } else {
      response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "적합하지 않은 토큰입니다"
      );
    }
  }
};

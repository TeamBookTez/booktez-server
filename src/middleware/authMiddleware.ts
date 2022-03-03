import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { keysToSnake } from "../library/convertSnakeToCamel";

// library
import response from "../library/response";
import returnCode from "../library/returnCode";

// model
import User from "../models/User";

export const auth = async (req: Request, res: Response, next) => {
  // 토큰 검사
  if (
    req.headers.authorization === "" ||
    req.headers.authorization === null ||
    req.headers.authorization === undefined
  ) {
    return response.basicResponse(
      res,
      returnCode.BAD_REQUEST,
      false,
      "토큰 값이 요청되지 않았습니다"
    );
  }

  // Verify token
  try {
    const token: string = req.headers.authorization;
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.user.id).where(
      keysToSnake({ isDeleted: false })
    );

    if (!user) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "유저가 존재하지 않습니다."
      );
    }

    req.user = user;
    return next();
  } catch (err) {
    if (err.message === "jwt expired") {
      return response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "만료된 토큰입니다"
      );
    } else {
      return response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "적합하지 않은 토큰입니다"
      );
    }
  }
};

export const isLogin = async (req: Request, res: Response, next) => {
  // 로그인 변수
  // 토큰이 없을 경우
  if (
    req.headers.authorization === "" ||
    req.headers.authorization === null ||
    req.headers.authorization === undefined
  ) {
    return next();
  }

  try {
    // 적합한 토큰이 있을 경우
    // 로그인 상태
    const token: string = req.headers.authorization;
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.user.id).where(
      keysToSnake({ isDeleted: false })
    );

    if (!user) {
      return next();
    }

    req.user = user;

    return next();
  } catch (err) {
    return next();
  }
};

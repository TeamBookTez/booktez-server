// libararies
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";

// slack
import slack from "../others/slack/slack";

import User from "../models/User";
import { promises } from "fs";

export default async(req: Request, res: Response, next) => {
  // 토큰 검사
  if (req.headers.authorization == null) {
    response.basicResponse(
      res,
      returnCode.BAD_REQUEST,
      false,
      "토큰 값이 요청되지 않았습니다"
    );
  }
  const token = req.headers.authorization;

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.body.userID = decoded.user; // 이따 여기를

    const user = await User.findOne({
      where: { id: decoded.user.id, isDeleted: false },
    });

    // 이걸로 바꾸면 되는 ..
    // req.user = user;

    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      slack.slackWebhook(req, err.message);
      response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "만료된 토큰입니다"
      );
    } else {
      slack.slackWebhook(req, err.message);
      response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "적합하지 않은 토큰입니다"
      );
    }
  }
};

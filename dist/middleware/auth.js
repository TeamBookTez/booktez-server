"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// libraries
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
// slack
const slack_1 = __importDefault(require("../others/slack/slack"));
exports.default = (req, res, next) => {
    // 토큰 검사
    if (req.headers.authorization == null) {
        response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "토큰 값이 요청되지 않았습니다");
    }
    const token = req.headers.authorization;
    // Verify token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.body.userID = decoded.user;
        next();
    }
    catch (err) {
        if (err.message === "jwt expired") {
            slack_1.default.slackWebhook(req, err.message);
            response_1.default.basicResponse(res, returnCode_1.default.UNAUTHORIZED, false, "만료된 토큰입니다");
        }
        else {
            slack_1.default.slackWebhook(req, err.message);
            response_1.default.basicResponse(res, returnCode_1.default.UNAUTHORIZED, false, "적합하지 않은 토큰입니다");
        }
    }
};
//# sourceMappingURL=auth.js.map
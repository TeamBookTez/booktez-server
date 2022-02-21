"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// library
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
// model
const User_1 = __importDefault(require("../models/User"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 토큰 검사
    if (req.headers.authorization === "" ||
        req.headers.authorization === null ||
        req.headers.authorization === undefined) {
        return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "토큰 값이 요청되지 않았습니다");
    }
    // Verify token
    try {
        const token = req.headers.authorization;
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const user = yield User_1.default.findOne({
            where: { id: decoded.user.id, isDeleted: false },
        });
        if (!user) {
            return response_1.default.basicResponse(res, returnCode_1.default.BAD_REQUEST, false, "유저가 존재하지 않습니다.");
        }
        req.user = user;
        return next();
    }
    catch (err) {
        if (err.message === "jwt expired") {
            return response_1.default.basicResponse(res, returnCode_1.default.UNAUTHORIZED, false, "만료된 토큰입니다");
        }
        else {
            return response_1.default.basicResponse(res, returnCode_1.default.UNAUTHORIZED, false, "적합하지 않은 토큰입니다");
        }
    }
});
exports.auth = auth;
const isLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 로그인 변수
    // 토큰이 없을 경우
    if (req.headers.authorization === "" ||
        req.headers.authorization === null ||
        req.headers.authorization === undefined) {
        return next();
    }
    try {
        // 적합한 토큰이 있을 경우
        // 로그인 상태
        const token = req.headers.authorization;
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const user = yield User_1.default.findOne({
            where: { id: decoded.user.id, isDeleted: false },
        });
        if (!user) {
            return next();
        }
        req.user = user;
        return next();
    }
    catch (err) {
        return next();
    }
});
exports.isLogin = isLogin;
//# sourceMappingURL=authMiddleware.js.map
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
// library
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcryptjs';
const constant_1 = __importDefault(require("../library/constant"));
// import index from "../config";
// model
const models_1 = require("../models");
/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err
 */
const getMyInfoService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: - user isDeleted 상태 확인
    const user = yield models_1.User.findOne({ where: { id: userId } });
    const img = user.img;
    const nickname = user.nickname;
    const email = user.email;
    const review = yield models_1.Review.findAll({
        where: {
            user_id: userId,
            is_deleted: false,
        },
    });
    const reviewCount = review.length;
    return { img, nickname, email, reviewCount };
});
/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access public
 *  @err 잘못된 폼데이터
 */
const patchImgService = (userId, img) => __awaiter(void 0, void 0, void 0, function* () {
    // 폼데이터 맞는지 체크 -> 아니면 return statusCode.WRONG_IMG_FORM
    if (!img) {
        return constant_1.default.NULL_VALUE;
    }
    else if (img === undefined) {
        return constant_1.default.WRONG_IMG_FORM;
    }
    // TODO: - user isDeleted 상태 확인
    // userId에 맞는 user의 img 업로드
    yield models_1.User.update({
        img: img,
    }, {
        where: { id: userId },
    });
});
const userService = {
    getMyInfoService,
    patchImgService,
};
exports.default = userService;
//# sourceMappingURL=user.js.map
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
const constant_1 = __importDefault(require("../library/constant"));
// model
const models_1 = require("../models");
/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err 1. 존재하지 않는 유저
 */
const getMyInfoService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({
        where: { id: userId, isDeleted: false }
    });
    if (!user) {
        return constant_1.default.NON_EXISTENT_USER;
    }
    const img = user.img;
    const nickname = user.nickname;
    const email = user.email;
    const reviewCount = yield models_1.Review.count({
        where: { userId, isDeleted: false }
    });
    return { img, nickname, email, reviewCount };
});
/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access public
 *  @err 1. 잘못된 폼 데이터
 *       2. 존재하지 않는 유저
 */
const patchImgService = (userId, img) => __awaiter(void 0, void 0, void 0, function* () {
    if (!img) {
        return constant_1.default.NULL_VALUE;
    }
    else if (img === undefined) {
        return constant_1.default.WRONG_IMG_FORM;
    }
    const user = yield models_1.User.findOne({ where: { id: userId, isDeleted: false } });
    if (!user) {
        return constant_1.default.NON_EXISTENT_USER;
    }
    yield user.update({ img: img });
    yield user.save();
    return { img: user.img };
});
const userService = {
    getMyInfoService,
    patchImgService,
};
exports.default = userService;
//# sourceMappingURL=user.js.map
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
const mongoose_1 = __importDefault(require("mongoose"));
// library
const constant_1 = __importDefault(require("../library/constant"));
const convertSnakeToCamel_1 = require("../library/convertSnakeToCamel");
// model
const User_1 = __importDefault(require("../models/User"));
const Review_1 = __importDefault(require("../models/Review"));
/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err 1. 존재하지 않는 유저
 */
const getMyInfoService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(new mongoose_1.default.Types.ObjectId(userId)).where((0, convertSnakeToCamel_1.keysToSnake)({ isDeleted: false }));
    if (!user) {
        return constant_1.default.NON_EXISTENT_USER;
    }
    const img = user.img;
    const nickname = user.nickname;
    const email = user.email;
    const reviewCount = yield Review_1.default.countDocuments().where((0, convertSnakeToCamel_1.keysToSnake)({ userId, isDeleted: false }));
    return { img, nickname, email, reviewCount };
});
/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access private
 *  @err 1. 잘못된 폼 데이터
 *       2. 존재하지 않는 유저
 */
const patchImgService = (userId, img) => __awaiter(void 0, void 0, void 0, function* () {
    if (!img) {
        return constant_1.default.NULL_VALUE;
    }
    if (img === undefined) {
        return constant_1.default.WRONG_IMG_FORM;
    }
    const user = yield User_1.default.findById(new mongoose_1.default.Types.ObjectId(userId)).where((0, convertSnakeToCamel_1.keysToSnake)({ isDeleted: false }));
    if (!user) {
        return constant_1.default.NON_EXISTENT_USER;
    }
    yield user.updateOne({ img });
    return { img };
});
const userService = {
    getMyInfoService,
    patchImgService,
};
exports.default = userService;
//# sourceMappingURL=user.js.map
import mongoose from "mongoose";

// library
import constant from "../library/constant";
import { keysToSnake, keysToCamel } from "../library/convertSnakeToCamel";

// model
import User from "../models/User";
import Review from "../models/Review";

/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err 1. 존재하지 않는 유저
 */
const getMyInfoService = async (userId: string) => {
  const user = await User.findById(new mongoose.Types.ObjectId(userId)).where(
    keysToSnake({ isDeleted: false })
  );

  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  const img = user.img;
  const nickname = user.nickname;
  const email = user.email;
  const reviewCount = await Review.countDocuments().where(
    keysToSnake({ userId, isDeleted: false })
  );

  return { img, nickname, email, reviewCount };
};

/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access private
 *  @err 1. 잘못된 폼 데이터
 *       2. 존재하지 않는 유저
 */
const patchImgService = async (userId: string, img: string) => {
  if (!img) {
    return constant.NULL_VALUE;
  }

  if (img === undefined) {
    return constant.WRONG_IMG_FORM;
  }

  const user = await User.findById(new mongoose.Types.ObjectId(userId)).where(
    keysToSnake({ isDeleted: false })
  );

  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  await user.updateOne({ img });

  return { img };
};

const userService = {
  getMyInfoService,
  patchImgService,
};

export default userService;

// sequelize
import Sequelize, { Op } from "sequelize";

import constant from "../library/constant";

// model
import { User, Review } from "../models";

/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err 1. 존재하지 않는 유저
 */
const getMyInfoService = async (userId: number) => {
  const user = await User.findOne({
    where: { id: userId, isDeleted: false } 
  });

  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  const img = user.img;
  const nickname = user.nickname;
  const email = user.email;
  const reviewCount = await Review.count({
    where: {userId, isDeleted: false}
  });

  return { img, nickname, email, reviewCount };
};

/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access public
 *  @err 1. 잘못된 폼 데이터
 *       2. 존재하지 않는 유저
 */
const patchImgService = async (userId: number, img: string) => {
  if (!img) {
    return constant.NULL_VALUE;
  } else if (img === undefined) { 
    return constant.WRONG_IMG_FORM;
  }

  const user = await User.findOne({ where: {id: userId, isDeleted: false}});
  
  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  await user.update({img: img});
  await user.save();

  return {img: user.img};
};

const userService = {
  getMyInfoService,
  patchImgService,
};

export default userService;

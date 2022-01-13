// sequelize
import Sequelize, { Op } from "sequelize";

// library
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcryptjs';
import constant from "../library/constant";
// import index from "../config";

// model
import { User, Review } from "../models";

/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err
 */
const getMyInfoService = async (userId: number) => {
  // TODO: - user isDeleted 상태 확인
  const user = await User.findOne({ where: { id: userId } });
  const img = user.img;
  const nickname = user.nickname;
  const email = user.email;
  const review = await Review.findAll({
    where: {
      user_id: userId,
      is_deleted: false,
    },
  });
  const reviewCount = review.length;
  return { img, nickname, email, reviewCount };
};

/**
 *  @프로필이미지 수정
 *  @route PATCH /user/img
 *  @access public
 *  @err 잘못된 폼데이터
 */
const patchImgService = async (userId: number, img: string) => {
  // 폼데이터 맞는지 체크 -> 아니면 return statusCode.WRONG_IMG_FORM
  if (!img) {
    return constant.WRONG_IMG_FORM;
  }
  console.log(img);
  // TODO: - user isDeleted 상태 확인
  // userId에 맞는 user의 img 업로드
  await User.update(
    {
      img: img,
    },
    {
      where: { id: userId },
    }
  );
};

const userService = {
  getMyInfoService,
  patchImgService,
};

export default userService;

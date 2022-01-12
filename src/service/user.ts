// sequelize
import Sequelize, { Op } from 'sequelize';

// library
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcryptjs';
// import constant from "../library/constant";
// import index from "../config";

// model
import { User, Review } from "../models";

/**
 *  @유저정보조회
 *  @route GET /user/myInfo
 *  @access public
 *  @err
 */
const getMyInfoService = async ( userId: number ) => {
  // TODO: - user isDeleted 상태 확인
  const user = await User.findOne({ where: { id: userId } });
  const nickname = user.nickname;
  const email = user.email;
  const review = await Review.findAll({
    where: {
      user_id: userId,
      is_deleted: false,
    },
  });
  const reviewCount = review.length;
  return { nickname, email, reviewCount };
};

const userService = {
  getMyInfoService,
};

export default userService;


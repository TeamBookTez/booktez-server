// models
import { User } from "../models";

// sequelize
import sequelize, { Op, Sequelize } from "sequelize";

// library
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import constant from "../library/constant";
import isEmail from "validator/lib/isEmail";

/**
 *  @회원가입
 *  @route POST /auth/signup
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 *       2. 이메일 형식이 올바르지 않을 때
 *       3. 닉네임 형식이 올바르지 않을 때
 *       4. 패스워드 형식이 올바르지 않을 때
 *       5. 이메일이 이미 존재할 때
 *       6. 닉네임이 이미 존재할 때
 */
const postSignupService = async ({ email, nickname, password }) => {
  // 필요한 값이 존재하지 않는 경우
  if (!email || !nickname || !password) {
    return constant.NULL_VALUE;
  }

  // email 형식이 잘못되었을 때
  if (!isEmail(email)) {
    return constant.WRONG_EMAIL_CONVENTION;
  }

  // nickname 형식이 잘못되었을 때
  if (
    /\W/.test(nickname) ||
    /_/.test(nickname) ||
    nickname.length < 2 ||
    nickname.length > 8
  ) {
    return constant.WRONG_NICKNAME_CONVENTION;
  }

  // password 형식이 잘못되었을 때
  if (
    !/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,64}$/.test(password) ||
    /\s/.test(password)
  ) {
    return constant.WRONG_PASSWORD_CONVENTION;
  }

  // email이 이미 존재할 때
  const emailExist = await User.findAll({
    where: {
      email,
    },
  });
  if (emailExist.length > 0) {
    return constant.EMAIL_ALREADY_EXIST;
  }

  // nickname이 이미 존재할 때
  const nicknameExist = await User.findAll({
    where: {
      nickname,
    },
  });

  if (nicknameExist.length > 0) {
    return constant.NICKNAME_ALREADY_EXIST;
  }

  // 새로운 유저 생성 & 토큰 발급
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    password: hashedPassword,
    nickname,
  });

  const payload = {
    user: {
      // id: user.id,
      id: 32,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  return token;
};

const authService = {
  postSignupService,
};

export default authService;

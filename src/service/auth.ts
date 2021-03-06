import config from "../config";
import mongoose from "mongoose";

// library
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import constant from "../library/constant";
import {
  checkNicknameValid,
  checkPasswordValid,
} from "../library/checkValidation";
import { keysToSnake, keysToCamel } from "../library/convertSnakeToCamel";

// model
import User from "../models/User";

/**
 *  @이메일_유효성_검사
 *  @route GET /auth/email?email=
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 */
const getEmailService = async (email?: string) => {
  // 잘못된 요청값이 들어왔을 때 (query !== email)
  if (email === undefined) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // 필요한 값이 존재하지 않는 경우
  if (!email) {
    return constant.NULL_VALUE;
  }

  // email 형식이 잘못되었을 때
  if (!isEmail(email)) {
    return constant.WRONG_EMAIL_CONVENTION;
  }

  // email이 이미 존재할 때
  // TODO: DB에서 isDeleted string으로 되있는 것 변경
  const emailExist = await User.exists({ email });
  if (emailExist) {
    return constant.EMAIL_ALREADY_EXIST;
  }

  return constant.SUCCESS;
};

/**
 *  @닉네임_유효성_검사
 *  @route GET /auth/nickname?nickname=
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 */
const getNicknameService = async (nickname?: string) => {
  // 잘못된 요청값이 들어왔을 때 (query !== nickname)
  if (nickname === undefined) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // 필요한 값이 존재하지 않는 경우
  if (!nickname) {
    return constant.NULL_VALUE;
  }

  // nickname 형식이 잘못되었을 때
  if (!checkNicknameValid(nickname)) {
    return constant.WRONG_NICKNAME_CONVENTION;
  }

  // nickname이 이미 존재할 때
  const nicknameExist = await User.find({ nickname });

  if (nicknameExist.length > 0) {
    return constant.NICKNAME_ALREADY_EXIST;
  }

  return constant.SUCCESS;
};

/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 *       2. 존재하지 않는 이메일입니다.
 *       3. 비밀번호가 일치하지 않습니다.
 */
const postLoginService = async (email: string, password: string) => {
  // 요청 바디 부족
  if (!email || !password) {
    return constant.NULL_VALUE;
  }

  // 존재하지 않는 이메일
  const user = await User.findOne(
    keysToSnake({
      email,
      isDeleted: false,
    })
  );
  if (!user) {
    return constant.EMAIL_NOT_FOUND;
  }

  // 비밀번호 일치 X
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return constant.PW_NOT_CORRECT;
  }

  // 성공 시
  // 토큰 만들기
  const payload = {
    user: {
      id: user.id,
    },
  };
  const nickname = user.nickname;
  const userEmail = user.email;
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "14d" });
  return { email: userEmail, nickname, token };
};

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
const postSignupService = async (
  email: string,
  nickname: string,
  password: string
) => {
  // 필요한 값이 존재하지 않는 경우
  if (!email || !nickname || !password) {
    return constant.NULL_VALUE;
  }

  // email 형식이 잘못되었을 때
  if (!isEmail(email)) {
    return constant.WRONG_EMAIL_CONVENTION;
  }

  // nickname 형식이 잘못되었을 때
  if (!checkNicknameValid(nickname)) {
    return constant.WRONG_NICKNAME_CONVENTION;
  }

  // password 형식이 잘못되었을 때
  if (!checkPasswordValid(password)) {
    return constant.WRONG_PASSWORD_CONVENTION;
  }

  // email이 이미 존재할 때
  const emailExist = await User.exists({ email });
  if (emailExist) {
    return constant.EMAIL_ALREADY_EXIST;
  }

  // nickname이 이미 존재할 때
  const nicknameExist = await User.exists({ nickname });
  if (nicknameExist) {
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
      id: user.id,
    },
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: "14d",
  });
  return token;
};

/**
 *  @로그인_여부_검사
 *  @route GET /auth/check
 *  @access public
 *  @err
 */
const getLoginFlagService = async (isLogin: Boolean) => {
  return { isLogin };
};

/**
 *  @회원탈퇴
 *  @route Patch /auth/withdraw
 *  @access private
 *  @err
 */
const patchWithdrawService = async (userId: string) => {
  const user = await User.findById(new mongoose.Types.ObjectId(userId));

  // snake to camel
  const originUser = keysToCamel(user);
  const camelUser = keysToCamel(originUser.Doc);

  if (camelUser.isDeleted) {
    return constant.NON_EXISTENT_USER;
  }

  // 삭제
  await user.updateOne({ $set: keysToSnake({ isDeleted: true }) });

  // 만료 날짜
  const date = new Date(Date.now() + 30 * 24 * 3600 * 1000);

  // 시간 아래는 0 으로 초기화
  const expiredAt = date.setUTCMinutes(0, 0, 0);
  await user.updateOne({ $set: keysToSnake({ expiredAt }) });
};

const authService = {
  getEmailService,
  getNicknameService,
  postLoginService,
  postSignupService,
  getLoginFlagService,
  patchWithdrawService,
};

export default authService;

import index from "../config";

// library
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import constant from "../library/constant";
import isEmail from "validator/lib/isEmail";

// models
import { User } from "../models";

/**
 *  @이메일 유효성 검사
 *  @route GET /auth/email
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 */
const getEmailService = async (email: string) => {
  // 필요한 값이 존재하지 않는 경우
  if (!email) {
    return constant.NULL_VALUE;
  }

  // email 형식이 잘못되었을 때
  if (!isEmail(email)) {
    return constant.WRONG_EMAIL_CONVENTION;
  }

  // email이 이미 존재할 때
  const emailExist = await User.findAll({
    where: {
      email,
      isDeleted: false,
    },
  });
  if (emailExist.length > 0) {
    return constant.EMAIL_ALREADY_EXIST;
  }

  return constant.SUCCESS;
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
  if (
    !/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(nickname) ||
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
      isDeleted: false,
    },
  });
  if (emailExist.length > 0) {
    return constant.EMAIL_ALREADY_EXIST;
  }

  // nickname이 이미 존재할 때
  const nicknameExist = await User.findAll({
    where: {
      nickname,
      isDeleted: false,
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
      id: user.id,
    },
  };

  const token = jwt.sign(payload, index.jwtSecret, {
    expiresIn: "14d",
  });
  return token;
};

/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 */

const postLoginService = async (email: string, password: string) => {
  // 요청 바디 부족
  if (!email || !password) {
    return constant.NULL_VALUE;
  }

  // 존재하지 않는 이메일
  const user = await User.findOne({ where: { email, isDeleted: false } });
  if (!user) {
    return -100;
  }

  // 비밀번호 일치 X
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return -101;
  }

  // 성공 시
  // 토큰 만들기
  const payload = {
    user: {
      id: user.id,
    },
  };
  const nickname = user.nickname;
  const token = jwt.sign(payload, index.jwtSecret, { expiresIn: "14d" });
  return { nickname, token };
};

/**
 *  @닉네임_유효성_검사
 *  @route get auth/nickname
 *  @access public
 *  @err 1. 필요한 값이 없습니다.
 */

const getNicknameService = async (nickname: string) => {
  // 필요한 값이 존재하지 않는 경우
  if (!nickname) {
    return constant.NULL_VALUE;
  }

  if (
    // nickname 형식이 잘못되었을 때
    !/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(nickname) ||
    nickname.length < 2 ||
    nickname.length > 8
  ) {
    return constant.WRONG_NICKNAME_CONVENTION;
  }

  // nickname이 이미 존재할 때
  const nicknameExist = await User.findAll({
    where: {
      nickname,
      isDeleted: false,
    },
  });

  if (nicknameExist.length > 0) {
    return constant.NICKNAME_ALREADY_EXIST;
  }
};

const authService = {
  getNicknameService,
  getEmailService,
  postSignupService,
  postLoginService,
};

export default authService;

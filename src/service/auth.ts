// sequelize
import sequelize, { Op } from "sequelize";
// library
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from '../models';
import index from '../config'

/**
 *  @로그인
 *  @route Post auth/login
 *  @access public
 */

const postLoginService = async ( email: string, password: string) => {
    // 요청 바디 부족
    if (!email || !password) {
        return -1;
    }

    // 존재하지 않는 이메일
    const user = await User.findOne({where: {email: email}});
    if(!user) {
        return -2;
    }

    // 비밀번호 일치 X
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return -3;
    }

    // 성공 시
    // 토큰 만들기
    const payload = {
        user: {
            id: user.id
        }
    }
    const nickname = user.nickname
    const token = jwt.sign(payload, index.jwtSecret, { expiresIn: '14d'});
    return { nickname, token};
};

const authService = {
    postLoginService,
};

export default authService;
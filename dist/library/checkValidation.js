"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordValid = exports.checkNicknameValid = void 0;
const checkNicknameValid = (nickname) => {
    if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(nickname)) {
        return false;
    }
    if (nickname.length < 2) {
        return false;
    }
    if (nickname.length > 10) {
        return false;
    }
    return true;
};
exports.checkNicknameValid = checkNicknameValid;
const checkPasswordValid = (password) => {
    if (!/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,64}$/.test(password)) {
        return false;
    }
    if (/\s/.test(password)) {
        return false;
    }
    return true;
};
exports.checkPasswordValid = checkPasswordValid;
//# sourceMappingURL=checkValidation.js.map
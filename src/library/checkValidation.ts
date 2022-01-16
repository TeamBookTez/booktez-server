export const checkNicknameValid = (nickname: string): boolean => {
  if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/.test(nickname)) {
    return false;
  }

  if (nickname.length < 2) {
    return false;
  }

  if (nickname.length > 8) {
    return false;
  }

  return true;
};

export const checkPasswordValid = (password: string): boolean => {
  if (!/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,64}$/.test(password)) {
    return false;
  }

  if (/\s/.test(password)) {
    return false;
  }

  return true;
};

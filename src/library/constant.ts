export default {
  SUCCESS: 1, // 성공
  NULL_VALUE: -1, // 필요한 값이 없을 때
  WRONG_EMAIL_CONVENTION: -2, // 이메일 형식이 잘못 되었을 때
  WRONG_NICKNAME_CONVENTION: -3, // 닉네임 형식이 잘못 되었을 때
  WRONG_PASSWORD_CONVENTION: -4, // 비밀번호 형식이 잘못 되었을 때
  EMAIL_ALREADY_EXIST: -5, // 이미 존재하는 이메일 일 때
  NICKNAME_ALREADY_EXIST: -6, // 이미 존재하는 닉네임 일 때
  WRONG_IMG_FORM: -7, // 잘못된 이미지 폼일 때
  WRONG_REQUEST_VALUE: -8, // 잘못된 요청값이 들어왔을 때
  VALUE_ALREADY_EXIST: -9, // 이미 존재하는 값일 때
  VALUE_ALREADY_DELETED: -10, // 이미 삭제된 값일 때
};

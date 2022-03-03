// import assert from "assert";

// // library
// import {
//   checkNicknameValid,
//   checkPasswordValid,
// } from "../../library/checkValidation";

// describe("checkValidation test", () => {
//   describe("checkNicknameValid test", () => {
//     it("fail: length is less than 2", () => {
//       assert.ok(!checkNicknameValid("룡"));
//     });
//     it("fail: length is longer than 10", () => {
//       assert.ok(!checkNicknameValid("12345678901"));
//     });
//     it("fail: include space", () => {
//       assert.ok(!checkNicknameValid("do ng"));
//     });
//     it("fail: include special character", () => {
//       assert.ok(!checkNicknameValid("닉#네임"));
//     });
//     it("success: 2-8 letters, no special character", () => {
//       assert.ok(checkNicknameValid("닉네임"));
//     });
//   });

//   describe("checkPasswordValid test", () => {
//     it("fail: length is less than 8", () => {
//       assert.ok(!checkPasswordValid("q!1"));
//     });
//     it("fail: length is longer than 64", () => {
//       assert.ok(
//         !checkPasswordValid(
//           "!@#$%^&*()qwertyuiop1234567890!@#$%^&*()qwertyuiop123456789012345"
//         )
//       );
//     });
//     it("fail: include space", () => {
//       assert.ok(!checkPasswordValid("!234 qwer"));
//     });
//     it("fail: not include special character", () => {
//       assert.ok(!checkPasswordValid("1234qwer"));
//     });
//     it("fail: not include english character", () => {
//       assert.ok(!checkPasswordValid("1234!@#$"));
//     });
//     it("fail: not include number character", () => {
//       assert.ok(!checkPasswordValid("qwer!@#$"));
//     });
//     it("success: 8-64 letters, include english, number, special character", () => {
//       assert.ok(checkPasswordValid("!234qwer"));
//     });
//   });
// });

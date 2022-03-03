// import assert from "assert";
// // library
// import constant from "../../library/constant";
// // model
// import User from "../../models/User";
// // service
// import userService from "../../service/user";
// describe("userService test", async () => {
//   let user;
//   const email: string = "mocha@test.com";
//   const nickname: string = "mocha";
//   const password: string = "mocha123!!";
//   before("create user", async () => {
//     user = await User.create({
//       email,
//       nickname,
//       password,
//     });
//   });
//   // 어쩌구.destroy
//   after("delete user", async () => {
//     await User.destroy({ where: { id: user.id } });
//   });
//   describe("getMyInfo test", () => {
//     it("success: getMyInfo returns user Info correctly", async () => {
//       const createdUser: any = await User.findOne({ where: { id: user.id } });
//       const testedUser: any = await userService.getMyInfoService(user.id);
//       assert.ok(createdUser.img === testedUser.img);
//       assert.ok(createdUser.nickname === testedUser.nickname);
//       assert.ok(createdUser.email === testedUser.email);
//       assert.ok(testedUser.reviewCount === 0);
//     });
//     it("fail: getMyInfo returns NULL_VALUE when userId is null", async () => {
//       assert.strictEqual(
//         await userService.getMyInfoService(null),
//         constant.NON_EXISTENT_USER
//       );
//     });
//   });
//   describe("patchImg test", () => {
//     it("success: pathImgService changes user profile image correctly ", async () => {
//       const newImg =
//         "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/user_profile/1642154795489.jpeg";
//       await userService.patchImgService(user.id, newImg);
//       const updatedUser: any = await User.findOne({
//         where: { id: user.id },
//       });
//       assert.strictEqual(updatedUser.img, newImg);
//     });
//     it("fail: patchImgService returns NULL_VALUE", async () => {
//       const createdUser: any = await User.findOne({ where: { id: user.id } });
//       assert.strictEqual(
//         await userService.patchImgService(createdUser.id, null),
//         constant.NULL_VALUE
//       );
//     });
//     it("fail: patchImgService returns NON_EXISTENT_USER", async () => {
//       const newImg: string =
//         "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/user_profile/1642154795489.jpeg";
//       assert.strictEqual(
//         await userService.patchImgService(null, newImg),
//         constant.NON_EXISTENT_USER
//       );
//     });
//   });
// });
//# sourceMappingURL=user.spec.js.map
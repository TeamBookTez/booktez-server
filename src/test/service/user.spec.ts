import assert from "assert";
import userService from "../../service/user";
import constant from "../../library/constant";
import User from "../../models/User";

describe("userService test", async() => {
  let user;
  const email = "mocha@test.com";
  const nickname = "mocha";
  const password = "mocha123!!";

  before("create user", async () => {
    user = await User.create({
      email,
      nickname,
      password,
    });
  });

  after("delete user", async () => {
    await User.destroy({ where: { id: user.id } });
  });

  const createdUser: any = await User.findOne({ where: { id: user.id } });

  describe("getMyInfo test", () => {

    it("success: getMyInfo returns user Info correctly", async () => {
      const testedUser: any = await userService.getMyInfoService(user.id);
      assert.ok(createdUser.img === testedUser.img);
      assert.ok(createdUser.nickname === testedUser.nickname);
      assert.ok(createdUser.email === testedUser.email);
      assert.ok(testedUser.reviewCount === 0);
    });

    it("fail: getMyInfo returns NULL_VALUE when userId is null", async () => {
      assert.strictEqual(
        await userService.getMyInfoService(null),
        constant.NON_EXISTENT_USER
      );
    });

  });

  // describe("patchImg test", () => {
  //   let originImg
  //   before("save original img", async () => {
  //     originImg = createdUser.img
  //   });
  //   after("put origin img", async () => {
  //     await User.update()
  //   });
  //   it("", () => {});
  // });
});

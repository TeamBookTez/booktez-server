import assert from "assert";
import userService from "../../service/user";
import User from "../../models/User";
import { getAssociationsByRelation } from "sequelize-typescript";

describe("userService test", () => {
  let user;
  const email = "mocha@test.com";
  const nickname = "mocha";
  const password = "mocha123!!";

  before("create user", async() =>{
    user = await User.create({
      email,
      nickname,
      password
    });
  });

  after("delete user", async() => {
    await User.destroy({where: {id: user.id}});
  });

  describe("getMyInfo test", () => {
    it("getMyInfo returns user Info correctly", async() => {
      const createdUser: any = await User.findOne({where: {id: user.id}});
      const testedUser: any = await userService.getMyInfoService(user.id);
      assert.ok(createdUser.img === testedUser.img);
      assert.ok(createdUser.nickname === testedUser.nickname);
      assert.ok(createdUser.email === testedUser.email);
      assert.ok(testedUser.reviewCount === 0);

      const test = await userService.getMyInfoService(null);
    });
  });

  describe("patchImg test", () => {
    before("save original img", async() => {

    });
    after("put origin img", async() => {

    });
    it("", () => {});
  });
});
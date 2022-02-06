"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
// library
const constant_1 = __importDefault(require("../../library/constant"));
// model
const User_1 = __importDefault(require("../../models/User"));
// service
const user_1 = __importDefault(require("../../service/user"));
describe("userService test", () => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const email = "mocha@test.com";
    const nickname = "mocha";
    const password = "mocha123!!";
    before("create user", () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield User_1.default.create({
            email,
            nickname,
            password,
        });
    }));
    // 어쩌구.destroy
    after("delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.destroy({ where: { id: user.id } });
    }));
    describe("getMyInfo test", () => {
        it("success: getMyInfo returns user Info correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield User_1.default.findOne({ where: { id: user.id } });
            const testedUser = yield user_1.default.getMyInfoService(user.id);
            assert_1.default.ok(createdUser.img === testedUser.img);
            assert_1.default.ok(createdUser.nickname === testedUser.nickname);
            assert_1.default.ok(createdUser.email === testedUser.email);
            assert_1.default.ok(testedUser.reviewCount === 0);
        }));
        it("fail: getMyInfo returns NULL_VALUE when userId is null", () => __awaiter(void 0, void 0, void 0, function* () {
            assert_1.default.strictEqual(yield user_1.default.getMyInfoService(null), constant_1.default.NON_EXISTENT_USER);
        }));
    });
    describe("patchImg test", () => {
        it("success: pathImgService changes user profile image correctly ", () => __awaiter(void 0, void 0, void 0, function* () {
            const newImg = "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/user_profile/1642154795489.jpeg";
            yield user_1.default.patchImgService(user.id, newImg);
            const updatedUser = yield User_1.default.findOne({
                where: { id: user.id },
            });
            assert_1.default.strictEqual(updatedUser.img, newImg);
        }));
        it("fail: patchImgService returns NULL_VALUE", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield User_1.default.findOne({ where: { id: user.id } });
            assert_1.default.strictEqual(yield user_1.default.patchImgService(createdUser.id, null), constant_1.default.NULL_VALUE);
        }));
        it("fail: patchImgService returns NON_EXISTENT_USER", () => __awaiter(void 0, void 0, void 0, function* () {
            const newImg = "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/user_profile/1642154795489.jpeg";
            assert_1.default.strictEqual(yield user_1.default.patchImgService(null, newImg), constant_1.default.NON_EXISTENT_USER);
        }));
    });
}));
//# sourceMappingURL=user.spec.js.map
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
exports.userScan = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
// models
const Review_1 = __importDefault(require("../models/Review"));
const User_1 = __importDefault(require("../models/User"));
// library
const convertSnakeToCamel_1 = require("../library/convertSnakeToCamel");
exports.userScan = node_schedule_1.default.scheduleJob("0 0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    // 현재 시간
    const current = new Date(new Date(Date.now()).setUTCMinutes(0, 0, 0));
    console.log("Scanning users...[" + current + "]");
    // 삭제 예정 유저
    const deletedUsers = yield User_1.default.find((0, convertSnakeToCamel_1.keysToSnake)({ isDeleted: true }));
    yield Promise.all(deletedUsers.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        // 현재 날짜가 만료 날짜 이후
        if (current.getTime() >= user.expired_at.getTime()) {
            // 해당 유저가 가진 리뷰 모두 삭제
            const { deletedCount } = yield Review_1.default.deleteMany((0, convertSnakeToCamel_1.keysToSnake)({ userId: user._id }));
            // 해당 유저 삭제
            yield user.deleteOne((0, convertSnakeToCamel_1.keysToSnake)({ _id: user._id }));
            console.log("Delete Count: " + deletedCount);
        }
    })));
    console.log("Complete scanning...");
}));
//# sourceMappingURL=userScheduler.js.map
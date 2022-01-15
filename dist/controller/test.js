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
// slack
const slack_1 = __importDefault(require("../others/slack/slack"));
// libraries
const response_1 = __importDefault(require("../library/response"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
// services
const test_1 = __importDefault(require("../service/test"));
/**
 *  @테스트
 *  @route get test/
 *  @access public
 *  @err
 */
const getTestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resData = yield test_1.default.getTestService();
        // throw new Error();
        // 테스트 실패
        if (resData === -1) {
            response_1.default.basicResponse(res, returnCode_1.default.NOT_FOUND, false, "테스트 실패");
        }
        else {
            // 테스트 성공
            response_1.default.dataResponse(res, returnCode_1.default.OK, true, "테스트 성공", resData);
        }
    }
    catch (err) {
        slack_1.default.slackWebhook(req, err.message);
        console.error(err.message);
        response_1.default.basicResponse(res, returnCode_1.default.INTERNAL_SERVER_ERROR, false, "서버 오류");
    }
});
const testController = {
    getTestController,
};
exports.default = testController;
//# sourceMappingURL=test.js.map
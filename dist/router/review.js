"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = __importDefault(require("../controller/review"));
// middleware
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// 독후감 조회
router.get("/:reviewId", auth_1.default, review_1.default.getReviewController);
// 질문리스트 조회
router.get("/:reviewId/question-list", auth_1.default, review_1.default.getQuestionController);
// 독서 전
router.post("/before/:isbn", auth_1.default, review_1.default.postReviewBeforeController);
// 독서 중
router.patch("/now/:reviewId", auth_1.default, review_1.default.postReviewNowController);
// 독서 후 수정
router.patch("/:reviewId", auth_1.default, review_1.default.patchReviewController);
// 독서 후 수정
router.delete("/:reviewId", auth_1.default, review_1.default.deleteReviewController);
module.exports = router;
//# sourceMappingURL=review.js.map
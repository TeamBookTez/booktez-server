"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = __importDefault(require("../controller/review"));
// middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// 독서 전
router.patch("/before/:reviewId", authMiddleware_1.auth, review_1.default.patchReviewBeforeController);
// 질문리스트 조회
router.get("/:reviewId/question-list", authMiddleware_1.auth, review_1.default.getQuestionController);
// 독서 중
router.patch("/now/:reviewId", authMiddleware_1.auth, review_1.default.patchReviewNowController);
// 독후감 조회
router.get("/:reviewId", authMiddleware_1.auth, review_1.default.getReviewController);
// 독서 후 수정
router.patch("/:reviewId", authMiddleware_1.auth, review_1.default.patchReviewController);
// 독서 후 삭제
router.delete("/:reviewId", authMiddleware_1.auth, review_1.default.deleteReviewController);
module.exports = router;
//# sourceMappingURL=review.js.map
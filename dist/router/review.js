"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
// controller
const review_1 = __importDefault(require("../controller/review"));
const router = express_1.default.Router();
// 독서 전
router.patch("/:reviewId/pre", authMiddleware_1.auth, review_1.default.patchReviewPreController);
// 질문리스트 조회
router.get("/:reviewId/question-list", authMiddleware_1.auth, review_1.default.getQuestionController);
// 독서 중
router.patch("/:reviewId/peri", authMiddleware_1.auth, review_1.default.patchReviewPeriController);
// 독후감 조회
router.get("/:reviewId", authMiddleware_1.auth, review_1.default.getReviewController);
// 독후감 전단계 조회
router.get("/:reviewId/pre", authMiddleware_1.auth, review_1.default.getReviewPreController);
// 독후감 중단계 조회
router.get("/:reviewId/peri", authMiddleware_1.auth, review_1.default.getReviewPeriController);
// 독서 후 수정
router.patch("/:reviewId", authMiddleware_1.auth, review_1.default.patchReviewController);
// 독서 후 삭제
router.delete("/:reviewId", authMiddleware_1.auth, review_1.default.deleteReviewController);
module.exports = router;
//# sourceMappingURL=review.js.map
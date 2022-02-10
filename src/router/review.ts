import express from "express";

// middleware
import { auth } from "../middleware/authMiddleware";

// controller
import reviewController from "../controller/review";

const router = express.Router();

// 독서 전
router.patch("/:reviewId/pre", auth, reviewController.patchReviewPreController);

// 질문리스트 조회
router.get(
  "/:reviewId/question-list",
  auth,
  reviewController.getQuestionController
);

// 독서 중
router.patch(
  "/:reviewId/peri",
  auth,
  reviewController.patchReviewPeriController
);

// 독후감 조회
router.get("/:reviewId", auth, reviewController.getReviewController);

// 독서 후 수정
router.patch("/:reviewId", auth, reviewController.patchReviewController);

// 독서 후 삭제
router.delete("/:reviewId", auth, reviewController.deleteReviewController);

module.exports = router;

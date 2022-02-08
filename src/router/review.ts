import express from "express";

// middleware
import { auth } from "../middleware/authMiddleware";

// controller
import reviewController from "../controller/review";

const router = express.Router();

// 독서 전
router.patch(
  "/before/:reviewId",
  auth,
  reviewController.patchReviewBeforeController
);

// 질문리스트 조회
router.get(
  "/:reviewId/question-list",
  auth,
  reviewController.getQuestionController
);

// 독서 중
router.patch("/now/:reviewId", auth, reviewController.patchReviewNowController);

// 독후감 조회
router.get("/:reviewId", auth, reviewController.getReviewController);

// 독후감 전단계 조회
router.get("/:reviewId/pre", auth, reviewController.getPreReviewController);

// 독후감 중단계 조회
router.get("/:reviewId/peri", auth, reviewController.getPeriReviewController);

// 독서 후 수정
router.patch("/:reviewId", auth, reviewController.patchReviewController);

// 독서 후 삭제
router.delete("/:reviewId", auth, reviewController.deleteReviewController);

module.exports = router;

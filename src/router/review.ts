import express from "express";
import reviewController from "../controller/review";

// middleware
import { auth } from "../middleware/authMiddleware";

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

// 독서 후 수정
router.patch("/:reviewId", auth, reviewController.patchReviewController);

// 독서 후 삭제
router.delete("/:reviewId", auth, reviewController.deleteReviewController);

module.exports = router;

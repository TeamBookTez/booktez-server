import express from "express";
import reviewController from "../controller/review";

// middleware
import authMiddleware from "../middleware/auth";

const router = express.Router();

// 독서 전
router.post(
  "/before/:isbn",
  authMiddleware,
  reviewController.postReviewBeforeController
);

// 독서 후 수정
router.patch(
  "/:reviewId",
  authMiddleware,
  reviewController.patchReviewController
);

module.exports = router;

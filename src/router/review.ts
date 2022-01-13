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

module.exports = router;

import express from "express";
const router = express.Router();

// Middleware
import isLoginMiddleware from "../middleware/isLogin";
import authMiddleware from "../middleware/auth";

// Controller
import bookController from "../controller/book";

router.get("/", authMiddleware, bookController.getBookController);
router.post("/", isLoginMiddleware, bookController.postBookController);

module.exports = router;

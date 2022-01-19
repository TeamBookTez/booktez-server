import express from "express";

// Middleware
import { auth, isLogin } from "../middleware/authMiddleware";

// Controller
import bookController from "../controller/book";

const router = express.Router();

router.post("/", isLogin, bookController.postBookController);
router.get("/", auth, bookController.getBookController);

module.exports = router;

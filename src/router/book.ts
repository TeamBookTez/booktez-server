import express from "express";
const router = express.Router();

// Middleware
import { auth, isLogin } from "../middleware/authMiddleware";

// Controller
import bookController from "../controller/book";

router.post("/", isLogin, bookController.postBookController);
router.get("/", auth, bookController.getBookController);

module.exports = router;

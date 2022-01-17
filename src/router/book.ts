import express from "express";
const router = express.Router();

// Middleware
import { auth, isLogin } from "../middleware/authMiddleware";

// Controller
import bookController from "../controller/book";

router.get("/", auth, bookController.getBookController);
router.post("/", isLogin, bookController.postBookController);

module.exports = router;

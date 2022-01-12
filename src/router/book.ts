import express from "express";
const router = express.Router();

// Middleware
import authMiddleware from "../middleware/auth";

// Controller
import bookController from "../controller/book";

router.get("/", authMiddleware, bookController.getBookController);

module.exports = router;

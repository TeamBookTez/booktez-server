import express from "express";
import userController from "../controller/user";

// middleware
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/myInfo", authMiddleware, userController.getMyInfoController);

module.exports = router;

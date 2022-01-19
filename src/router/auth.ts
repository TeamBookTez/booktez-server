import express from "express";
const router = express.Router();

// Middleware
import { isLogin } from "../middleware/authMiddleware";
c
// Controller
import authController from "../controller/auth";

router.get("/email", authController.getEmailController);
router.get("/nickname", authController.getNicknameController);
router.post("/login", authController.postLoginController);
router.post("/signup", authController.postSignupController);
router.get("/check", isLogin, authController.getLoginFlagController);

module.exports = router;

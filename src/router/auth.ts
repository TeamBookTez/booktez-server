import express from "express";

// Middleware
import { auth, isLogin } from "../middleware/authMiddleware";

// Controller
import authController from "../controller/auth";

const router = express.Router();

router.get("/email", authController.getEmailController);
router.get("/nickname", authController.getNicknameController);
router.post("/login", authController.postLoginController);
router.post("/signup", authController.postSignupController);
router.get("/check", isLogin, authController.getLoginFlagController);
router.patch("/withdraw", auth, authController.patchWithdrawController);

module.exports = router;

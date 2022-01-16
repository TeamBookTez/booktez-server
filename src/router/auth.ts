import express from "express";
const router = express.Router();

// Controller
import authController from "../controller/auth";

router.post("/login", authController.postLoginController);
router.post("/signup", authController.postSignupController);
router.get("/email", authController.getEmailController);
router.get("/nickname", authController.getNicknameController);

module.exports = router;

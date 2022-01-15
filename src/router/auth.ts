import express from "express";
const router = express.Router();

// Controller
import authController from "../controller/auth";

router.get("/email", authController.getEmailController);
router.post("/login", authController.postLoginController);
router.post("/signup", authController.postSignupController);

module.exports = router;

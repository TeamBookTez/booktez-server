import express from "express";
const router = express.Router();

// Controller
import authController from "../controller/auth";

router.post("/login", authController.postLoginController);
router.post("/signup", authController.postSignupController);

module.exports = router;

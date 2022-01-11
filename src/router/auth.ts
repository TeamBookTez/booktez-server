import express from "express";
import authController from "../controller/auth";

const router = express.Router();

router.post("/signup", authController.postSignupController);

module.exports = router;

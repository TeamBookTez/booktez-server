import express from "express";
import authController from "../controller/auth";
const router = express.Router();

router.post("/login", authController.postLoginController);
module.exports = router;

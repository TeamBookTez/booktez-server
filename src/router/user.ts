import express from "express";
import userController from "../controller/user";

// middleware
import upload from "../middleware/upload";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.patch(
  "/img",
  upload.single("img"),
  authMiddleware,
  userController.patchImgController
);
router.get("/myInfo", authMiddleware, userController.getMyInfoController);

module.exports = router;

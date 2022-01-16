import express from "express";
import userController from "../controller/user";

// middleware
import upload from "../middleware/upload";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/myInfo", authMiddleware, userController.getMyInfoController);
router.patch(
  "/img",
  upload.single("img"),
  authMiddleware,
  userController.patchImgController
);

module.exports = router;

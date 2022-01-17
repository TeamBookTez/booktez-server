import express from "express";
import userController from "../controller/user";

// middleware
import upload from "../middleware/upload";
import { auth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/myInfo", auth, userController.getMyInfoController);
router.patch(
  "/img",
  auth,
  upload.single("img"),
  userController.patchImgController
);

module.exports = router;

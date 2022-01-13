import express from "express";
import userController from "../controller/user";

// middleware
const multer = require("multer");
// const upload = require("../middleware/upload");
const upload = multer({
  dest: "uploads/",
});
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

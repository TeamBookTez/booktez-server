import express from "express";
import userController from "../controller/user";

// middleware
const multer = require("multer");
const upload = require("../middleware/upload");
// const upload = multer({
//   dest: "uploads/",
// });
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.patch(
  "/img",
  authMiddleware,
  upload.single("img"),
  userController.patchImgController
);
router.get("/myInfo", authMiddleware, userController.getMyInfoController);


module.exports = router;

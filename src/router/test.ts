import express from "express";
import testController from "../controller/test";

const router = express.Router();

router.get("/", testController.getTestController);

module.exports = router;

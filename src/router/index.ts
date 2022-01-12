import express, { Request, Response } from "express";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";

const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  try {
    response.basicResponse(res, returnCode.OK, true, "BookTez api");
  } catch (err) {
    response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
});

router.use("/test", require("./test"));
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

export default router;

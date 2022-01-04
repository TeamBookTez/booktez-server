import { Request, Response } from "express";

// libraries
import response from "../library/response";
import returnCode from "../library/returnCode";

// services
import testService from "../service/test";

/**
 *  @테스트
 *  @route get test/
 *  @access public
 *  @err
 */

const getTestController = async (req: Request, res: Response) => {
  try {
    const resData = await testService.getTestService();

    // 테스트 실패
    if (resData === -1) {
      response.basicResponse(res, returnCode.NOT_FOUND, "테스트 실패");
    } else {
      // 테스트 성공
      response.dataResponse(res, returnCode.OK, "테스트 성공", resData);
    }
  } catch (err) {
    console.error(err.message);
    response.basicResponse(res, returnCode.INTERNAL_SERVER_ERROR, "서버 오류");
  }
};
const testController = {
  getTestController,
};

export default testController;

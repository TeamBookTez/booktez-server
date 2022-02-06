import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// 슬랙 Webhook에서 발급받은 endpoint를 .env 파일에서 끌어옴
// endpoint 자체는 깃허브에 올라가면 안 되기 때문!
const DEV_WEB_HOOK_ERROR_MONITORING = process.env.DEV_WEB_HOOK_ERROR_MONITORING;

const sendMessageToSlack = (
  message: string,
  apiEndPoint = DEV_WEB_HOOK_ERROR_MONITORING
) => {
  // 슬랙 Webhook을 이용해 슬랙에 메시지를 보내는 코드
  try {
    axios
      .post(apiEndPoint, { text: message })
      .then((response) => {})
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.error(e);
    // 슬랙 Webhook 자체에서 에러가 났을 경우,
    // 콘솔에 에러를 찍는 코드
  }
};

const slackAPI = {
  sendMessageToSlack,
  DEV_WEB_HOOK_ERROR_MONITORING,
};

export default slackAPI;

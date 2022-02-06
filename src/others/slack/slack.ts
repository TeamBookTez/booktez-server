import { error } from "console";
import slackAPI from "./slackAPI";

const slackWebhook = (req, message: string) => {
  const slackMessage = `[ERROR] [${req.method.toUpperCase()}] ${
    req.originalUrl
  } ${message} 
    ${JSON.stringify(error)}`;
  slackAPI.sendMessageToSlack(
    slackMessage,
    slackAPI.DEV_WEB_HOOK_ERROR_MONITORING
  );
};

const slack = {
  slackWebhook,
};

export default slack;

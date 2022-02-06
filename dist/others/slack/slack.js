"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const slackAPI_1 = __importDefault(require("./slackAPI"));
const slackWebhook = (req, message) => {
    const slackMessage = `[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl} ${message} 
    ${JSON.stringify(console_1.error)}`;
    slackAPI_1.default.sendMessageToSlack(slackMessage, slackAPI_1.default.DEV_WEB_HOOK_ERROR_MONITORING);
};
const slack = {
    slackWebhook,
};
exports.default = slack;
//# sourceMappingURL=slack.js.map
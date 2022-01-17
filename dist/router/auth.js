"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controller
const auth_1 = __importDefault(require("../controller/auth"));
router.get("/email", auth_1.default.getEmailController);
router.get("/nickname", auth_1.default.getNicknameController);
router.post("/login", auth_1.default.postLoginController);
router.post("/signup", auth_1.default.postSignupController);
module.exports = router;
//# sourceMappingURL=auth.js.map
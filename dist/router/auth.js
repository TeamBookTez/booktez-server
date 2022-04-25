"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
// Controller
const auth_1 = __importDefault(require("../controller/auth"));
const router = express_1.default.Router();
router.get("/email", auth_1.default.getEmailController);
router.get("/nickname", auth_1.default.getNicknameController);
router.post("/login", auth_1.default.postLoginController);
router.post("/signup", auth_1.default.postSignupController);
router.get("/check", authMiddleware_1.isLogin, auth_1.default.getLoginFlagController);
router.patch("/withdraw", authMiddleware_1.auth, auth_1.default.patchWithdrawController);
module.exports = router;
//# sourceMappingURL=auth.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// middleware
const upload_1 = __importDefault(require("../middleware/upload"));
const authMiddleware_1 = require("../middleware/authMiddleware");
// controller
const user_1 = __importDefault(require("../controller/user"));
const router = express_1.default.Router();
router.get("/myInfo", authMiddleware_1.auth, user_1.default.getMyInfoController);
router.patch("/img", authMiddleware_1.auth, upload_1.default.single("img"), user_1.default.patchImgController);
module.exports = router;
//# sourceMappingURL=user.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
// middleware
const upload_1 = __importDefault(require("../middleware/upload"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.patch("/img", upload_1.default.single("img"), auth_1.default, user_1.default.patchImgController);
router.get("/myInfo", auth_1.default, user_1.default.getMyInfoController);
module.exports = router;
//# sourceMappingURL=user.js.map
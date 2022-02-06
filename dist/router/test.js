"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = __importDefault(require("../controller/test"));
const router = express_1.default.Router();
router.get("/", test_1.default.getTestController);
module.exports = router;
//# sourceMappingURL=test.js.map
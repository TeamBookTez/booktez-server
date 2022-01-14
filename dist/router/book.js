"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Middleware
const isLogin_1 = __importDefault(require("../middleware/isLogin"));
const auth_1 = __importDefault(require("../middleware/auth"));
// Controller
const book_1 = __importDefault(require("../controller/book"));
router.get("/", auth_1.default, book_1.default.getBookController);
router.post("/", isLogin_1.default, book_1.default.postBookController);
module.exports = router;
//# sourceMappingURL=book.js.map
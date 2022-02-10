"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middleware
const authMiddleware_1 = require("../middleware/authMiddleware");
// Controller
const book_1 = __importDefault(require("../controller/book"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.isLogin, book_1.default.postBookController);
router.get("/", authMiddleware_1.auth, book_1.default.getBookController);
router.get("/pre", authMiddleware_1.auth, book_1.default.getBookPreController);
router.get("/peri", authMiddleware_1.auth, book_1.default.getBookPeriController);
router.get("/post", authMiddleware_1.auth, book_1.default.getBookPostController);
module.exports = router;
//# sourceMappingURL=book.js.map
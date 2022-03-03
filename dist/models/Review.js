"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ReviewSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    book_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    },
    question_list: {
        type: [String],
        required: false,
        default: [""],
    },
    answer_one: {
        type: String,
        required: false,
        default: "",
    },
    answer_two: {
        type: String,
        required: false,
        default: "",
    },
    answer_three: {
        type: Object,
        required: false,
        default: {
            type: "",
            content: "",
            children: [{ type: "", content: "", children: [] }],
        },
    },
    // 리뷰 상태
    review_st: {
        type: Number,
        required: true,
        default: 2,
    },
    // 리뷰 종료 상태
    finish_st: {
        type: Boolean,
        required: true,
        default: false,
    },
    // 생성 일자
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // 수정 일자
    updated_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});
exports.default = mongoose_1.default.model("review", ReviewSchema);
//# sourceMappingURL=Review.js.map
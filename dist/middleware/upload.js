"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const index_1 = __importDefault(require("../config/index"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: index_1.default.awsS3AccessKey,
    secretAccessKey: index_1.default.awsS3SecretAccessKey,
});
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: index_1.default.awsBucket + "/user_profile",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: function (req, file, cb) {
            cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
        },
    }),
});
exports.default = upload;
//# sourceMappingURL=upload.js.map
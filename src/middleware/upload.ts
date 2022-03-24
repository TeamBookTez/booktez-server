import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config";

const s3 = new aws.S3({
  accessKeyId: config.aws.s3AccessKey,
  secretAccessKey: config.aws.s3SecretAccessKey,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.aws.bucket + "/user_profile",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
  }),
});

export default upload;

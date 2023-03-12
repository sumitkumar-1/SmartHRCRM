const AWS = require("aws-sdk");
require("dotenv").config();
const fs = require("fs");

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
});

const s3 = new AWS.S3();

function uploadFile(request) {
  const fileContent = fs.readFileSync(request.file.path);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: request.file.originalname,
    Body: fileContent
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.Location);
      }
    });
  });
}

module.exports = {
    uploadFile
}
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
const sns = new AWS.SNS();

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

function publishNotification(message) {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.SNS_TOPIC_ARN
  };
  
  sns.publish(params, function(err, data) {
    if (err) {
      console.log('Error publishing message:', err);
    } else {
      console.log('Message published:', data);
    }
  });
}

module.exports = {
    uploadFile,
    publishNotification
}
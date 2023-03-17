const dynamoose = require("dynamoose");
const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
  region: process.env.region
});

dynamoose.aws.sdk = AWS;

const interviewSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  userid: { type: String, index: true },
  companyname: { type: String, required: true },
  companylogo: { type: String, required: true },
  jobdescription: { type: String, required: true },
  scheduledate: { type: String, required: true },
  status: { type: String, required: true },
  venue: { type: String, required: true },
  mode: { type: String, required: true },
  starttime: { type: String, required: true },
  duration: { type: String, required: true },
  panel: { type: String, required: true },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now }
});

module.exports = dynamoose.model("Interview", interviewSchema);

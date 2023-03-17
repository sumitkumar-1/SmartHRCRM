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

const shortlistedProfileSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  userid: { type: String, index: true },
  demandid: { type: String, index: true },
  companyname: { type: String, index: true },
  jobdescription: { type: String, index: true },
  scheduledate: { type: String, index: true },
  status: { type: String, index: true },
  venue: { type: String, index: true },
  mode: { type: String, index: true },
  duration: { type: String, index: true },
  panel: { type: String, index: true },
  operator: { type: String, index: true },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now }
});

module.exports = dynamoose.model("ShortListedProfile", shortlistedProfileSchema);

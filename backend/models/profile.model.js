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

const profileSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  userid: { type: String, index: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  alternatecontact: { type: String, required: true },
  whatsappcontact: { type: String, required: true },
  linkedinprofile: { type: String, required: true },
  skills: { type: String, required: true },
  totalexp: { type: String, required: true },
  relevantexp: { type: String, required: true },
  currentorganization: { type: String, required: true },
  noticeperiod: { type: String, required: true },
  currentlocation: { type: String, required: true },
  prefferedlocation: { type: String, required: true },
  ctc: { type: String, required: true },
  ectc: { type: String, required: true },
  gender: { type: String, required: true },
  status: { type: String, required: true },
  cvurl: { type: String, required: true },
  profileurl: { type: String, required: true },
  designation: { type: String, required: true },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now }
});

module.exports = dynamoose.model("Profile", profileSchema);

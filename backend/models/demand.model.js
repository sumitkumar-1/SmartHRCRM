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

const demandSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  vendorid: { type: String, required: true },
  description: { type: String, required: true },
  vacancy: { type: String, required: true },
  level: { type: String, required: true },
  qualification: { type: String, required: true },
  contact: { type: String, required: true },
  position: { type: String, required: true },
  skills: { type: String, required: true },
  yearofexpfrom: { type: String, required: true },
  yearofexpto: { type: String, required: true },
  worklocation: { type: String, required: true },
  workmode: { type: String, required: true },
  maxnoticeperiod: { type: String, required: true },
  minnoticeperiod: { type: String, required: true },
  minsalary: { type: String, required: true },
  maxsalary: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now }
});

module.exports = dynamoose.model("Demand", demandSchema);

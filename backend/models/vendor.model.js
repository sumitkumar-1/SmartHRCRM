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

const vendorSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  primarycontact: { type: String, required: true },
  status: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now }
});

module.exports = dynamoose.model("Vendor", vendorSchema);

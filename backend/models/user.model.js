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

const userSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, index: true },
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "manager", "employee", "vendor"], default: "user" },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dob: { type: String, required: true },
  sex: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  updatedat: { type: Date, default: Date.now },
  createdat: { type: Date, default: Date.now }
});

module.exports = dynamoose.model("User", userSchema);

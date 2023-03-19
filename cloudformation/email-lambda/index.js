const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event, context) => {
  const message = event.message;
  const email = event.email;

  const params = {
    Message: message,
    Subject: 'Email from Lambda',
    TopicArn: process.env.SNS_TOPIC_ARN,
    MessageAttributes: {
      email: {
        DataType: 'String',
        StringValue: email
      }
    }
  };

  try {
    const data = await sns.publish(params).promise();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify('Email sent successfully')
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to send email')
    };
  }
};

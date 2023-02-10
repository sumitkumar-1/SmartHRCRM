const DynamoDB = require("./DynamoDB.js");

const params = {
  TableName: "Movies",
  KeySchema: [{ AttributeName: "title", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "title", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

DynamoDB.createTable(params);

const itemParams = {
  TableName: "Movies",
  Item: {
    title: { S: "3 Idiots" },
    rtScore: { N: "100" },
  },
};

DynamoDB.inserItem(itemParams);

const getParams = {
  TableName: "Movies",
};

DynamoDB.getAllItems(getParams);

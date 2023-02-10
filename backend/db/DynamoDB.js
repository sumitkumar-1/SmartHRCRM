const AWS = require("aws-sdk");
require('dotenv').config();

console.log(`AWS Region ${process.env.region}`)
console.log(`DynamoDB EndPoint ${process.env.endpoint}`)

AWS.config.update({
  region: process.env.region,
  endpoint: process.env.endpoint,
});

const dynamodb = new AWS.DynamoDB();

function createTable(param) {
  dynamodb.createTable(param, function (err, data) {
    if (err) {
      console.error(
        "Unable to create table. JSON: ",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JOSN: ",
        JSON.stringify(data, null, 2)
      );
    }
  });
}

function inserItem(item) {
    dynamodb.putItem(item, function (err, data) {
    if (err) {
      console.error("Unable to add Item. JSON: ", JSON.stringify(err, null, 2));
    } else {
      console.log("Insert Item Succeeded: ", JSON.stringify(data, null, 2));
    }
  });
}

function updateItem(item) {
    dynamodb.putItem(item, function (err, data) {
    if (err) {
      console.error("Unable to update Item. JSON: ", JSON.stringify(err, null, 2));
    } else {
      console.log("Update Item Succeeded: ", JSON.stringify(data, null, 2));
    }
  });
}

function getItemById(params) {
  dynamodb.getItem(params, function (err, data) {
    if (err) {
      console.error("Unable to get item. JSON: ", JSON.stringify(err, null, 2));
    } else {
      console.log("get Item Succeeded. JOSN: ", JSON.stringify(data, null, 2));
    }
  });
}

function getAllItems(params, callback) {
    dynamodb.scan(params, function(err, data) {
        if(err) {
            console.error("Unable to find the item. JSON: ", JSON.stringify(err, null, 2));
        }else{
            console.log(`Found ${data.Count} movies`);
            return callback(data.Items);
        }
    })
}

function deleteItem(params) {
    dynamodb.deleteItem(params, function(err) {
        if(err) {
            console.error("Unable to find the item. JSON: ", JSON.stringify(err, null, 2));
        }else{
            console.log("Item Deleted");
        }
    })
}

module.exports = {
  createTable,
  inserItem,
  updateItem,
  getItemById,
  getAllItems,
  deleteItem
};

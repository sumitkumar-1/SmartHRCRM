const express = require("express");
const router = express.Router();
const DBClient = require("../db/DynamoDB.js");

const tableName = "Movies";

router.get("/", function (req, res) {
    console.log(`Request ${req}`)
    const getParams = {
        TableName: tableName,
    };
    DBClient.getAllItems(getParams, function(response) {
        console.log(response);
        res.send(response);
    });
});

router.get("/:id", function (req, res) {

});

router.post("/", function(req, res) {

});

router.put("/", function(req, res) {

});

router.delete("/", function(req, res) {

});

module.exports = router;
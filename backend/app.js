const express = require('express');
const app = express();
const user = require("./controllers/UserController.js");
require('dotenv').config();

app.use(express.static(process.cwd() + process.env.DIST_LOCATION))

app.get('/', (req, res) => {
    const fileName = process.cwd() + process.env.DIST_LOCATION + "index.html";
    console.log("Serving File " + fileName);
    res.sendFile(fileName);
})

app.use("/users", user);

app.listen(3000, function() {
    console.log("listening on 3000")
})
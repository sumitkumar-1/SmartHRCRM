const express = require("express");
const app = express();
var cors = require('cors');
require("dotenv").config();
const path = require('path');

app.use(express.json());
app.use(cors());

const userRouter = require('./routes/user.route');
const sessionRouter = require('./routes/session.route');
const demandRouter = require('./routes/demand.route');
const demandhandlerRouter = require('./routes/demandhandler.route');
const profileRouter = require('./routes/profile.route');
const shortlistedProfileRouter = require('./routes/shortlistedprofile.route');
const vendorRouter = require('./routes/vendor.route');

app.use('/api', sessionRouter);
app.use('/api/users', userRouter);
app.use('/api/demand', demandRouter);
app.use('/api/demandhandler', demandhandlerRouter);
app.use('/api/profile', profileRouter);
app.use('/api/shortlistedprofile', shortlistedProfileRouter);
app.use('/api/vendor', vendorRouter);

app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
  const fileName = process.cwd() + process.env.DIST_LOCATION + "index.html";
  console.log("Serving File " + fileName);
  res.sendFile(fileName);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

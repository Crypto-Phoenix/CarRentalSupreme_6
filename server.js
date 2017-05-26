const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const url = "mongodb://maegz:test123@ds137441.mlab.com:37441/car_rental_app";
const app = express();
//const PORT = 3000;

var moment = require('moment');
app.locals.moment = require('moment');

const Car = require("./models/Car.js");
const User = require("./models/User.js");
const routes = require("./routes/routes.js")(Car, User);

const db = mongoose.connection;

app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect(url);

db.on("error", (err) => { console.log(err); })
  .on("connected", () => { console.log("Connected!") });

app.use("/", routes);

//app.listen(PORT, () => { console.log("Listening on port: " + PORT); });
module.exports = app;
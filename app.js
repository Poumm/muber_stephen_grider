const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mumber", { useMongoClient: true });

//Doivent être définies dans cet ordre
app.use(bodyParser.json());
routes(app);

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express()
const port = process.env.PORT || 5000;

//Get the db URI
const { MongoURI } = require("./config/keys");

//Connect to MongoDB
mongoose.connect(MongoURI, { useNewUrlParser: true })
    .then(() => console.log("Connected to database 💾"))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/index", require("./routes/index"));
app.use("/api/users", require("./routes/users"));
app.use("/api/students", require("./routes/students"));

app.listen(port, () => console.log("🌎 server is up on " + port));
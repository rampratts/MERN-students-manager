require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express()
const port = process.env.PORT;

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to database 💾"))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/index", require("./routes/index"));
app.use("/api/users", require("./routes/users"));
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));

app.listen(port, () => console.log("🌎 server is up on " + port));

module.exports = { app };
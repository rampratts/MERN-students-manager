const express = require("express");
const bodyParser = require("body-parser");

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/index", require("./routes/index"));

app.listen(port, () => console.log("🌎 server is up on " + port));
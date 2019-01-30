const { MongoURI, MongoURI_Test } = require("./keys");
let env = process.env.NODE_ENV || "development";

if (env === "development") {
    process.env.PORT = 5000;
    process.env.MONGODB_URI = MongoURI;
} else if (env === "test") {
    process.env.port === 5000;
    process.env.MONGODB_URI = MongoURI_Test;
}

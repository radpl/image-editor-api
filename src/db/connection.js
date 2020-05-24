const mongoose = require("mongoose");

//connection
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "image-editor";

mongoose.connect(connectionURL + "/" + databaseName, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const config = require("../config/config");
const mongoose = require("mongoose");

//connection
const connectionURL = config.connectionURL;
const databaseName = config.databaseName;

mongoose.connect(connectionURL + "/" + databaseName, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

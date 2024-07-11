// Importing the Mongoose library, which is an ODM (Object Data Modeling) library for MongoDB and Node.js
const mongoose = require("mongoose");

// Importing the configuration settings from a file named 'config'
const config = require("./config");

// Retrieving the MongoDB connection URL from the configuration settings
const mongoUrl = config.MONGO_URL;
console.log(mongoUrl); // Logging the MongoDB connection URL to the console

// Connecting to the MongoDB database using the connection URL
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true, // Option to use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true, // Option to use the new topology engine to avoid deprecation warnings
  })
  .then(() => {
    // Callback function executed if the connection is successful
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Callback function executed if there is an error during the connection attempt
    console.error("Error connecting to MongoDB:", error);
  });

// Exporting the mongoose instance for use in other parts of the application
module.exports = mongoose;

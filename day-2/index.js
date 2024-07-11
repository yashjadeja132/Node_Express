// Importing the necessary modules and configuration settings
const express = require("express"); // Importing the Express library, a web application framework for Node.js
const config = require("./config/config"); // Importing the configuration settings from a file located in './config/config'
require("./config/db.config"); // Connecting to MongoDB by requiring the database configuration file './config/db.config'

// Creating an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and place the parsed data in req.body
app.use(express.json());

// Setting the port for the server to listen on, using the port from the configuration file or defaulting to 4000
const port = config.PORT || 4000;

// Starting the server and having it listen on the specified port
app.listen(port, () => {
  // Logging a message to the console indicating that the server is running and on which port
  console.log(`Server running on port ${port}`);
});

// Importing the necessary modules and configuration settings
const express = require("express"); // Importing the Express library, a web application framework for Node.js
const morgan = require("morgan"); // Importing Morgan, a HTTP request logger middleware for Node.js
const config = require("./config/config"); // Importing the configuration settings from a file located in './config/config'
require("./config/db.config"); // Connecting to MongoDB by requiring the database configuration file './config/db.config'

// Importing the router for handling API routes
const apiRouter = require("./route"); // Assuming your router file is in './route'

// Creating an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and place the parsed data in req.body
app.use(express.json());

// Middleware to log HTTP requests and errors using Morgan with the 'dev' format
app.use(morgan("dev"));

// Mounting the router for paths starting with '/api'
app.use("/api", apiRouter);

// Setting the port for the server to listen on, using the port from the configuration file or defaulting to 4000
const port = config.PORT || 4000;

// Starting the server and having it listen on the specified port
app.listen(port, () => {
  // Logging a message to the console indicating that the server is running and on which port
  console.log(`Server running on port ${port}`);
});

// Import the express function from the express module (web application framework)
var express = require("express");

// Create an instance of an Express application
var app = express();

// Middleware function
// The express.json() middleware is provided by Express to parse incoming requests with JSON payloads
// It parses incoming requests with JSON payloads and is based on body-parser.
// This middleware is crucial for handling POST, PUT, PATCH, or other types of requests where the client sends JSON data in the request body.
app.use(express.json());

// Define a GET request handler
// This route handles GET requests to the root URL "/"
// req is the request object containing information about the HTTP request
// res is the response object used to send back a response to the client
app.get("/", (req, res) => {
  // Send a response back to the client
  res.send("Hello, World!");
});

// Start the server on the defined port 4000
// The app.listen method is used to bind and listen for connections on a specified host and port
app.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});

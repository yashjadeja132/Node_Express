// Importing the dotenv library, which loads environment variables from a .env file into process.env
const dotenv = require("dotenv");

// Determining the current environment (development or production)
// Defaults to 'development' if NODE_ENV is not set
const nodeEnv = process.env.NODE_ENV || "development";

// Function to configure environment variables based on the current environment
function config() {
  // If the environment is 'development', load variables from '.env.dev'
  if (nodeEnv === "development") {
    dotenv.config({ path: ".env.dev" });
  } else {
    // Otherwise, load variables from the default '.env' file
    dotenv.config({ path: ".env" });
  }

  // Return an object containing the MongoDB URL and the port from the environment variables
  return {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
  };
}

// Logging the current environment to the console
console.log(`Environment: ${nodeEnv}`);

// Exporting the configuration object for use in other parts of the application
module.exports = config();

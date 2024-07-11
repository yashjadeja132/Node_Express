const express = require("express"); // Importing the Express framework
const AdminModel = require("./users/admin/model"); // Importing AdminModel from './users/admin/model'
const ClientModel = require("./users/client/model"); // Importing ClientModel from './users/client/model'
const router = express.Router(); // Creating an Express router instance

const models = {
  admin: AdminModel,
  client: ClientModel,
};

// POST endpoint to create a new user
router.post("/:model", async (req, res, next) => {
  try {
    const { model } = req.params; // Extracting the model type from URL parameters
    const data = req.body; // Extracting data from request body
    await models[model].create(data); // Creating a new user using models[model]
    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "User Created Successfully",
    }); // Sending success response
  } catch (error) {
    // Handling errors
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET endpoint to fetch all active users
router.get("/:model", async (req, res, next) => {
  try {
    const { model } = req.params; // Extracting the model type from URL parameters
    const data = await models[model].find({ is_deleted: false }); // Fetching active users only
    res.status(200).json({
      statusCode: 200,
      success: true,
      data,
      message: "Active User Data fetched successfully",
    }); // Sending user data as JSON response
  } catch (error) {
    // Handling errors
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// PUT endpoint to update a user
router.put("/:model", async (req, res, next) => {
  try {
    const { model } = req.params; // Extracting the model type from URL parameters
    const { userId } = req.query; // Extracting userId from query parameters
    const data = req.body; // Extracting updated data from request body
    await models[model].findByIdAndUpdate(userId, data); // Updating user using models[model]
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User Updated Successfully",
    }); // Sending success response
  } catch (error) {
    // Handling errors
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// DELETE endpoint to soft delete a user
router.delete("/:model", async (req, res, next) => {
  try {
    const { model } = req.params; // Extracting the model type from URL parameters
    const { userId } = req.query; // Extracting userId from query parameters
    const user = await models[model].findByIdAndUpdate(
      userId,
      { is_deleted: true },
      { new: true }
    ); // Soft delete user
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }
    res.status(204).send(); // Sending no content status as success response
  } catch (error) {
    // Handling errors
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET endpoint to fetch all soft deleted users
router.get("/:model/deleted", async (req, res, next) => {
  try {
    const { model } = req.params; // Extracting the model type from URL parameters
    const data = await models[model].find({ is_deleted: true }); // Fetching soft deleted users
    res.status(200).json({
      statusCode: 200,
      success: true,
      data,
      message: "Soft Deleted User Data fetched successfully",
    }); // Sending user data as JSON response
  } catch (error) {
    // Handling errors
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router; // Exporting the router with defined endpoints

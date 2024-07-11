const express = require("express");
const UserModel = require("./model"); // Importing UserModel from './model'
const router = express.Router(); // Creating an Express router instance

// POST endpoint to create a new user
router.post("/", async (req, res, next) => {
  try {
    const data = req.body; // Extracting data from request body
    await UserModel.create(data); // Creating a new user using UserModel
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
router.get("/", async (req, res, next) => {
  try {
    const data = await UserModel.find({ is_deleted: false }); // Fetching active users only
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
router.put("/", async (req, res, next) => {
  try {
    const { userId } = req.query; // Extracting userId from query parameters
    const data = req.body; // Extracting updated data from request body
    await UserModel.findByIdAndUpdate(userId, data); // Updating user using UserModel
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
router.delete("/", async (req, res, next) => {
  try {
    const { userId } = req.query; // Extracting userId from query parameters
    const user = await UserModel.findByIdAndUpdate(
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
router.get("/deleted", async (req, res, next) => {
  try {
    const data = await UserModel.find({ is_deleted: true }); // Fetching soft deleted users
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

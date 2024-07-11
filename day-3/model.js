// Import Mongoose library
const mongoose = require("mongoose");

// Define a Mongoose schema for the 'users' collection
const userSchema = new mongoose.Schema(
  {
    // Define 'user_id' field as a required Number, unique, and use Mongoose's default feature
    user_id: {
      type: Number,
      unique: true,
      default: () => Math.floor(100000 + Math.random() * 900000),
    },

    // Define 'name' field as a required String
    name: { type: String, required: true },

    // Define 'email' field as a required String and unique
    email: { type: String, required: true, unique: true },

    // Define 'mobile_number' field as a required String and unique
    mobile_number: { type: String, required: true, unique: true },

    // Define 'is_deleted' field to track soft deletion
    is_deleted: { type: Boolean, default: false },
  },
  // Additional schema options: enable timestamps and disable versioning
  { timestamps: true, versionKey: false }
);

// Create a Mongoose model named 'UserModel' for 'users' collection using 'userSchema'
const UserModel = mongoose.model("users", userSchema);

// Export the UserModel to be used in other parts of the application
module.exports = UserModel;

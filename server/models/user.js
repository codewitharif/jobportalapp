// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: "String",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    resume: {
      type: String,
      required: false, // optional if user hasn't uploaded yet
    },

    image: {
      type: String,
      required: false, // optional profile image
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);

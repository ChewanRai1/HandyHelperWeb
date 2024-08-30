const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  otpReset: {
    type: Number,
    default: null,
  },
  otpResetExpires: {
    type: Date,
    default: null,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services", // Must match the model name in productModel.js
    },
  ],
  cartItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
    },
  ],
});
const users = mongoose.model("users", userSchema);
module.exports = users;

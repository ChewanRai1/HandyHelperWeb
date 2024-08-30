const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services", // Matches the model name in serviceModel.js
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Matches the model name in userModel.js
      required: true,
    },
    serviceImage: {
      type: mongoose.Schema.Types.String,
      ref: "services",
      // required: true
    },
    servicePrice: {
      type: mongoose.Schema.Types.Number,
      ref: "services",
      // required: true
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;

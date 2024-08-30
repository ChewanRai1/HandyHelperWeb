const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
      maxlength: 300,
    },
    serviceImage: {
      type: String,
      required: true,
    },
    serviceLocation: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      required: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const services = mongoose.model("services", serviceSchema);
module.exports = services;

const mongoose = require("mongoose");

// Define schema for nut and washer details
const detailSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Define schema for nutData
const nutDataSchema = new mongoose.Schema({
  nutDetails: [detailSchema],
});

// Define schema for washerData
const washerDataSchema = new mongoose.Schema({
  washerDetails: [detailSchema],
});

// Define schema for bolt details
const boltDetailSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Define schema for boltData
const boltDataSchema = new mongoose.Schema({
  component_name: { type: String, required: true },
  boltDetails: [boltDetailSchema],
});

// Define schema for the entire structure
const mainSchema = new mongoose.Schema({
  nutData: [nutDataSchema],
  washerData: [washerDataSchema],
  boltData: [boltDataSchema],
});

// Export the model
module.exports = mongoose.model("MainData", mainSchema);

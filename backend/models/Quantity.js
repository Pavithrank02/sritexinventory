const mongoose = require("mongoose");

const QuantitySchema = new mongoose.Schema({
  component: { type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Quantity", QuantitySchema);

const mongoose = require("mongoose");

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Component", ComponentSchema);

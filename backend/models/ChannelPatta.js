const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  channelType: { type: String, required: true },
  channelSize: { type: String, required: true },
  noOfChannels: { type: Number, required: true },
  channelWeight: { type: Number, required: true },
  angleType: { type: String, required: true },
  angleSize: { type: String, required: true },
  angleWeight: { type: Number, required: true },
});

const channelPattaSchema = new mongoose.Schema({
  items: [itemSchema],
  datePurchased: { type: Date, required: true },
  dateDelivered: { type: Date, required: true },
});

module.exports = mongoose.model("ChannelPatta", channelPattaSchema);

const mongoose = require("mongoose");

const channelPattaSchema = new mongoose.Schema({
  channelType: { type: String, required: true },
  channelSize: { type: String, required: true },
  noOfChannels: { type: Number, required: true },
  channelweight: { type: Number, required: true },
  angleType: { type: String, required: true },
  angleSize: { type: String, required: true },
  angleweight: { type: Number, required: true },
  datePurchased: { type: Date, required: true },
  dateDelivered: { type: Date, required: true },
});

module.exports = mongoose.model("ChannelPatta", channelPattaSchema);

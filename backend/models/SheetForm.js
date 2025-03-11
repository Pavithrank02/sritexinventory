const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  sheetType: { type: String, required: true },
  sheetSize: { type: String, required: true },
  noOfSheets: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const SheetFormSchema = new mongoose.Schema({
  items: [ItemSchema],
  datePurchased: { type: Date, required: true },
  dateDelivered: { type: Date, required: true },
  drawingSentDate: { type: Date },
  sheetReturnedDate: { type: Date },
  balanceSheet: { type: String },
});

module.exports = mongoose.model("SheetForm", SheetFormSchema);

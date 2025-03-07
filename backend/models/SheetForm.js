const mongoose = require("mongoose");

const SheetFormSchema = new mongoose.Schema({
  sheetType: { type: String, required: true },
  noOfSheets: { type: Number, required: true },
  weight: { type: Number, required: true },
  datePurchased: { type: Date, required: true },
  sheetSize: { type: String, required: true },
  dateDelivered: { type: Date, required: true },
  drawingSentDate: { type: Date, required: true },
  sheetReturnedDate: { type: Date, required: true },
  balanceSheet: { type: Date, required: true },
});

module.exports = mongoose.model("SheetForm", SheetFormSchema);

const express = require("express");
const mongoose = require("mongoose");
const sheetForm = require("../models/SheetForm.js");
const router = express.Router();

router.post("/sheetforms", async (req, res) => {
  try {
    const { _id, sheetType, sheetSize, noOfSheets, weight, ...FormData } = req.body;

    if (_id) {
      // If _id is provided, update the document
      if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedDocument = await sheetForm.findByIdAndUpdate(_id, { ...FormData, sheetType, sheetSize }, {
        new: true,
      });

      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      console.log("3");
      return res.status(200).json({ message: "Form updated successfully.", data: updatedDocument });
    } else {
      // Check if a document with the same `sheetType` and `sheetSize` exists
      const existingDocument = await sheetForm.findOne({ sheetType, sheetSize });

      if (existingDocument) {
        // Update the existing document by adding `noOfSheets` and `weight`
        existingDocument.noOfSheets += parseInt(noOfSheets, 10);
        existingDocument.weight += parseFloat(weight);
        Object.assign(existingDocument, FormData); // Update other fields
        await existingDocument.save();

        console.log("1");
        return res.status(200).json({
          message: "Form updated successfully.",
          data: existingDocument,
        });
      } else {
        // Create a new document
        const newForm = new sheetForm({ sheetType, sheetSize, noOfSheets, weight, ...FormData });
        const savedForm = await newForm.save();

        console.log("2");
        return res.status(200).json({ message: "Form submitted successfully.", data: savedForm });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving form data.", error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
      const data = await sheetForm.find();
      res.status(200).json({ success: true, data });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching data", error: error.message });
  }
});

module.exports = router;

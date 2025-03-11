const express = require("express");
const mongoose = require("mongoose");
const sheetForm = require("../models/SheetForm.js");
const router = express.Router();

// POST: Add or update a sheet form
router.post("/sheetforms", async (req, res) => {
  try {
    const { _id, items, ...FormData } = req.body;

    if (_id) {
      // Update an existing document by ID
      if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedDocument = await sheetForm.findByIdAndUpdate(
        _id,
        { items, ...FormData },
        { new: true }
      );

      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      return res
        .status(200)
        .json({ message: "Form updated successfully.", data: updatedDocument });
    } else {
      // Check if a document exists with matching `items` (e.g., `sheetType` and `sheetSize`)
      for (const item of items) {
        const { sheetType, sheetSize } = item;

        const existingDocument = await sheetForm.findOne({
          "items.sheetType": sheetType,
          "items.sheetSize": sheetSize,
        });

        if (existingDocument) {
          // Update the existing document's matching item
          const existingItem = existingDocument.items.find(
            (i) => i.sheetType === sheetType && i.sheetSize === sheetSize
          );

          if (existingItem) {
            existingItem.noOfSheets += parseInt(item.noOfSheets, 10);
            existingItem.weight += parseFloat(item.weight);
          }

          Object.assign(existingDocument, FormData); // Update other fields
          await existingDocument.save();

          return res.status(200).json({
            message: "Form updated successfully.",
            data: existingDocument,
          });
        }
      }

      // If no matching document or item exists, create a new document
      const newForm = new sheetForm({ items, ...FormData });
      const savedForm = await newForm.save();

      return res
        .status(200)
        .json({ message: "Form submitted successfully.", data: savedForm });
    }
  } catch (error) {
    console.error("Error saving form data:", error);
    res
      .status(500)
      .json({ message: "Error saving form data.", error: error.message });
  }
});

// GET: Retrieve all sheet forms
router.get("/", async (req, res) => {
  try {
    const data = await sheetForm.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching data", error: error.message });
  }
});

module.exports = router;

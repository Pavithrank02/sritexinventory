const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MainData = require("../models/MainSchema.js"); // Update the path as needed


// Create new MainData
router.post("/", async (req, res) => {
  try {
    const mainData = new MainData(req.body);
    const savedData = await mainData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all MainData entries
router.get("/", async (req, res) => {
  try {
    const data = await MainData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific MainData entry by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await MainData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific MainData entry by ID
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  
  const {
    component_name,
    boltsize,
    boltquantity,
    nutSize,
    nutQuantity,
    washerSize,
    washerQuantity,
  } = req.body;

  try {
    const document = await MainData.findById(_id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update boltData
    const boltIndex = document.boltData.findIndex(
      (data) => data.component_name === component_name
    );
    if (boltIndex !== -1) {
      // Update existing boltData
      document.boltData[boltIndex].boltDetails.push({
        size: boltsize,
        quantity: boltquantity,
      });
    } else {
      // Add new boltData
      document.boltData.push({
        component_name,
        boltDetails: [{ size: boltsize, quantity: boltquantity }],
      });
    }

    // Update nutData
    const nutIndex = document.nutData.findIndex((data) =>
      data.nutDetails.some((detail) => detail.size === nutSize)
    );
    if (nutIndex !== -1) {
      // Update existing nutDetails
      document.nutData[nutIndex].nutDetails.push({
        size: nutSize,
        quantity: nutQuantity,
      });
    } else {
      // Add new nutData
      document.nutData.push({
        nutDetails: [{ size: nutSize, quantity: nutQuantity }],
      });
    }

    // Update washerData
    const washerIndex = document.washerData.findIndex((data) =>
      data.washerDetails.some((detail) => detail.size === washerSize)
    );
    if (washerIndex !== -1) {
      // Update existing washerDetails
      document.washerData[washerIndex].washerDetails.push({
        size: washerSize,
        quantity: washerQuantity,
      });
    } else {
      // Add new washerData
      document.washerData.push({
        washerDetails: [{ size: washerSize, quantity: washerQuantity }],
      });
    }

    await document.save();
    res.json(document);
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Error updating document" });
  }
});





// Delete a specific MainData entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedData = await MainData.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

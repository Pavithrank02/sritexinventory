const express = require("express");
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
router.put("/:id", async (req, res) => {
  try {
    const updatedData = await MainData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

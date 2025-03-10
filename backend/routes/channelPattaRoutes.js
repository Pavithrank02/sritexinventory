const express = require("express");
const ChannelPatta = require("../models/ChannelPatta");
const router = express.Router();

// Add new channel/patta
router.post("/add", async (req, res) => {
  try {
    const newChannelPatta = new ChannelPatta(req.body);
    const savedChannelPatta = await newChannelPatta.save();
    res.status(201).json({ message: "Data saved successfully", data: savedChannelPatta });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: "Error saving data", error: error.message });
  }
});

// Get all channel/patta data
router.get("/", async (req, res) => {
  try {
    const channelPattas = await ChannelPatta.find();
    res.status(200).json({ message: "Data retrieved successfully", data: channelPattas });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

module.exports = router;

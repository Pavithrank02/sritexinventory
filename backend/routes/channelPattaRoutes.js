const express = require("express");
const ChannelPatta = require("../models/ChannelPatta");
const router = express.Router();

// Add new channel/patta
router.post("/add", async (req, res) => {
  try {
    const { items, datePurchased, dateDelivered } = req.body;

    // Validation: Ensure required fields are present
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required." });
    }

    if (!datePurchased || !dateDelivered) {
      return res
        .status(400)
        .json({ message: "Date Purchased and Date Delivered are required." });
    }

    // Create and save the new ChannelPatta document
    const newChannelPatta = new ChannelPatta({
      items,
      datePurchased,
      dateDelivered,
    });

    const savedChannelPatta = await newChannelPatta.save();
    res
      .status(201)
      .json({ message: "Data saved successfully", data: savedChannelPatta });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ message: "Error saving data", error: error.message });
  }
});

// Get all channel/patta data
router.get("/", async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    // Fetch channel/patta data with pagination
    const channelPattas = await ChannelPatta.find()
      .limit(Number(limit))
      .skip(Number(skip));

    res
      .status(200)
      .json({ message: "Data retrieved successfully", data: channelPattas });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

module.exports = router;

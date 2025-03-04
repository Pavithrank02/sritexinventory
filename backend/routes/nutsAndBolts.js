const express = require('express');
const NutsAndBolts = require('../models/NutsAndBolts');

const router = express.Router();

// Add a new item
router.post('/add', async (req, res) => {
    try {
        const {
            size,
            boltQuantityAvailable,
            boltRequiredForMachine,
            nutQuantityAvailable,
            nutQuantityRequiredForMachine,
            boltRequired,
            nutRequired,
            washerRequired
        } = req.body;

        // Create a new document
        const newItem = new NutsAndBolts({
            size,
            boltQuantityAvailable,
            boltRequiredForMachine,
            nutQuantityAvailable,
            nutQuantityRequiredForMachine,
            boltRequired,
            nutRequired,
            washerRequired,
        });

        // Save the document to the database
        const savedItem = await newItem.save();

        res.status(201).json({ message: 'Item added successfully', data: savedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
});

// Fetch all items
router.get('/', async (req, res) => {
    try {
        const items = await NutsAndBolts.find(); // Retrieve all documents
        res.status(200).json({ message: 'Items retrieved successfully', data: items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});
// Add or update stock
router.post('/update-stock', async (req, res) => {
  const { size, material, category, currentStock } = req.body;

  try {
      const updatedItem = await NutsAndBolts.findOneAndUpdate(
          { size, material, category },
          { currentStock },
          { new: true, upsert: true } // Upsert creates a new document if it doesn't exist
      );
      res.status(200).json({ message: 'Stock updated successfully', data: updatedItem });
  } catch (error) {
      res.status(500).json({ message: 'Error updating stock', error });
  }
});


module.exports = router;

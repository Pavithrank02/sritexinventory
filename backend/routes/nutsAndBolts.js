const express = require('express');
const NutsAndBolts = require('../models/NutsAndBolts');

const router = express.Router();

// Add a new item
router.post('/add', async (req, res) => {
    try {
        const {
            boltType,
            boltSize,
            boltQuantity,
            boltWeight,
            nutType,
            nutSize,
            nutQuantity,
            nutWeight,
            washerSize,
            washerQuantity,
            washerWeight,
            datePurchased,
            faultyNuts,
            faultyBolts,
        } = req.body;
        if (isNaN(faultyNuts) || isNaN(faultyBolts)) {
            return res.status(400).json({ message: 'Faulty Nuts and Bolts must be numbers.' });
          }
      

        // Create a new document
        const newItem = new NutsAndBolts({
            boltType,
            boltSize,
            boltQuantity,
            boltWeight,
            nutType,
            nutSize,
            nutQuantity,
            nutWeight,
            washerSize,
            washerQuantity,
            washerWeight,
            datePurchased,
            faultyNuts,
            faultyBolts,
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

// Update stock or add new stock entry
router.post('/update-stock', async (req, res) => {
    try {
        const { id, boltQuantity, nutQuantity, washerQuantity } = req.body;

        const updatedItem = await NutsAndBolts.findByIdAndUpdate(
            id, // Use the unique ID to identify the document
            { boltQuantity, nutQuantity, washerQuantity }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Stock updated successfully', data: updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating stock', error });
    }
});

module.exports = router;

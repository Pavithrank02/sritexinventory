const express = require('express');
const mongoose = require('mongoose');
const NutsAndBolts = require('../models/NutsAndBolts');

const router = express.Router();

// Add or Update item
router.put('/add-or-update', async (req, res) => {
    try {
        const { _id, ...data } = req.body; // Extract _id from the request body

        // Validate _id if provided
        if (_id && !mongoose.isValidObjectId(_id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        // If _id exists, update the document
        if (_id) {
            const updatedItem = await NutsAndBolts.findByIdAndUpdate(_id, data, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found.' });
            }
            return res.status(200).json({ message: 'Item updated successfully.', data: updatedItem });
        }

        // Otherwise, create a new document
        const newItem = new NutsAndBolts(data);
        const savedItem = await newItem.save();
        return res.status(201).json({ message: 'Item added successfully.', data: savedItem });
    } catch (error) {
        console.error('Error in add-or-update:', error);
        res.status(500).json({ message: 'Error adding or updating item.', error: error.message });
    }
});

// Fetch all items with pagination
router.get('/', async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;

        const items = await NutsAndBolts.find()
            .limit(Number(limit))
            .skip(Number(skip));
        res.status(200).json({ message: 'Items retrieved successfully.', data: items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Error fetching items.', error: error.message });
    }
});

module.exports = router;

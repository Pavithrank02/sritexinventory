const express = require('express');
const mongoose = require('mongoose');
const NutsAndBolts = require('../models/NutsAndBolts');

const router = express.Router();

// Add or Update items in NutsAndBolts
router.put('/add-or-update', async (req, res) => {
    try {
        const { _id, items, datePurchased } = req.body;

        // Validate _id if provided
        if (_id && !mongoose.isValidObjectId(_id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        // If _id exists, update the document
        if (_id) {
            const updatedDocument = await NutsAndBolts.findByIdAndUpdate(
                _id,
                { items, datePurchased },
                { new: true, runValidators: true } // `runValidators` ensures data is validated
            );
            if (!updatedDocument) {
                return res.status(404).json({ message: 'Document not found.' });
            }
            return res.status(200).json({ message: 'Document updated successfully.', data: updatedDocument });
        }

        // Otherwise, create a new document
        const newDocument = new NutsAndBolts({ items, datePurchased });
        const savedDocument = await newDocument.save();
        return res.status(201).json({ message: 'Document added successfully.', data: savedDocument });
    } catch (error) {
        console.error('Error in add-or-update:', error);
        res.status(500).json({ message: 'Error adding or updating document.', error: error.message });
    }
});

// Fetch all items with pagination
router.get('/', async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;

        const items = await NutsAndBolts.find()
            .limit(Number(limit))
            .skip(Number(skip));

        const totalCount = await NutsAndBolts.countDocuments();

        res.status(200).json({
            message: 'Documents retrieved successfully.',
            data: items,
            pagination: {
                total: totalCount,
                limit: Number(limit),
                skip: Number(skip),
            },
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Error fetching documents.', error: error.message });
    }
});

// Fetch a single document by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const document = await NutsAndBolts.findById(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        res.status(200).json({ message: 'Document retrieved successfully.', data: document });
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ message: 'Error fetching document.', error: error.message });
    }
});

// Delete a document by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const deletedDocument = await NutsAndBolts.findByIdAndDelete(id);
        if (!deletedDocument) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        res.status(200).json({ message: 'Document deleted successfully.', data: deletedDocument });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Error deleting document.', error: error.message });
    }
});

module.exports = router;

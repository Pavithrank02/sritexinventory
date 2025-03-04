const mongoose = require('mongoose');

const NutsAndBoltsSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true, // For example: "1x3/8"
        trim: true,
    },
    boltQuantityAvailable: {
        type: Number,
        required: true, // Number of bolts available in stock
        min: 0,
    },
    boltRequiredForMachine: {
        type: Number,
        required: false, // Number of bolts required for a machine
        min: 0,
    },
    nutQuantityAvailable: {
        type: Number,
        required: true, // Number of nuts available in stock
        min: 0,
    },
    nutQuantityRequiredForMachine: {
        type: Number,
        required: false, // Number of nuts required for a machine
        min: 0,
    },
    boltRequired: {
        type: Number,
        required: false, // Number of additional bolts needed
        min: 0,
    },
    nutRequired: {
        type: Number,
        required: false, // Number of additional nuts needed
        min: 0,
    },
    washerRequired: {
        type: Number,
        required: false, // Number of washers needed, optional
        default: 0,
    },
    washerQuantityAvailable: {
        type: Number,
        required: true,
        min: 0, // Stock cannot be negative
    },
    material: {
        type: String,
        required: true,
        enum: ['Steel', 'Stainless Steel', 'Brass', 'Aluminum'],
    },
    category: {
        type: String,
        required: true,
        enum: ['Nuts', 'Bolts', 'Washers', 'Screws'],
    },
}, { timestamps: true });

module.exports = mongoose.model('NutsAndBolts', NutsAndBoltsSchema);

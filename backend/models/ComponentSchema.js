// MongoDB Schema for Machine Components

const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
    component_name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Component', ComponentSchema);

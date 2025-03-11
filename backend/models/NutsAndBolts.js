const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  metalType: {
    type: String,
    enum: ['MS', 'SS', 'Aluminum', 'Other'],
    default: 'Other',
  },
  boltType: {
    type: String,
    required: true,
    enum: ['Sheet Type', 'MS', 'SS'],
  },
  boltSize: {
    type: String,
    required: true,
    enum: [
      '1x3/8',
      '3/4x3/8',
      '2x3/8',
      '1x5/16',
      '3/4x5/16',
      '1 1/2x5/16',
      '3/4x1/2',
      '11/2x1/2',
      '1/2x1/4',
      '3/4x1/4',
      '1x1/4',
      '12',
      '16',
    ],
  },
  boltQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  boltWeight: {
    type: Number,
    required: true,
    min: 0,
  },
  nutType: {
    type: String,
    required: true,
    enum: ['Sheet Type', 'MS', 'SS'],
  },
  nutSize: {
    type: String,
    required: true,
    enum: ['3/8', '5/16', '1/2', '1/4', '12', '16'],
  },
  nutQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  nutWeight: {
    type: Number,
    required: true,
    min: 0,
  },
  washerSize: {
    type: String,
    required: true,
    enum: ['3/8', '5/16', '1/2', '1/4', '12', '16'],
  },
  washerQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  washerWeight: {
    type: Number,
    required: true,
    min: 0,
  },
  faultyNuts: {
    type: Number,
    required: true,
    min: 0,
  },
  faultyBolts: {
    type: Number,
    required: true,
    min: 0,
  },
});

const NutsAndBoltsSchema = new mongoose.Schema(
  {
    items: {
      type: [ItemSchema], // Array of item objects
      validate: {
        validator: (items) => items.length > 0, // Ensure at least one item
        message: 'At least one item is required.',
      },
    },
    datePurchased: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NutsAndBolts', NutsAndBoltsSchema);

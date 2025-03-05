const mongoose = require('mongoose');
require('dotenv').config();
const NutsAndBolts = require('./models/NutsAndBolts'); // Adjust the path to your schema file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Data to add to the database
const data = [
    { size: '1x3/8', boltQuantityAvailable: 350, nutQuantityAvailable: 200, washerQuantityAvailable: 150, material: 'Steel', category: 'Bolts' },
    { size: '3/4x3/8', boltQuantityAvailable: 120, nutQuantityAvailable: 100, washerQuantityAvailable: 50, material: 'Steel', category: 'Bolts' },
    { size: '2x3/8', boltQuantityAvailable: 100, nutQuantityAvailable: 80, washerQuantityAvailable: 30, material: 'Steel', category: 'Bolts' },
    { size: '3/4x5/16', boltQuantityAvailable: 300, nutQuantityAvailable: 150, washerQuantityAvailable: 100, material: 'Steel', category: 'Bolts' },
    { size: '1x5/16', boltQuantityAvailable: 150, nutQuantityAvailable: 100, washerQuantityAvailable: 50, material: 'Steel', category: 'Bolts' },
    { size: '1 1/2x5/16', boltQuantityAvailable: 0, nutQuantityAvailable: 50, washerQuantityAvailable: 20, material: 'Steel', category: 'Bolts' },
    { size: '3/4x1/2', boltQuantityAvailable: 0, nutQuantityAvailable: 40, washerQuantityAvailable: 10, material: 'Steel', category: 'Bolts' },
    { size: '11/2x1/2', boltQuantityAvailable: 0, nutQuantityAvailable: 30, washerQuantityAvailable: 15, material: 'Steel', category: 'Bolts' },
    { size: '1/2 x 1/4', boltQuantityAvailable: 400, nutQuantityAvailable: 200, washerQuantityAvailable: 100, material: 'Steel', category: 'Bolts' },
    { size: '3/4x 1/4', boltQuantityAvailable: 80, nutQuantityAvailable: 50, washerQuantityAvailable: 30, material: 'Steel', category: 'Bolts' },
    { size: '1x1/4', boltQuantityAvailable: 100, nutQuantityAvailable: 70, washerQuantityAvailable: 20, material: 'Steel', category: 'Bolts' },
    { size: '1/4', boltQuantityAvailable: 0, nutQuantityAvailable: 100, washerQuantityAvailable: 0, material: 'Steel', category: 'Nuts' },
    { size: '3/8', boltQuantityAvailable: 0, nutQuantityAvailable: 337, washerQuantityAvailable: 0, material: 'Steel', category: 'Nuts' },
    { size: '5/16', boltQuantityAvailable: 0, nutQuantityAvailable: 100, washerQuantityAvailable: 0, material: 'Steel', category: 'Nuts' },
    { size: '3/8', boltQuantityAvailable: 0, washerQuantityAvailable: 200, nutQuantityAvailable: 0, material: 'Aluminum', category: 'Washers' },
    { size: '1/2', boltQuantityAvailable: 0, washerQuantityAvailable: 400, nutQuantityAvailable: 0, material: 'Stainless Steel', category: 'Washers' },
];



const addData = async () => {
    try {
        await NutsAndBolts.insertMany(data);
        console.log('Collections added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding collections:', error);
        mongoose.connection.close();
    }
};

addData();

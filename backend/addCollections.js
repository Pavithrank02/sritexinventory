const mongoose = require('mongoose');
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
    { size: '1x3/8', boltQuantityAvailable: 350, material: 'Steel', category: 'Bolts' },
    { size: '3/4x3/8', boltQuantityAvailable: 120, material: 'Steel', category: 'Bolts' },
    { size: '2x3/8', boltQuantityAvailable: 100, material: 'Steel', category: 'Bolts' },
    { size: '3/4x5/16', boltQuantityAvailable: 300, material: 'Steel', category: 'Bolts' },
    { size: '1x5/16', boltQuantityAvailable: 150, material: 'Steel', category: 'Bolts' },
    { size: '1 1/2x5/16', boltQuantityAvailable: 0, material: 'Steel', category: 'Bolts' },
    { size: '3/4x1/2', boltQuantityAvailable: 0, material: 'Steel', category: 'Bolts' },
    { size: '11/2x1/2', boltQuantityAvailable: 0, material: 'Steel', category: 'Bolts' },
    { size: '1/2 x 1/4', boltQuantityAvailable: 400, material: 'Steel', category: 'Bolts' },
    { size: '3/4x 1/4', boltQuantityAvailable: 80, material: 'Steel', category: 'Bolts' },
    { size: '1x1/4', boltQuantityAvailable: 100, material: 'Steel', category: 'Bolts' },
    { size: '1/4', nutQuantityAvailable: 0, material: 'Steel', category: 'Nuts' },
    { size: '3/8', nutQuantityAvailable: 337, material: 'Steel', category: 'Nuts' },
    { size: '5/16', nutQuantityAvailable: 100, material: 'Steel', category: 'Nuts' },
    { size: '3/8', boltQuantityAvailable: 200, material: 'Aluminum', category: 'Washers' },
    { size: '1/2', boltQuantityAvailable: 400, material: 'Stainless Steel', category: 'Screws' },
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

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const NutsAndBolts = require('./models/NutsAndBolts');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const nutsAndBoltsRoutes = require('./routes/nutsAndBolts.js');
app.use('/nuts-and-bolts', nutsAndBoltsRoutes);
const seedData = async () => {
    const items = [
        { size: '1x3/8', currentStock: 350, material: 'Steel', category: 'Bolts' },
        { size: '2x1/4', currentStock: 150, material: 'Brass', category: 'Nuts' },
        { size: '3/4x3/8', currentStock: 200, material: 'Aluminum', category: 'Washers' },
    ];

    try {
        await NutsAndBolts.insertMany(items);
        console.log('Data seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
};

seedData();
// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

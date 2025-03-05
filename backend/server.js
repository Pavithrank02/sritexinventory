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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

const nutsAndBoltsRoutes = require('./routes/nutsAndBolts.js');
app.use('/nuts-and-bolts', nutsAndBoltsRoutes);

// Database connection


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

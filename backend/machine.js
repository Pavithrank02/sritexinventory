const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Define the schema
const componentSchema = new mongoose.Schema({
    component_name: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
   
});

// Create the model
const Component = mongoose.model('Component', componentSchema);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Hardcoded data from Excel
const components = [
  { component_name: "Belt Conveyor", size: "3/4x5/16", quantity: 120 },
  { component_name: "Belt Conveyor", size: "1x5/16", quantity: 100 },
  { component_name: "Belt Conveyor", size: "3/4x 1/4", quantity: 60 },
  { component_name: "Reserve Box", size: "1x3/8", quantity: 24 },
  { component_name: "Reserve Box", size: "3/4x3/8", quantity: 30 },
  { component_name: "Trolly", size: "1x3/8", quantity: 88 },
  { component_name: "Trolly", size: "3/4x3/8", quantity: 24 },
  { component_name: "Trolly", size: "3/4x5/16", quantity: 16 },
  { component_name: "Trolly", size: "1x5/16", quantity: 28 },
  { component_name: "Trolly", size: "11/2x1/2", quantity: 8 },
  { component_name: "Trolly", size: "1/2 x 1/4", quantity: 50 },
  { component_name: "Track + Post", size: "1x3/8", quantity: 70 },
  { component_name: "Track + Post", size: "3/4x1/2", quantity: 35 },
  { component_name: "Blower - 25 Hp", size: "1x3/8", quantity: 20 },
  { component_name: "Blower - 5 Hp", size: "3/4x3/8", quantity: 12 },
  { component_name: "Blower - 5 Hp", size: "1x5/16", quantity: 16 },
  { component_name: "Blower - 5 Hp", size: "11/2x1/2", quantity: 32 },
  {
    component_name: "Kappas Structure + Platform",
    size: "1x3/8",
    quantity: 50,
  },
  {
    component_name: "Kappas Structure + Platform",
    size: "1 1/2x3/8",
    quantity: 25,
  },
  {
    component_name: "Kappas Structure + Platform",
    size: "11/2x1/2",
    quantity: 16,
  },
  { component_name: "Lint Structure", size: "1x3/8", quantity: 70 },
  { component_name: "Air Separator", size: "1x3/8", quantity: 32 },
  { component_name: "Air Separator", size: "3/4x3/8", quantity: 4 },
  { component_name: "Air Separator", size: "3/4x5/16", quantity: 36 },
  { component_name: "Air Separator", size: "1x5/16", quantity: 54 },
  { component_name: "Air Separator", size: "1/2x5/16", quantity: 54 },
  { component_name: "Air Separator", size: "11/2x1/2", quantity: 16 },
  { component_name: "Air Separator", size: "1/2 x 1/4", quantity: 20 },
  { component_name: "Air Separator", size: "3/4x 1/4", quantity: 30 },
  { component_name: "Air Separator", size: "1x1/4", quantity: 20 },
  { component_name: "Lint Air separator", size: "1x3/8", quantity: 32 },
  { component_name: "Lint Air separator", size: "3/4x3/8", quantity: 4 },
  { component_name: "Lint Air separator", size: "3/4x5/16", quantity: 36 },
  { component_name: "Lint Air separator", size: "1x5/16", quantity: 54 },
  { component_name: "Lint Air separator", size: "1/2x5/16", quantity: 54 },
  { component_name: "Lint Air separator", size: "11/2x1/2", quantity: 8 },
  { component_name: "Lint Air separator", size: "1/2 x 1/4", quantity: 20 },
  { component_name: "Lint Air separator", size: "3/4x 1/4", quantity: 30 },
  { component_name: "Lint Air separator", size: "1x1/4", quantity: 20 },
  { component_name: "lint Box", size: "1/2 x 1/4", quantity: 120 },
  { component_name: "Change Over", size: "1x3/8", quantity: 30 },
  { component_name: "Change Over", size: "1x5/16", quantity: 18 },
  { component_name: "Change Over", size: "1x1/4", quantity: 8 },
  { component_name: "Cyclone 2 nos", size: "1x1/4", quantity: 18 },
  { component_name: "Lint Bypass", size: "3/4x5/16", quantity: 60 },
  { component_name: "List Piston Box", size: "1/2 x 1/4", quantity: 200 },
  { component_name: "List Piston Box", size: "3/4x 1/4", quantity: 240 },
  { component_name: "Pipe line", size: "3/4x5/16", quantity: 200 },
  { component_name: "Pipe line", size: "1x1/4", quantity: 500 },
  { component_name: "Seed Box", size: "1x5/16", quantity: 20 },
  { component_name: "Total", size: "1x3/8", quantity: 450 },
  { component_name: "Total", size: "3/4x3/8", quantity: 74 },
  { component_name: "Total", size: "1 1/2x3/8", quantity: 25 },
  { component_name: "Total", size: "2x3/8", quantity: 35 },
  { component_name: "Total", size: "3/4x5/16", quantity: 480 },
  { component_name: "Total", size: "1x5/16", quantity: 300 },
  { component_name: "Total", size: "1/2x5/16", quantity: 110 },
  { component_name: "Total", size: "3/4x1/2", quantity: 35 },
  { component_name: "Total", size: "11/2x1/2", quantity: 60 },
  { component_name: "Total", size: "1/2 x 1/4", quantity: 410 },
  { component_name: "Total", size: "3/4x 1/4", quantity: 360 },
  { component_name: "Total", size: "1x1/4", quantity: 600 },
];

const addData = async () => {
    try {
        await Component.insertMany(components);
        console.log('Data added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding data:', error);
        mongoose.connection.close();
    }
};

addData();
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

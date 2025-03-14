const mongoose = require('mongoose');
require('dotenv').config();
const MainData = require("./models/MainSchema.js"); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Data to add to the database
const nutData = [
    {
      nutDetails: [
        { size: "5/16", quantity: 780 },
        { size: "3/8", quantity: 530 },
        { size: "1/4", quantity: 1350 },
        { size: "1/2", quantity: 80 },
      ],
    },
  ];
  const washerData = [
    {
      washerDetails: [
        { size: "5/16", quantity: 500 },
        { size: "3/8", quantity: 500 },
        { size: "1/4", quantity: 500 },
        { size: "1/2", quantity: 100 },
      ],
    },
  ];
  const boltData = [
    {
      component_name: "Belt Conveyor",
      boltDetails: [
        { size: "3/4x5/16", quantity: 120 },
        { size: "1x5/16", quantity: 100 },
        { size: "3/4x 1/4", quantity: 60 },
      ],
    },
    {
      component_name: "Reserve Box",
      boltDetails: [
        { size: "1x3/8", quantity: 24 },
        { size: "3/4x3/8", quantity: 30 },
      ],
    },
    {
      component_name: "Trolly",
      boltDetails: [
        { size: "1x3/8", quantity: 88 },
        { size: "3/4x3/8", quantity: 24 },
        { size: "3/4x5/16", quantity: 16 },
        { size: "1x5/16", quantity: 28 },
        { size: "11/2x1/2", quantity: 8 },
        { size: "1/2 x 1/4", quantity: 50 },
      ],
    },
    {
      component_name: "Track + Post",
      boltDetails: [
        { size: "1x3/8", quantity: 70 },
        { size: "3/4x1/2", quantity: 35 },
      ],
    },
    {
      component_name: "Blower - 25 Hp",
      boltDetails: [{ size: "1x3/8", quantity: 20 }],
    },
    {
      component_name: "Blower - 5 Hp",
      boltDetails: [
        { size: "3/4x3/8", quantity: 12 },
        { size: "1x5/16", quantity: 16 },
        { size: "11/2x1/2", quantity: 32 },
      ],
    },
    {
      component_name: "Kappas Structure + Platform",
      boltDetails: [
        { size: "1x3/8", quantity: 50 },
        { size: "1 1/2x3/8", quantity: 25 },
        { size: "11/2x1/2", quantity: 16 },
      ],
    },
    {
      component_name: "Lint Structure",
      boltDetails: [{ size: "1x3/8", quantity: 70 }],
    },
    {
      component_name: "Air Separator",
      boltDetails: [
        { size: "1x3/8", quantity: 32 },
        { size: "3/4x3/8", quantity: 4 },
        { size: "3/4x5/16", quantity: 36 },
        { size: "1x5/16", quantity: 54 },
        { size: "1/2x5/16", quantity: 54 },
        { size: "11/2x1/2", quantity: 16 },
        { size: "1/2 x 1/4", quantity: 20 },
        { size: "3/4x 1/4", quantity: 30 },
        { size: "1x1/4", quantity: 20 },
      ],
    },
    {
      component_name: "Lint Air separator",
      boltDetails: [
        { size: "1x3/8", quantity: 32 },
        { size: "3/4x3/8", quantity: 4 },
        { size: "3/4x5/16", quantity: 36 },
        { size: "1x5/16", quantity: 54 },
        { size: "1/2x5/16", quantity: 54 },
        { size: "11/2x1/2", quantity: 8 },
        { size: "1/2 x 1/4", quantity: 20 },
        { size: "3/4x 1/4", quantity: 30 },
        { size: "1x1/4", quantity: 20 },
      ],
    },
    {
      component_name: "lint Box",
      boltDetails: [{ size: "1/2 x 1/4", quantity: 120 }],
    },
    {
      component_name: "Change Over",
      boltDetails: [
        { size: "1x3/8", quantity: 30 },
        { size: "1x5/16", quantity: 18 },
        { size: "1x1/4", quantity: 8 },
      ],
    },
    {
      component_name: "Cyclone 2 nos",
      boltDetails: [{ size: "1x1/4", quantity: 18 }],
    },
    {
      component_name: "Lint Bypass",
      boltDetails: [{ size: "3/4x5/16", quantity: 60 }],
    },
    {
      component_name: "List Piston Box",
      boltDetails: [
        { size: "1/2 x 1/4", quantity: 200 },
        { size: "3/4x 1/4", quantity: 240 },
      ],
    },
    {
      component_name: "Pipe line",
      boltDetails: [
        { size: "3/4x5/16", quantity: 200 },
        { size: "1x1/4", quantity: 500 },
      ],
    },
    {
      component_name: "Seed Box",
      boltDetails: [{ size: "1x5/16", quantity: 20 }],
    },
    {
      component_name: "Total",
      boltDetails: [
        { size: "1x3/8", quantity: 450 },
        { size: "3/4x3/8", quantity: 74 },
        { size: "1 1/2x3/8", quantity: 25 },
        { size: "2x3/8", quantity: 35 },
        { size: "3/4x5/16", quantity: 480 },
        { size: "1x5/16", quantity: 300 },
        { size: "1/2x5/16", quantity: 110 },
        { size: "3/4x1/2", quantity: 35 },
        { size: "11/2x1/2", quantity: 60 },
        { size: "1/2 x 1/4", quantity: 410 },
        { size: "3/4x 1/4", quantity: 360 },
        { size: "1x1/4", quantity: 600 },
      ],
    },
  ];



  const insertData = async () => {
    try {
      const newData = new MainData({
        nutData,
        washerData,
        boltData,
      });
  
      const savedData = await newData.save();
      console.log("Data inserted successfully:", savedData);
      mongoose.connection.close();
    } catch (err) {
      console.error("Error inserting data:", err);
      mongoose.connection.close();
    }
  };
  
  insertData();
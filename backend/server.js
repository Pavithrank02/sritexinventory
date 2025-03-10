const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const sheetFormRoutes = require('./routes/sheetFormRoutes.js');
const nutsAndBoltsRoutes = require("./routes/nutsAndBolts.js");
const channelPattaRoutes = require("./routes/channelPattaRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/sheet-forms', sheetFormRoutes);
app.use('/nut-bolt', nutsAndBoltsRoutes);
app.use("/channel-patta", channelPattaRoutes);


// Validate environment variables
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected. Attempting to reconnect...");
});

// Routes
app.use("/nuts-and-bolts", nutsAndBoltsRoutes);

// app.put("/nuts-and-bolts/update/:id", async (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Validate ID
//     if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid ID format. Must be a valid MongoDB ObjectId.",
//         });
//     }

//     try {
//         // Update document
//         const updatedDocument = await NutsAndBolts.findByIdAndUpdate(
//             id,
//             updatedData,
//             { new: true } // Return updated document
//         );

//         if (!updatedDocument) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Document not found.",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Document updated successfully!",
//             data: updatedDocument,
//         });
//     } catch (error) {
//         console.error("Error updating document:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Failed to update the document.",
//             error: error.message,
//         });
//     }
// });

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await mongoose.connection.close();
    process.exit(0);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

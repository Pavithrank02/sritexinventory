const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const sheetFormRoutes = require("./routes/sheetFormRoutes.js");
const nutsAndBoltsRoutes = require("./routes/nutsAndBolts.js");
const channelPattaRoutes = require("./routes/channelPattaRoutes");
const componentRoutes = require("./routes/ComponentRoute");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/sheet-forms", sheetFormRoutes);
app.use("/nut-bolt", nutsAndBoltsRoutes);
app.use("/channel-patta", channelPattaRoutes);
app.use("/api/components", componentRoutes);

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

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await mongoose.connection.close();
    process.exit(0);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

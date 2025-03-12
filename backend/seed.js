const mongoose = require('mongoose');
const Component = require('./models/Component');
const components = require('./data/components');

// MongoDB Connection
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
// Insert Data
const seedDatabase = async () => {
  try {
    await Component.deleteMany(); // Clear existing data
    await Component.insertMany(components);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();

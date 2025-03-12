const express = require("express");
const router = express.Router();
const Component = require("../models/Component");
const Quantity = require("../models/Quantity");

// Fetch all components with sizes and quantities
router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    const sizes = await Quantity.distinct("size");

    const tableData = [];
    for (const component of components) {
      const row = { component: component.name };
      for (const size of sizes) {
        const quantityRecord = await Quantity.findOne({ component: component._id, size });
        row[size] = quantityRecord ? quantityRecord.quantity : 0;
      }
      tableData.push(row);
    }

    res.json(tableData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new component
router.post("/add-component", async (req, res) => {
  const { name } = req.body;
  try {
    const newComponent = new Component({ name });
    await newComponent.save();
    res.status(201).json({ message: "Component added successfully" });
  } catch (error) {
    console.error("Error adding component:", error);
    res.status(500).json({ error: "Failed to add component" });
  }
});

// Add quantity for a component
router.post("/add-quantity", async (req, res) => {
  const { componentName, size, quantity } = req.body;

  try {
    const component = await Component.findOne({ name: componentName });
    if (!component) {
      return res.status(404).json({ error: "Component not found" });
    }

    const newQuantity = new Quantity({
      component: component._id,
      size,
      quantity,
    });
    await newQuantity.save();
    res.status(201).json({ message: "Quantity added successfully" });
  } catch (error) {
    console.error("Error adding quantity:", error);
    res.status(500).json({ error: "Failed to add quantity" });
  }
});

module.exports = router;

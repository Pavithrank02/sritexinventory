const express = require("express");
const router = express.Router();
const MainData = require("../models/MainSchema.js"); // Update the path as needed


// Create new MainData
router.post("/", async (req, res) => {
  try {
    const mainData = new MainData(req.body);
    const savedData = await mainData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all MainData entries
router.get("/", async (req, res) => {
  try {
    const data = await MainData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific MainData entry by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await MainData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific MainData entry by ID
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;

  const {
    component_name,
    boltsize,
    boltquantity,
    nutSize,
    nutQuantity,
    washerSize,
    washerQuantity,
  } = req.body;

  try {
    const document = await MainData.findById(_id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update boltData
    let boltUpdated = false;
    for (let bolt of document.boltData) {
      if (bolt.component_name === component_name) {
        const boltDetail = bolt.boltDetails.find((detail) => detail.size === boltsize);
        if (boltDetail) {
          boltDetail.quantity += parseInt(boltquantity, 10);
          boltUpdated = true;
        } else {
          bolt.boltDetails.push({ size: boltsize, quantity: parseInt(boltquantity, 10) });
          boltUpdated = true;
        }
        break;
      }
    }
    if (!boltUpdated) {
      document.boltData.push({
        component_name,
        boltDetails: [{ size: boltsize, quantity: parseInt(boltquantity, 10) }],
      });
    }

    // Update nutData
    let nutUpdated = false;
    for (let nut of document.nutData) {
      const nutDetail = nut.nutDetails.find((detail) => detail.size === nutSize);
      if (nutDetail) {
        nutDetail.quantity += parseInt(nutQuantity, 10);
        nutUpdated = true;
      }
    }
    if (!nutUpdated) {
      document.nutData.push({
        nutDetails: [{ size: nutSize, quantity: parseInt(nutQuantity, 10) }],
      });
    }

    // Update washerData
    let washerUpdated = false;
    for (let washer of document.washerData) {
      const washerDetail = washer.washerDetails.find((detail) => detail.size === washerSize);
      if (washerDetail) {
        washerDetail.quantity += parseInt(washerQuantity, 10);
        washerUpdated = true;
      }
    }
    if (!washerUpdated) {
      document.washerData.push({
        washerDetails: [{ size: washerSize, quantity: parseInt(washerQuantity, 10) }],
      });
    }

    await document.save();
    res.json(document);
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Error updating document" });
  }
});






// Delete a specific MainData entry by ID
router.delete("/delete-item", async (req, res) => {
  const { type, size, component_name } = req.body; // `type` can be "bolt", "nut", or "washer"

  try {
    const document = await MainData.findOne(); // Assuming only one document exists

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (type === "bolt") {
      // Find the specific component in `boltData`
      const component = document.boltData.find((comp) => comp.component_name === component_name);

      if (component) {
        // Filter out the bolt with the specified size
        component.boltDetails = component.boltDetails.filter((bolt) => bolt.size !== size);

        // If no `boltDetails` remain, remove the entire component
        document.boltData = document.boltData.filter((comp) => comp.boltDetails.length > 0);
      }
    } else if (type === "nut") {
      // Remove the nut of the specified size from `nutData`
      document.nutData.forEach((nut) => {
        nut.nutDetails = nut.nutDetails.filter((detail) => detail.size !== size);
      });

      // Filter out any empty nut entries
      document.nutData = document.nutData.filter((nut) => nut.nutDetails.length > 0);
    } else if (type === "washer") {
      // Remove the washer of the specified size from `washerData`
      document.washerData.forEach((washer) => {
        washer.washerDetails = washer.washerDetails.filter((detail) => detail.size !== size);
      });

      // Filter out any empty washer entries
      document.washerData = document.washerData.filter((washer) => washer.washerDetails.length > 0);
    } else {
      return res.status(400).json({ message: "Invalid type specified" });
    }

    await document.save();
    res.status(200).json({ message: "Item deleted successfully", document });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
  }
});



module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Inventory = require("../models/Inventory");

// // GET all inventory items
// router.get("/", async (req, res) => {
//   try {
//     const items = await Inventory.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST create inventory item
// // POST /api/inventory

// router.post("/", async (req, res) => {
//   try {
//     console.log("Incoming request body:", req.body);

//     const { name, category, price, quantity } = req.body;

//     if (!name || !category || !price || !quantity) {
//       console.log("Validation failed: Missing fields");
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newItem = new Inventory({
//       name,
//       category,
//       price: Number(price),
//       quantity: Number(quantity),
//     });

//     console.log("Creating new item:", newItem);

//     await newItem.save();

//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error("🔥 Error in POST /api/inventory:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// // PUT update inventory item
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedItem = await InventoryItem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(400).json({ message: "Error updating item" });
//   }
// });

// // DELETE inventory item
// router.delete("/:id", async (req, res) => {
//   try {
//     await InventoryItem.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item deleted" });
//   } catch (error) {
//     res.status(400).json({ message: "Error deleting item" });
//   }
// });



// module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");  // Ensure correct import

// GET all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    console.error("Fetch inventory error:", error);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});


// PUT update inventory item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity, monthlyRequired, unit } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Prepare update data with number conversion
    const updateData = {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      monthlyRequired: monthlyRequired ? Number(monthlyRequired) : 0,
      unit: unit || "pcs"
    };

    // Find and update
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ 
      message: "Error updating item",
      error: error.message,
      fields: error.errors ? Object.keys(error.errors) : []
    });
  }
});

// PUT mark item as purchased
router.put("/:id/purchased", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { lastPurchased: new Date() },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Purchase update error:", error);
    res.status(400).json({ 
      message: "Error updating purchase date",
      error: error.message 
    });
  }
});

// POST create new inventory item
router.post("/", async (req, res) => {
  try {
    const { name, category, price, quantity, monthlyRequired, unit } = req.body;

    const newItem = new Inventory({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      monthlyRequired: monthlyRequired ? Number(monthlyRequired) : 0,
      unit: unit || "pcs"
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).json({ 
      message: "Error creating item",
      error: error.message,
      fields: error.errors ? Object.keys(error.errors) : []
    });
  }
});


// DELETE inventory item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedItem = await Inventory.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted", deletedItem });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).json({ 
      message: "Error deleting item",
      error: error.message 
    });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// GET all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create inventory item
// POST /api/inventory

router.post("/", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price || !quantity) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Inventory({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });

    console.log("Creating new item:", newItem);

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error("🔥 Error in POST /api/inventory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// PUT update inventory item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating item" });
  }
});

// DELETE inventory item
router.delete("/:id", async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting item" });
  }
});



module.exports = router;

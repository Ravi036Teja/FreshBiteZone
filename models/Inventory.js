const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: String,
    price: Number,
    quantity: Number,
    // unit: { type: String, required: true }, // e.g., kg, litres, pieces
    // costPerUnit: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);

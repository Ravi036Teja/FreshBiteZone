// const mongoose = require("mongoose");

// const inventoryItemSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     category: String,
//     price: Number,
//     quantity: Number,
//     // unit: { type: String, required: true }, // e.g., kg, litres, pieces
//     // costPerUnit: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("InventoryItem", inventoryItemSchema);


const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Item name is required"] 
    },
    category: { 
      type: String, 
      required: [true, "Category is required"] 
    },
    price: { 
      type: Number, 
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },
    quantity: { 
      type: Number, 
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"]
    },
    monthlyRequired: { 
      type: Number, 
      default: 0,
      min: [0, "Monthly requirement cannot be negative"]
    },
    unit: { 
      type: String, 
      default: "pcs",
      enum: ["pcs", "kg", "l", "g", "box", "tin", "pack"]
    },
    lastPurchased: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventoryItemSchema);
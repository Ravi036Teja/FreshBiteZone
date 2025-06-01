const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // e.g., "2025-05"
    required: true,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);

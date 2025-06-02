// // model/Expense.js
// const mongoose = require("mongoose");

// const expenseSchema = new mongoose.Schema({
//   category: String,
//   description: String,
//   amount: Number,
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Expense", expenseSchema);

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Groceries", "Gas", "Packaging", "Salary", "Rent", "Others"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Expense", expenseSchema);

const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// Set monthly budget
router.post("/", async (req, res) => {
  const { amount, month } = req.body;
  const existing = await Budget.findOne({ month });
  if (existing) {
    existing.amount = amount;
    await existing.save();
    return res.json(existing);
  }
  const budget = new Budget({ amount, month });
  await budget.save();
  res.status(201).json(budget);
});

// Get summary for a month
router.get("/:month", async (req, res) => {
  const { month } = req.params;
  const budget = await Budget.findOne({ month });
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const expenses = await Expense.find({ date: { $gte: start, $lt: end } });

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  res.json({
    budget: budget?.amount || 0,
    spent: totalSpent,
    remaining: (budget?.amount || 0) - totalSpent,
    byCategory: categoryTotals,
  });
});

module.exports = router;

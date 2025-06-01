// // routes/expenses.js
// const express = require("express");
// const router = express.Router();
// const Expense = require("../models/Expense");
// const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } = require("date-fns");

// router.get("/", async (req, res) => {
//   const { filter = "day" } = req.query;
//   let from, to;
//   const now = new Date();

//   switch (filter) {
//     case "week":
//       from = startOfWeek(now);
//       to = endOfWeek(now);
//       break;
//     case "month":
//       from = startOfMonth(now);
//       to = endOfMonth(now);
//       break;
//     default:
//       from = startOfDay(now);
//       to = endOfDay(now);
//   }

//   const expenses = await Expense.find({ date: { $gte: from, $lte: to } });
//   res.json(expenses);
// });

// router.post("/", async (req, res) => {
//   const newExp = new Expense(req.body);
//   const saved = await newExp.save();
//   res.status(201).json(saved);
// });

// module.exports = router;


// routes/expenseRoutes.js
const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();


// Create expense
router.post("/", async (req, res) => {
  const { category, amount, date } = req.body;
  const expense = new Expense({ category, amount, date });
  await expense.save();
  res.status(201).json(expense);
});

// Get all expenses (with optional month filter)
router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    let expenses;

    if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      expenses = await Expense.find({
        date: {
          $gte: startDate,
          $lt: endDate
        }
      });
    } else {
      expenses = await Expense.find();
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get Monthly Summary
// router.get("/summary", async (req, res) => {
//   try {
//     const monthStart = new Date();
//     monthStart.setDate(1);
//     monthStart.setHours(0, 0, 0, 0);

//     const expenses = await Expense.aggregate([
//       { $match: { date: { $gte: monthStart } } },
//       {
//         $group: {
//           _id: "$category",
//           total: { $sum: "$amount" },
//         },
//       },
//     ]);

//     const totalSpent = expenses.reduce((acc, curr) => acc + curr.total, 0);

//     res.json({ totalSpent, categoryBreakdown: expenses });
//   } catch (err) {
//     res.status(500).json({ message: "Error generating summary", error: err.message });
//   }
// });

module.exports = router;

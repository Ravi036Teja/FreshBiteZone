const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // adjust path as needed
const mongoose = require("mongoose");
const moment = require("moment");

// Helper: Get date range
const getDateRange = (filter) => {
  const now = new Date();
  let start;

  switch (filter) {
    case "day":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      start = new Date();
      start.setDate(start.getDate() - 7);
      break;
    case "month":
      start = new Date();
      start.setMonth(start.getMonth() - 1);
      break;
    default:
      start = new Date(0); // from beginning
  }

  return { start, end: now };
};

// 1. Overview Route
router.get("/overview", async (req, res) => {
  const { filter } = req.query;
  const { start, end } = getDateRange(filter);

  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          avgOrderValue: {
            $cond: [
              { $eq: ["$totalOrders", 0] },
              0,
              { $divide: ["$totalRevenue", "$totalOrders"] }
            ]
          }
        }
      }
    ]);

    res.json(result[0] || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analytics overview error" });
  }
});

// 2. Sales by Date (for chart)
router.get("/sales-by-date", async (req, res) => {
  const { filter } = req.query;
  const { start, end } = getDateRange(filter);

  let dateFormat;
  switch (filter) {
    case "day":
      dateFormat = "%Y-%m-%d";
      break;
    case "week":
    case "month":
      dateFormat = "%Y-%m-%d"; // still use day granularity
      break;
    default:
      dateFormat = "%Y-%m-%d";
  }

  try {
    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sales by date error" });
  }
});

// 3. Top Selling Items
router.get("/top-items", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Top items error" });
  }
});

module.exports = router;

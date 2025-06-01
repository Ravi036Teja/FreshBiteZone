// const express = require('express');
// const router = express.Router();
// const MenuItem = require('../models/MenuItem');

// const menuItems = [
//     { _id: '1', name: 'Paneer Burger', description: 'Delicious burger', price: 99 },
//     { _id: '2', name: 'Veg Pizza', description: 'Cheesy delight', price: 199 },
//     { _id: '3', name: 'Samosa', description: 'Spicy snack', price: 20 },
//   ];
  
// // Add new menu item (Admin)
// router.post('/add', async (req, res) => {
//   try {
//     const item = new MenuItem(req.body);
//     await item.save();
//     res.status(201).json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all menu items
// router.get('/', async (req, res) => {
//   const items = await MenuItem.find();
//   res.json(items);
// });

// // Update menu item
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedItem = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete menu item
// router.delete('/:id', async (req, res) => {
//   try {
//     await MenuItem.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Menu item deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Add new menu item (Admin)
router.post('/add', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update menu item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
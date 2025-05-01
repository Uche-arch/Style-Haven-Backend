const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Order = require("../models/order.js");
const { createOrder } = require("../controllers/orderController"); // ✅ Add this

// 🧾 Customer: Create new order
router.post("/", protect, createOrder); // ✅ Add this

// Admin: Get all orders
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// Admin: Update order delivered status
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { delivered } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { delivered: delivered },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found." });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status." });
  }
});

// Admin: Delete an order
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found." });
    res.json({ message: "Order deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete order." });
  }
});

module.exports = router;

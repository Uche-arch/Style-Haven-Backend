const Order = require("../models/order");

const createOrder = async (req, res) => {
  const { products, total, address, phoneNumber, receipt } = req.body; // Get receipt from request body

  try {
    // Create a new order object
    const order = new Order({
      name: req.user.name,
      email: req.user.email,
      phoneNumber,
      address,
      products,
      total,
      receipt, // Use receipt from request body
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = { createOrder };

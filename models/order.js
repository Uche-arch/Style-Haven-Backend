const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phoneNumber: String,
  products: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      color: String, // Store color
      size: String, // Store size
    },
  ],
  total: Number,
  receipt: String, // ✅ New field for Cloudinary image URL
  delivered: {
    // New field to track order delivery status
    type: Boolean,
    default: false, // Default to false, meaning not delivered
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

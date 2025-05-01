// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const {
  getAllProducts,
  addProduct,
  deleteProduct
} = require("../controllers/productControllers.js");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET products
router.get("/", getAllProducts);

// POST product (only admin can add products)
router.post("/", protect, adminOnly, upload.single("image"), addProduct);

// DELETE product by ID (only admin)
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;

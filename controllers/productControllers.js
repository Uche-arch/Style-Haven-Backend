// backend/controllers/productController.js
const Product = require("../models/product.js");

const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find();
    const products = await Product.find().sort({ createdAt: -1 }); // descending order
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to get products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const image = req.file.path; // Cloudinary image URL

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to add product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = { getAllProducts, addProduct, deleteProduct};

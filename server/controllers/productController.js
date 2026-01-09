// server/controllers/productController.js
const Product = require("../models/Product");

// ----------------------------------------------------------------------
// PUBLIC: Get all products
// ----------------------------------------------------------------------
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ----------------------------------------------------------------------
// PROTECTED: Get the logged-in user's listings
// ----------------------------------------------------------------------
exports.getMyListings = async (req, res) => {
  try {
    const ownerId = req.userId;

    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const listings = await Product.find({ ownerID: ownerId })
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    console.error("getMyListings error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ----------------------------------------------------------------------
// PROTECTED: Add new product
// ----------------------------------------------------------------------
exports.addProduct = async (req, res) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized - ownerID missing" });
    }

    const { title, description, price, quantity, img } = req.body;

    const newProduct = new Product({
      ownerID: ownerId,
      title,
      description,
      price,
      quantity,
      img,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added!",
      product: newProduct
    });

  } catch (err) {
    console.error("addProduct error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

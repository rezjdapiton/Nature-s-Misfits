// server/routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", productController.getProducts);

// PROTECTED
router.get("/my-listings", authMiddleware, productController.getMyListings);
router.post("/add-product", authMiddleware, productController.addProduct);

module.exports = router;

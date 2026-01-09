// server/routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  checkout,
  getMyOrders,
  getSellerOrders,
} = require("../controllers/orderController");

// BUYER
router.post("/checkout", auth, checkout);
router.get("/", auth, getMyOrders);

// SELLER
router.get("/seller", auth, getSellerOrders);

module.exports = router;

// server/controllers/orderController.js

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ---------------------------------------------------
// BUYER: CHECKOUT
// ---------------------------------------------------
exports.checkout = async (req, res) => {
  try {
    const userId = req.userId;

    // get cart with populated product info
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.productId) continue;

      total += item.productId.price * item.quantity;

      // reduce product stock
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { quantity: -item.quantity },
      });

      // IMPORTANT: copy seller + product snapshot
      orderItems.push({
        productId: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity,
        img: item.productId.img,
      });
    }

    const order = new Order({
      buyerId: userId,
      items: orderItems,
      totalAmount: total,
    });

    await order.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("checkout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------------------------------
// BUYER: VIEW MY ORDERS (STEP 2)
// ---------------------------------------------------
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyerId: req.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("getMyOrders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------------------------------
// SELLER: VIEW ORDERS FOR MY PRODUCTS (STEP 3)
// ---------------------------------------------------
exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.userId;

    // 1. get all seller product IDs
    const myProducts = await Product.find({ ownerID: sellerId }).select("_id");
    const productIds = myProducts.map((p) => p._id.toString());

    if (productIds.length === 0) {
      return res.json([]);
    }

    // 2. find orders containing seller products
    const orders = await Order.find({
      "items.productId": { $in: productIds },
    }).sort({ createdAt: -1 });

    // 3. filter order items per seller
    const filteredOrders = orders.map((order) => ({
      ...order.toObject(),
      items: order.items.filter((item) =>
        productIds.includes(item.productId.toString())
      ),
    }));

    res.json(filteredOrders);
  } catch (err) {
    console.error("getSellerOrders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ---------------------------------------------------
// ADD TO CART
// ---------------------------------------------------
exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing product or quantity" });
    }

    // 1️⃣ Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Find or create cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    // 3️⃣ Check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity,
        img: product.img,
      });
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.json({
      message: "Added to cart",
      cart,
    });

  } catch (err) {
    console.error("addToCart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------------------------------
// GET CART
// ---------------------------------------------------
exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.error("getCart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: String,
      price: Number,
      quantity: Number,
      img: String,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Processing", "Completed", "Cancelled"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

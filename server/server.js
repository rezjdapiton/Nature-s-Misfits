const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ------------------------------------------------------
// CORS FOR VITE FRONTEND
// ------------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ------------------------------------------------------
// ROUTES
// ------------------------------------------------------
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ⭐ STEP 6: ADD ADMIN ROUTES

// ------------------------------------------------------
// MOUNT ROUTES
// ------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes); // ⭐ STEP 6: MOUNT ADMIN API

// ------------------------------------------------------
// DATABASE
// ------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// ------------------------------------------------------
// START SERVER
// ------------------------------------------------------
app.listen(5000, () => {
  console.log("====================================");
  console.log(" Server running on port 5000");
  console.log("====================================");
  console.log("✔ Auth API:     http://localhost:5000/api/auth");
  console.log("✔ Products API: http://localhost:5000/api/products");
  console.log("✔ Cart API:     http://localhost:5000/api/cart");
  console.log("✔ Orders API:   http://localhost:5000/api/orders");
  console.log("✔ Admin API:    http://localhost:5000/api/admin"); // ⭐ CONFIRM
  console.log("====================================");
});

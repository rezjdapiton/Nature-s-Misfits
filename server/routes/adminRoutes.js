const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
});

// Ban / unban user
router.put("/users/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;

  await User.findByIdAndUpdate(req.params.id, {
    accountStatus: status,
  });

  res.json({ message: "User status updated" });
});

module.exports = router;

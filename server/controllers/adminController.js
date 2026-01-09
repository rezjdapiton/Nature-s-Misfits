const User = require("../models/User");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// BAN / UNBAN USER
exports.toggleBanUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.accountStatus = user.accountStatus === "active" ? "banned" : "active";
    await user.save();

    res.json({
      message: `User ${user.accountStatus}`,
      status: user.accountStatus
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

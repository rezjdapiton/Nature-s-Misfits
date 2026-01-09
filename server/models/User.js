const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  // ⭐ ROLE FIELD (admin or user)
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  accountStatus: {
    type: String,
    enum: ["active", "banned"],
    default: "active"
  },

  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);

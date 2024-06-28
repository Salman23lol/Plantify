const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 6, maxlength: 16, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  isVerified: { type: Boolean, default: false },
  isProfileCreated: { type: Boolean, default: false }, // Added field
  status: {
    type: String,
    enum: ["active", "frozen"],
    default: "active",
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Seller", "Supplier"],
    default: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);

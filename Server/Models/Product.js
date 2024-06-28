const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  image: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "frozen"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profileImage: { type: String },
  username: { type: String, required: true, unique: true },
  status: { type: String, enum: ['freezed', 'pending', 'clean'], default: 'clean' },
  bio: { type: String },
  links: { type: [String] },
  type: {
    type: String,
    enum: ['Seller', 'Supplier', 'User'],
    required: true
  },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Profile', ProfileSchema);

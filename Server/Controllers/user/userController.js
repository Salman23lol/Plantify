// controllers/userController.js

const jwt = require('jsonwebtoken');
const config = require('../../Config/Config');
const User = require('../../Models/User');
const Profile = require('../../Models/Profile');

// Get current user's information based on token
const getUserInfo = async (req, res) => {
  try {
    // Extract user id from token
    const userId = req.user.id;

    // Fetch user and profile information
    const user = await User.findById(userId).select('-password');
    const profile = await Profile.findOne({ user: userId }).populate('user', ['username', 'email']);

    if (!user || !profile) {
      return res.status(404).json({ msg: 'User or profile not found' });
    }

    // Combine user and profile data
    const userInfo = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        role: user.role,
        createdAt: user.createdAt,
      },
      profile: {
        id: profile._id,
        profileImage: profile.profileImage,
        username: profile.username,
        bio: profile.bio,
        links: profile.links,
        type: profile.type,
        joinedAt: profile.joinedAt,
      },
    };

    res.json(userInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getUserInfo,
};

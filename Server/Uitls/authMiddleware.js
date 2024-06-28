const jwt = require('jsonwebtoken');
const config = require('../Config/Config');
const Profile = require('../Models/Profile');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    
    // Check if user role is Admin
    if (req.user.role === 'Admin') {
      return next(); // Admins can proceed
    }

    // Allow access to profile creation or update routes
    if (req.method === 'POST' && req.originalUrl === '/api/profile') {
      return next();
    }

    // Check if the user has a seller profile
    const profile = await Profile.findOne({ user: req.user.id });

    // If profile doesn't exist or isProfileCreated is false, deny access
    if (profile.status != 'clean' || profile.type != 'Seller') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // If the user has a seller profile, allow access
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

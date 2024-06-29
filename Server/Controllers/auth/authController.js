const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../../Models/User'); // Adjusted path to User model
const config = require('../../Config/Config'); // Adjusted path to config file

// Register a new user
const registerUser = async (req, res) => {
  // Validate request body using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }

  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' }); // Return error if user exists
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password
    });

    // Encrypt password before saving to database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT token for user authentication
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err; // Throw error if JWT token generation fails
      res.json({ message: 'User registered successfully', token }); // Return message and JWT token if successful
    });
  } catch (err) {
    console.error(err.message); // Log error message to console
    res.status(500).send('Server Error'); // Return server error if something goes wrong
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // Return error if user not found
    }

    // Check if password matches using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // Return error if password doesn't match
    }

    // Create sanitized user object
    const sanitizedUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      status: user.status,
      isProfileCreated: user.isProfileCreated
      // Add more fields as needed
    };

    // Generate JWT token for user authentication
    const payload = {
      user: sanitizedUser
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err; // Throw error if JWT token generation fails
      res.json({ message: 'User logged in successfully', token, user: sanitizedUser }); // Return message, JWT token, and sanitized user object if successful
    });
  } catch (err) {
    console.error(err.message); // Log error message to console
    res.status(500).send('Server Error'); // Return server error if something goes wrong
  }
};


module.exports = {
  registerUser,
  loginUser
};

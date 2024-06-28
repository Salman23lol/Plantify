const express = require('express');
const { body } = require('express-validator');
const authController = require('../../Controllers/auth/authController');

const authRouter = express.Router();

// Register a new user
authRouter.post('/register',  authController.registerUser);

// Login user
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;

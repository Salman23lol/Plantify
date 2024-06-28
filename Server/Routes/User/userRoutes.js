// routes/api/userRoutes.js

const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../../Uitls/authMiddleware');
const UserController = require('../../Controllers/user/userController');

// @route   GET /api/user/info
// @desc    Get current user's information
// @access  Private
userRouter.get('/info', authMiddleware, UserController.getUserInfo);

module.exports = userRouter

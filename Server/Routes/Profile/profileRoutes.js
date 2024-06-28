const express = require('express');
const profileRouter = express.Router();
const auth = require('../../Uitls/authMiddleware');
const profileController = require('../../Controllers/profile/profileController');

// @route   POST /api/profile
// @desc    Create or update profile
// @access  Private
profileRouter.post('/', auth, profileController.createOrUpdateProfile);

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
profileRouter.get('/me', auth, profileController.getProfile);

// @route   DELETE /api/profile
// @desc    Delete profile
// @access  Private
profileRouter.delete('/', auth, profileController.deleteProfile);

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private
profileRouter.put('/', auth, profileController.updateProfile);

module.exports = profileRouter;

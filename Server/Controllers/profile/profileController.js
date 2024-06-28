const Profile = require('../../Models/Profile');
const User = require('../../Models/User');
const bcrypt = require('bcryptjs');

// Create or update profile
const createOrUpdateProfile = async (req, res) => {
  const { profileImage, username, bio, links, type } = req.body;
  const user = req.user.id; // Assuming you have middleware to extract user id from token

  try {
    let profile = await Profile.findOne({ user });

    if (profile) {
      // Update existing profile
      profile.profileImage = profileImage;
      profile.username = username;
      profile.bio = bio;
      profile.links = links;
      profile.type = type;
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile({
        user,
        profileImage,
        username,
        bio,
        links,
        type
      });
      await profile.save();
    }

    // Update user's isProfileCreated status
    await User.findByIdAndUpdate(user, { $set: { isProfileCreated: true } });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get current user's profile
const getProfile = async (req, res) => {
  const user = req.user.id; // Assuming you have middleware to extract user id from token

  try {
    const profile = await Profile.findOne({ user }).populate('user', ['username', 'email']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  const { profileId, email, password } = req.body;
  const user = req.user.id; // Assuming you have middleware to extract user id from token

  try {
    let profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    // Check if the user is authorized to delete the profile
    if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized to delete this profile' });
    }

    // Verify user's email and password
    const userDoc = await User.findById(user);
    if (!userDoc) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch || userDoc.email !== email) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Profile.findByIdAndRemove(profileId);
    res.json({ msg: 'Profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update profile
const updateProfile = async (req, res) => {
  const { profileId, username, bio, type, links, profileImage } = req.body;
  const user = req.user.id; // Assuming you have middleware to extract user id from token

  try {
    let profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    // Check if the user is authorized to update the profile
    if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized to update this profile' });
    }

    // Check if profile type is changing from Seller to another type
    const previousType = profile.type;
    profile.username = username;
    profile.bio = bio;
    profile.type = type;
    profile.links = links;
    profile.profileImage = profileImage;

    await profile.save();

    // If profile type changed from Seller, delete associated products
    if (previousType === 'Seller' && type !== 'Seller') {
      await Product.deleteMany({ seller: user });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
  deleteProfile,
  updateProfile
};

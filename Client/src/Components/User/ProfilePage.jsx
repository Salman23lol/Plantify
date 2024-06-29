import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const ProfilePage = () => {
    const [profileType, setProfileType] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [socialLinks, setSocialLinks] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = sessionStorage.getItem('sessionToken');
      const headers = {
        'Content-Type': 'application/json',
      };
  
      if (token) {
        headers['x-auth-token'] = `${token}`;
      }
  
      const userData = {
        type:profileType,  // Include selected profile type
        username,
        bio,
        profileImage,
        socialLinks,
      };
  
      try {
        const response = await fetch('http://localhost:4000/api/profile', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log('Response:', responseData);
        // Handle success feedback or redirection if needed
      } catch (error) {
        console.error('Error:', error);
        // Handle error state or display error message
      }
    };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <h1 className="text-4xl font-bold text-green-500">Your Profile</h1>
          </div>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <label htmlFor="profileType" className="block text-sm font-medium">Account Type</label>
                <div className="flex items-center gap-3">
                  <SelectProfileTypeButton
                    type="User"
                    isSelected={profileType === 'User'}
                    onClick={() => setProfileType('User')}
                  />
                  <SelectProfileTypeButton
                    type="Seller"
                    isSelected={profileType === 'Seller'}
                    onClick={() => setProfileType('Seller')}
                  />
                  <SelectProfileTypeButton
                    type="Supplier"
                    isSelected={profileType === 'Supplier'}
                    onClick={() => setProfileType('Supplier')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-4 rounded-sm text-green-500 bg-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-4 rounded-sm text-green-500 bg-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write a short bio about yourself"
                />
              </div>
              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium">Profile Image Link</label>
                <input
                  type="text"
                  id="profileImage"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="w-full px-3 py-4 rounded-sm text-green-500 bg-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Paste link to your profile image"
                />
              </div>
              <div>
                <label htmlFor="socialLinks" className="block text-sm font-medium">Social Media Links</label>
                <input
                  type="text"
                  id="socialLinks"
                  value={socialLinks}
                  onChange={(e) => setSocialLinks(e.target.value)}
                  className="w-full px-3 py-4 rounded-sm text-green-500 bg-gray-600 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your social media links"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-6 transition duration-300 focus:outline-none"
            >
              Save Profile
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

const SelectProfileTypeButton = ({ type, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'} focus:outline-none`}
    >
      {type}
    </button>
  );
};

export default ProfilePage;

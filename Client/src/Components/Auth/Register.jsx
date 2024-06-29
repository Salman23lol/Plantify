// src/components/Register.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    const registerData = {
     username: name,email,password
    }
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', registerData);
      const { token } = response.data;

      window.location.href = '/auth/login'
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message to user)
    }
  };

  return (
    <div className="w-full h-screen bg-gray-600 text-white flex flex-col items-center justify-center p-6 gap-4 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-green-500 mb-4"
      >
        Register
      </motion.h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none"
          >
            Register
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Register;

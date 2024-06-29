// src/components/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email,password
    }
    try {
      const response = await axios.post('https://plantify-mcwr.vercel.app/api/auth/login', loginData);
      const { token, user } = response.data;


      console.log(response.data)
      // Save token to sessionStorage
      sessionStorage.setItem('sessionToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      window.location.href = '/'
      // Redirect user to desired location
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message to user)
    }
  };

  return (
    <div className="w-full h-screen bg-gray-600 text-white flex flex-col items-center justify-center p-6 gap-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-green-500 mb-4"
      >
        Login
      </motion.h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md">
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
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none"
          >
            Login
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Login;

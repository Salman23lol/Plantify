import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data
    console.log('Form Data:', formData);
    // Here you can send the data to your backend or perform any other actions
    // Clear form fields after submission if needed
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="w-full bg-gray-800 bg-opacity-80 h-screen flex flex-col items-center py-32">
      <h1 className="text-5xl font-medium text-white mb-8">Contact Us</h1>
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-green-500 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-800 px-3 py-2 rounded-md w-full text-green-300 placeholder-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-green-500 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-800 px-3 py-2 rounded-md w-full text-green-300 placeholder-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-green-500 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-800 px-3 py-2 rounded-md w-full h-32 text-green-300 placeholder-green-500"
            required
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;

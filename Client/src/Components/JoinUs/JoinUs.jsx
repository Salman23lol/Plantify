import React, { useState } from 'react';
import { motion } from 'framer-motion';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    console.log('Form submitted:', formData);
    // You can add more logic here for submitting data to backend or other actions
  };

  return (
    <div className="w-full bg-gray-800 bg-opacity-80 h-screen flex flex-col items-center py-16">
      <div className="max-w-4xl text-center text-white">
        <h1 className="text-5xl font-medium mb-6">Join Us</h1>
        <p className="text-lg mb-8">
          Welcome to our platform! We specialize in providing high-quality agriculture tools, fertilizers, and a fresh glossary store. Join us as a seller or supplier to grow your business with our community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.1, repeat: Infinity }}
            className="bg-green-500 bg-opacity-30 p-4 rounded-lg shadow-md shadow-green-600 text-center cursor-pointer relative overflow-hidden"
            onClick={() => console.log('Clicked on Become a Seller')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-3xl 2ontfont-medium-4">Become a Seller</h2>
            <p className="text-sm p-5">
              Showcase your products and reach a wider audience. Benefit from our platform's visibility and user base.
            </p>
            <div className="absolute top-0 left-0 w-full h-full bg-green-500 opacity-25 mix-blend-overlay animate-pulse"></div>
          </motion.div>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.3, repeat: Infinity }}
            className="bg-blue-500 bg-opacity-30 p-4 rounded-lg shadow-md shadow-blue-600 text-center cursor-pointer relative overflow-hidden"
            onClick={() => console.log('Clicked on Supply Products')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-medium mb-4">Supply Products</h2>
            <p className="text-sm p-2">
              Partner with us to supply high-demand agriculture tools and fertilizers. Expand your market reach effortlessly.
            </p>
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-25 mix-blend-overlay animate-pulse"></div>
          </motion.div>
        </div>
        <p className="text-lg mt-8">
          Interested in joining us or have questions? Contact us at <span className="text-green-500">info@example.com</span>.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-8 text-start pb-16">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg text-white mb-2">Your Name</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-700 px-4 py-2 rounded-md outline-none w-full transition duration-300 placeholder:text-green-500 text-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-white mb-2">Your Email</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-700 px-4 py-2 rounded-md outline-none w-full transition duration-300 placeholder:text-green-500 text-green-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg text-white mb-2">Message (Optional)</label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-700 px-4 py-2 rounded-md outline-none w-full transition duration-300 placeholder:text-green-500 text-green-500"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 bg-opacity-50 text-white px-6 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600"
          >
            Submit
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default JoinUs;

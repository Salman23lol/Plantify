import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="w-full h-auto bg-gray-600 text-white flex flex-col items-center justify-center p-6 gap-4 mb-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-green-500 mb-4"
      >
        About Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0,  loop: Infinity }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg mb-2"
      >
        We are committed to providing the freshest organic produce directly from local farms to your doorstep.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0,  loop: Infinity }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-lg mb-2"
      >
        Our mission is to promote sustainable agriculture and healthy eating habits in our community.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0,  loop: Infinity }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-lg mb-2"
      >
        Contact us today to learn more about our products and services.
      </motion.p>
    </div>
  );
};

export default AboutUs;

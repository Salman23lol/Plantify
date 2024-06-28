import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full bg-gray-800 text-white py-6"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <motion.h3
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg font-bold"
        >
          Follow Me
        </motion.h3>
        <motion.div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/Salman23lol"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="text-2xl hover:text-green-500" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/SalmanHaider"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="text-2xl hover:text-green-500" />
          </motion.a>
          <motion.a
            href="https://twitter.com/SalmanHaider"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter className="text-2xl hover:text-green-500" />
          </motion.a>
        </motion.div>
        <motion.p
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="text-sm"
        >
          &copy; {new Date().getFullYear()} Plantify. All rights reserved. SalmanHaider
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;

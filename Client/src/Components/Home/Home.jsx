import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div className="w-full h-[400px] sm:h-[900px] relative bg-gray-700 text-white">
      <motion.img
        src="/TREE.png"
        className="w-[80%] absolute top-0 right-[10%] opacity-20"
        animate={{
          scale: [1, 1.01, 1],
          filter: [
            "drop-shadow(0 0 15px rgba(16, 185, 129, 0.7))",
            "drop-shadow(0 0 30px rgba(16, 185, 129, 1))",
            "drop-shadow(0 0 15px rgba(16, 185, 129, 0.7))",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="w-full h-full relative flex flex-col items-center pt-[20%]">
        <motion.h1
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-3xl sm:text-5xl font-medium mb-4"
        >
          Welcome to Plantify
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full sm:w-1/2 text-sm sm:text-lg mb-8 text-center"
        >
          Discover the beauty of nature at your fingertips Join us in
          cultivating a greener, <br /> Help for healthier world.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-lg mb-8 text-center"
        ></motion.p>
        <div className="w-full flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-green-600 rounded-sm shadow-md shadow-green-600"
          >
            Discover!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-green-600 rounded-sm shadow-md shadow-green-600"
          >
            Shop Now!
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

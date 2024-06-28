import React from "react";
import { motion } from "framer-motion";
import {
  FaInfo,
  FaLeaf,
  FaShoppingCart,
  FaAppleAlt,
  FaCarrot,
  FaSeedling,
} from "react-icons/fa";

const categoryIcons = {
  Fruits: FaAppleAlt,
  Vegetables: FaCarrot,
  Plants: FaSeedling,
  // Add more categories and their corresponding icons here
};

const ProductCard = ({ product }) => {
  const { title, description, category, unitPrice, image, type } = product
  const CategoryIcon = categoryIcons[category] || FaLeaf;

  return (
    <motion.div
      className="w-[260px] sm:w-full rounded shadow-lg bg-gray-800 text-white p-2 hover:cursor-pointer"
    >
      <img className="w-full h-auto rounded-sm" src={image} alt={title} />
      <div className="w-full h-auto p-2">
        <h1 className="font-bold text-xl flex items-center">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
      <div className="w-full flex items-center justify-evenly gap-3">
      <h1 className="text-lg text-center p-3">{unitPrice} Rs</h1>
      <h1 className="text-lg text-center p-3">{category}</h1>
      </div>
      <div className="flex justify-between items-center">
        <motion.button
          className="bg-green-500 bg-opacity-50 text-sm px-3 py-2 rounded-sm flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </motion.button>
        <motion.button
          className="bg-green-500 bg-opacity-50 text-sm px-3 py-2 rounded-sm flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaInfo className="mr-2" /> More Info
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

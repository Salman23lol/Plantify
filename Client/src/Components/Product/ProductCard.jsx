import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaInfo } from 'react-icons/fa';
const ProductCard = ({ product }) => {
  const { id, title, description, category, unitPrice, image } = product;

  // const addToCart = () => {
  //   // Retrieve current cart count from localStorage or default to 0
  //   const cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
  //   // Update cart count and store back in localStorage
  //   localStorage.setItem('cartCount', cartCount + 1);
  // };

  return (
    <motion.div
      key={id}
      className="w-[260px] sm:w-full rounded shadow-lg bg-gray-800 text-white hover:cursor-pointer"
    >
      <img className="w-full h-auto rounded-sm" src={image} alt={title} />
      <div className="w-full h-auto flex flex-col items-center gap-1 p-2">
        <div className="w-full h-auto p-2">
          <h1 className="font-bold text-xl flex items-center">{title}</h1>
          <p className="text-sm">{description}</p>
        </div>
        <div className="w-full flex items-center justify-evenly gap-3">
          <h1 className="text-lg text-center p-3">{unitPrice} Rs</h1>
          <h1 className="text-lg text-center p-3">{category}</h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <motion.button
            className="bg-green-500 bg-opacity-50 text-sm px-3 py-2 rounded-sm flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart className="mr-1" /> Add to Cart
          </motion.button>
    
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

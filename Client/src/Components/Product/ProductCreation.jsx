// src/components/ProductCreation.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      category,
      unitPrice,
      image,
      type,
    };
    console.log(productData);
  };

  return (
    <div className="w-full h-auto bg-gray-600 text-white flex flex-col items-center justify-center p-6 gap-4 pt-32 pb-[85px]">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-green-500 mb-4"
      >
        Create New Product
      </motion.h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="unitPrice">
            Unit Price
          </label>
          <input
            type="number"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:bg-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
            Create Product
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreation;

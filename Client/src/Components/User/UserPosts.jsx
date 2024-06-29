// src/components/UserPosts.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const UserPosts = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Seeds", "Organic", "Fruits", "Vegetables", "Plants", "Fertilizes", "Tools"]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`https://plantify-mcwr.vercel.app/api/user-posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setFetchError(false);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Fetch error:", error);
        setFetchError(true);
      }
    };
    fetchUserPosts();
  }, [userId]);

  const handleCategoryChange = (category) => {
    setFilteredCategory(category);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleTitleFilterChange = (e) => {
    setTitleFilter(e.target.value);
  };

  const filterProducts = () => {
    let filteredProducts = products;

    if (filteredCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filteredCategory
      );
    }

    if (minPrice !== "" && maxPrice !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.unitPrice >= parseFloat(minPrice) &&
          product.unitPrice <= parseFloat(maxPrice)
      );
    }

    if (titleFilter !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    setProducts(filteredProducts);

    const filtersApplied = [];
    if (filteredCategory) filtersApplied.push("Category: " + filteredCategory);
    if (minPrice !== "" || maxPrice !== "") filtersApplied.push("Price");
    if (titleFilter !== "") filtersApplied.push("Title");
    setAppliedFilters(filtersApplied);
  };

  const clearFilters = () => {
    setFilteredCategory("");
    setMinPrice("");
    setMaxPrice("");
    setTitleFilter("");
    setAppliedFilters([]);
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`/api/user-posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setFetchError(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setFetchError(true);
      }
    };
    fetchUserPosts();
  };

  const removeFilter = (filter) => {
    if (filter.startsWith("Category")) setFilteredCategory("");
    else if (filter === "Price") {
      setMinPrice("");
      setMaxPrice("");
    } else if (filter === "Title") setTitleFilter("");

    setAppliedFilters((prevFilters) =>
      prevFilters.filter((item) => item !== filter)
    );

    filterProducts();
  };

  return (
    <div className="w-full bg-gray-800 bg-opacity-80 h-screen flex flex-col items-center justify-center relative sm:p-6 gap-4 py-16">
      <div className="w-full absolute top-32 left-0 flex flex-col items-center p-2 gap-4">
        <div
          className={`flex gap-4 items-center ${
            categories.length > 4 ? "overflow-x-scroll" : ""
          }`}
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`${
                filteredCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-500 text-green-300"
              } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="w-full flex flex-wrap items-center justify-center gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="bg-gray-700 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="bg-gray-700 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
          />

          <input
            type="text"
            placeholder="Search by Title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
            className="bg-gray-700 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
          />
          <motion.div
            onClick={filterProducts}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gray-800 rounded cursor-pointer"
          >
            <FaSearch className="text-green-500 text-xl" />
          </motion.div>
        </div>
        <div className="w-full flex items-center justify-center gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={filterProducts}
            className="bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600"
          >
            Apply Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="bg-red-500 bg-opacity-50 text-white px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-red-600"
          >
            Clear Filters
          </motion.button>
        </div>
        {appliedFilters.length > 0 && (
          <div className="flex items-center gap-4">
            {appliedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center bg-green-500 text-white px-2 py-1 rounded-md"
              >
                <span>{filter}</span>
                <motion.button
                  onClick={() => removeFilter(filter + 2)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-2 focus:outline-none"
                >
                  <FaTimes className="text-red-500" />
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </div>

      {products.length === 0 || fetchError ? (
        <div className="text-red-500 mt-4">No Search Results Found</div>
      ) : (
        <div className="w-full flex items-center justify-between overflow-x-scroll p-8 gap-16 sm:flex-wrap sm:w-auto sm:gap-6 sm:p-0 sm:overflow-hidden">
          {products.map((product, index) => (
            <div key={index} className="w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;

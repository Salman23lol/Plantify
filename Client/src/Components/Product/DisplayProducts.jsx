import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const DisplayProducts = () => {
  const initialProducts = [
    {
      id:1,
      title: "Organic Apple",
      description: "Fresh organic apples from the farm.",
      category: "Fruits",
      unitPrice: 2.5,
      image:
        "https://m.media-amazon.com/images/I/51JOVU000sL._AC_UF1000,1000_QL80_.jpg",
      type: "Organic",
    },
    {
      id:2,
      title: "Organic Orange",
      description: "Fresh organic oranges from the orchard.",
      category: "Fruits",
      unitPrice: 3.0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aFeJwyeaZpP9RHMSZCnUZWDW8zk66I-ISA&s",
      type: "Organic",
    },
    {
      id:3,
      title: "Organic Carrot",
      description: "Fresh organic carrots harvested locally.",
      category: "Vegetables",
      unitPrice: 1.5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7_ItwvSnTIK8GeQTwFJ_dy99nvahPFu8_g&s",
      type: "Organic",
    },
    {
      id:4,
      title: "Indoor Fern",
      description: "Beautiful indoor fern for home decoration.",
      category: "Plants",
      unitPrice: 15.0,
      image:
        "https://www.bhg.com/thmb/9ft3c1NqNnql7r90bYwIhB_7ZSM=/1244x0/filters:no_upscale():strip_icc()/kangaroo-paw-fern-a827a94e-f819ec775ade41df9cf43d69efa159ba.jpg",
      type: "Indoor",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);

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
    let filteredProducts = initialProducts;

    // Filter by category
    if (filteredCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filteredCategory
      );
    }

    // Filter by price range
    if (minPrice !== "" && maxPrice !== "") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.unitPrice >= parseFloat(minPrice) &&
          product.unitPrice <= parseFloat(maxPrice)
      );
    }

    // Filter by title
    if (titleFilter !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    setProducts(filteredProducts);

    // Update applied filters
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
    setProducts(initialProducts);
    setAppliedFilters([]);
  };

  const removeFilter = (filter) => {
    if (filter.startsWith("Category")) setFilteredCategory("");
    else if (filter === "Price") {
      setMinPrice("");
      setMaxPrice("");
    } else if (filter === "Title") setTitleFilter("");

    // Update applied filters
    setAppliedFilters((prevFilters) =>
      prevFilters.filter((item) => item !== filter)
    );

    // Reapply filters with updated state
    filterProducts();
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center sm:p-6 gap-4">
      {/* Filter Controls */}
      <div className="flex gap-4 items-center">
        {/* Category Filter Buttons */}
        <button
          className={`${
            filteredCategory === "Fruits"
              ? "bg-green-600 text-white"
              : "bg-gray-500 text-green-300"
          } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
          onClick={() => handleCategoryChange("Fruits")}
        >
          Fruits
        </button>
        <button
          className={`${
            filteredCategory === "Vegetables"
              ? "bg-green-600 text-white"
              : "bg-gray-500 text-green-300"
          } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
          onClick={() => handleCategoryChange("Vegetables")}
        >
          Vegetables
        </button>
        <button
          className={`${
            filteredCategory === "Plants"
              ? "bg-green-600 text-white"
              : "bg-gray-500 text-green-300"
          } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
          onClick={() => handleCategoryChange("Plants")}
        >
          Plants
        </button>
        <button
          className={`${
            filteredCategory === "Seeds"
              ? "bg-green-600 text-white"
              : "bg-gray-500 text-green-300"
          } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
          onClick={() => handleCategoryChange("Seeds")}
        >
          Seeds
        </button>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="bg-gray-600 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="bg-gray-600 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
        />

        {/* Title Filter */}
        <input
          type="text"
          placeholder="Search by Title"
          value={titleFilter}
          onChange={handleTitleFilterChange}
          className="bg-gray-600 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
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

      {/* Applied Filters Display */}
      {appliedFilters.length > 0 && (
          <div className="flex items-center gap-4">
            {appliedFilters.map((filter, index) => (
              <div key={index} className="flex items-center bg-green-500 text-white px-2 py-1 rounded-md">
                <span>{filter}</span>
                <motion.button
                  onClick={() => removeFilter(filter)}
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

      {/* No Search Results Found */}
      {products.length === 0 && (
        <div className="text-red-500 mt-4">No Search Results Found</div>
      )}

      {/* Product Display */}
      <div className="w-full flex items-center justify-between overflow-x-scroll p-8 gap-16 sm:flex-wrap sm:w-auto sm:gap-6 sm:p-0 sm:overflow-hidden">
        {products.map((product, index) => (
          <div key={index} className="w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;

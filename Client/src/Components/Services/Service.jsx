import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services = () => {
  const initialServices = [
    {
      id: 1,
      title: "Lawn Mower",
      description: "Professional lawn mowing services to keep your garden neat and tidy.",
      category: "Garden",
      unitPrice: 50,
      image: "path/to/lawn_mower.jpg",
    },
    {
      id: 2,
      title: "Backyard Cleaner",
      description: "Expert backyard cleaning services to transform your outdoor space.",
      category: "Cleaning",
      unitPrice: 80,
      image: "path/to/backyard_cleaner.jpg",
    },
    {
      id: 3,
      title: "Plant Cleaners",
      description: "Specialized plant cleaning services to ensure your plants are healthy and dust-free.",
      category: "Garden",
      unitPrice: 30,
      image: "path/to/plant_cleaners.jpg",
    },
    {
      id: 4,
      title: "Pressure Washer",
      description: "High-pressure washing services to remove stubborn dirt and grime.",
      category: "Cleaning",
      unitPrice: 100,
      image: "path/to/pressure_washer.jpg",
    },
    {
      id: 5,
      title: "Niggr Washer",
      description: "High-pressure washing services to remove stubborn dirt and grime.",
      category: "Cleaning",
      unitPrice: 10,
      image: "path/to/pressure_washer.jpg",
    },
  ];

  const [services, setServices] = useState(initialServices);
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

  const filterServices = () => {
    let filteredServices = initialServices;

    if (filteredCategory) {
      filteredServices = filteredServices.filter(
        (service) => service.category === filteredCategory
      );
    }

    if (minPrice !== "" && maxPrice !== "") {
      filteredServices = filteredServices.filter(
        (service) =>
          service.unitPrice >= parseFloat(minPrice) &&
          service.unitPrice <= parseFloat(maxPrice)
      );
    }

    if (titleFilter !== "") {
      filteredServices = filteredServices.filter((service) =>
        service.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    setServices(filteredServices);

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
    setServices(initialServices);
    setAppliedFilters([]);
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

    filterServices();
  };

  return (
    <div className="w-full bg-gray-800 bg-opacity-80 h-auto flex flex-col items-center py-32">
      <h1 className="text-5xl font-medium text-white mb-8">Our Services</h1>

      <div className="w-full flex flex-col items-center gap-4 mb-16">

        <div className="flex gap-4 items-center">
          <motion.button
            className={`${
              filteredCategory === "Garden"
                ? "bg-green-600 text-white"
                : "bg-gray-500 text-green-300"
            } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
            onClick={() => handleCategoryChange("Garden")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Garden
          </motion.button>
          <motion.button
            className={`${
              filteredCategory === "Cleaning"
                ? "bg-green-600 text-white"
                : "bg-gray-500 text-green-300"
            } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600`}
            onClick={() => handleCategoryChange("Cleaning")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cleaning
          </motion.button>
        </div>

        <div className="w-full flex flex-wrap items-center justify-center gap-4">
          <motion.input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="bg-gray-700 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="bg-gray-700 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.input
            type="text"
            placeholder="Search by Title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
            className="bg-gray-700 px-4 py-2 rounded-md outline-none transition duration-300 placeholder:text-green-500 text-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.div
            onClick={filterServices}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gray-800 rounded cursor-pointer"
          >
            <FaSearch className="text-green-500 text-xl" />
          </motion.div>
        </div>

        <div className="w-full flex items-center justify-center gap-4">
          <motion.button
            onClick={filterServices}
            className="bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-green-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Filter
          </motion.button>
          <motion.button
            onClick={clearFilters}
            className="bg-red-500 bg-opacity-50 text-white px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-red-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Filters
          </motion.button>
        </div>
      </div>

      {appliedFilters.length > 0 && (
        <div className="flex items-center gap-4 mb-8">
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

      {services.length === 0 && (
        <div className="text-red-500 mt-4">No Services Found</div>
      )}

      <div className="w-full h-auto flex flex-wrap items-center justify-center p-6 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="w-full md:w-1/4 sm:w-1/2 bg-gray-700 rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <div className="p-4">
              <motion.h2
                className="text-xl font-bold text-green-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {service.title}
              </motion.h2>
              <motion.p
                className="text-gray-300 mt-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {service.description}
              </motion.p>
              <motion.p
                className="text-gray-300 mt-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ${service.unitPrice}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;

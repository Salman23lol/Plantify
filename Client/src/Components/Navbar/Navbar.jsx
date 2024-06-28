import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    } else {
      setUserData(null);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-14 bg-gray-800 text-white fixed z-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="w-full h-full flex items-center justify-between px-4">
        <div className="w-auto h-full flex items-center justify-center">
          <a href="/" className="text-xl hover:text-[24px] duration-300 NavTextHover font-medium">Plantify.</a>
        </div>
        <div className="hidden sm:flex items-center justify-evenly gap-8">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="NavTextHover hover:text-green-500 duration-100"
          >
            Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            href="/services"
            className="NavTextHover hover:text-green-500 duration-100"
          >
            Services
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="NavTextHover hover:text-green-500 duration-100"
          >
            Contact
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            href="/joinus"
            className="NavTextHover hover:text-green-500 duration-100"
          >
            Join Us
          </motion.a>
        </div>
        {!userData ||
        (typeof userData === "object" && Object.keys(userData).length === 0) ||
        Array.isArray(userData) ? (
          <div className="hidden sm:flex items-center gap-5">
            <motion.a href="/auth/login"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 px-3 py-2 rounded-sm hover:text-black duration-200"
            >
              Login
            </motion.a>
            <motion.a href="/auth/register"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 px-3 py-2 rounded-sm hover:text-black duration-200"
            >
              Register
            </motion.a>
          </div>
        ) : (
          <>
            <motion.div
              id="Sidebar-Toggler"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-auto h-auto p-4 cursor-pointer"
              onClick={toggleSidebar}
            >
              <FiMenu size={20} />
            </motion.div>
          </>
        )}
        {!userData ||
        (typeof userData === "object" && Object.keys(userData).length === 0) ||
        Array.isArray(userData) ? (
          <motion.div
            id="Sidebar-Toggler"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="block sm:hidden w-auto h-auto p-4 cursor-pointer"
            onClick={toggleSidebar}
          >
            <FiMenu size={20} />
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;

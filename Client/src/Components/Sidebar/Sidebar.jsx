import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCog, FaShoppingCart, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      stiffness: 100,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  closed: {
    x: "100%",
    transition: {
      stiffness: 100,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    x: 50,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    } else {
      setUserData(null);
    }
  }, []);

  const sidebarItems = userData
    ? [
        { name: "Home", icon: FaHome },
        { name: "Profile", icon: FaUser },
        { name: "Your Items", icon: FaShoppingCart },
        { name: "Settings", icon: FaCog },
        { name: "Logout", icon: FaSignOutAlt },
      ]
    : [
        { name: "Home", icon: FaHome },
        { name: "Products", icon: FaShoppingCart },
        { name: "Services", icon: FaCog },
        { name: "Join Us", icon: FaUser },
        { name: "Login", icon: IoMdLogIn },
        { name: "Register", icon: FaUsers },
      ];

  return (
    <>
      <motion.div
        className="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-lg z-50"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div whileHover={{ scale: 1.04, x: -4 }}>
          <IoIosCloseCircle
            onClick={toggleSidebar}
            className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-green-500"
          />
        </motion.div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <motion.ul className="flex flex-col items-start gap-5">
            {sidebarItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-800 p-4 w-full flex items-center hover:text-green-500 cursor-pointer rounded-sm"
                variants={itemVariants}
              >
                <item.icon className="mr-3" />
                {item.name}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

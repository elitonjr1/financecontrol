import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { menuItems } from "../../data";
import NavItem from "./NavItem";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 h-screen text-white p-4"
      >
        <button
          className="text-xl mb-4"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <nav className="flex flex-col gap-11">
          {menuItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              text={item.text}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))}
        </nav>
      </motion.div>
      {!isOpen && <Tooltip id="sidebar-tooltip" offset={40} />}
    </div>
  );
};

export default Sidebar;

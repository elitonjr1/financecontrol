import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ icon, text, path, isOpen, setIsOpen }) => {
  const handleClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <NavLink
      to={path}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center gap-4 cursor-pointer w-full hover:text-blue-400 ${
          isActive ? "text-blue-400" : ""
        }`
      }
    >
      <span
        data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
        data-tooltip-content={!isOpen ? text : undefined}
        className="text-xl"
      >
        {icon}
      </span>
      {isOpen && <div>{text}</div>}
    </NavLink>
  );
};

export default NavItem;

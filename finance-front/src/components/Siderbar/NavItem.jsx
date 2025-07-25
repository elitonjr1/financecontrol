import React from "react";

const NavItem = ({ icon, text, isOpen, setIsOpen }) => {
  const handleClick = () => {
    isOpen && setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-4 cursor-pointer w-full hover:text-blue-400">
      <span
        onClick={handleClick}
        data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
        data-tooltip-content={!isOpen ? text : undefined}
        className="text-xl"
      >
        {icon}
      </span>

      {isOpen && <div onClick={handleClick}>{text}</div>}
    </div>
  );
};

export default NavItem;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { menuItems } from "../../data";
import { Tooltip } from "react-tooltip";
import NavItem from "./NavItem";
import TransactionForm from "../Transactions/TransactionForm";
import logo from "../../assets/img/finaura-transparent.svg";

const Sidebar = ({ onAddTransaction, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransactionDialogOpen, SetIsTransactionDialogOpen] = useState(false);
  return (
    <div>
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--sidebar)] text-[var(--sidebar-foreground)] h-screen p-4"
      >
        <button
          className="text-xl mb-8"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </button>
        <nav className="flex flex-col gap-11 mt-32">
          {/* Botão + com Modal */}
          <button
            className="flex items-center gap-4 cursor-pointer hover:text-blue-400 text-xl"
            data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
            data-tooltip-content={!isOpen ? "Nova Transação" : undefined}
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <IoAddCircleOutline size={24} />
            {isOpen && <div>Nova Transação</div>}
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box text-black">
              <h3 className="font-bold text-lg">Nova Transação</h3>
              <TransactionForm
                onAddTransaction={() => {
                  onAddTransaction?.();
                  SetIsTransactionDialogOpen(false);
                }}
              />
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {menuItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              text={item.text}
              path={item.path}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))}
          <button
            onClick={onLogout}
            className="flex items-center gap-4 cursor-pointer hover:text-blue-400 text-xl"
            data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
            data-tooltip-content={!isOpen ? "Sair" : undefined}
            data-tooltip-place="right"
          >
            <IoLogOutOutline size={24} />
            {isOpen && <span>Sair </span>}
          </button>
        </nav>
      </motion.div>
      {!isOpen && <Tooltip id="sidebar-tooltip" offset={40} />}
    </div>
  );
};

export default Sidebar;

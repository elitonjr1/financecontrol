import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { IoAddCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { menuItems } from "../../data";
import { Tooltip } from "react-tooltip";
import NavItem from "./NavItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionForm from "../Transactions/TransactionForm";

const Sidebar = ({ onAddTransaction, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransactionDialogOpen, SetIsTransactionDialogOpen] = useState(false);
  return (
    <div>
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 h-screen text-white p-4"
      >
        <button
          className="text-xl mb-8"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <nav className="flex flex-col gap-11">
          {/* Botão + com Modal */}
          <Dialog
            open={isTransactionDialogOpen}
            onOpenChange={SetIsTransactionDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-4 cursor-pointer hover:text-blue-400 text-xl"
                data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
                data-tooltip-content={!isOpen ? "Nova Transação" : undefined}
              >
                <IoAddCircleOutline size={24} />
                {isOpen && <span>Nova Transação</span>}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
              </DialogHeader>
              <TransactionForm
                onAddTransaction={() => {
                  onAddTransaction?.();
                  SetIsTransactionDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
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

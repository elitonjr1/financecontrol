import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "./TransactionForm";

export default function SidebarWithModal({ children, refresh, onAdd, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-[98px] bg-black/70 flex flex-col items-center py-4 space-y-4">
        {/* Botão + com Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
              +
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
            </DialogHeader>
            <TransactionForm onAdd={() => {
              onAdd?.();
              setOpen(false);
            }} />
          </DialogContent>
        </Dialog>

        <button onClick={onLogout} className="text-xs text-zinc-400 hover:text-white mt-auto">
          Sair
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

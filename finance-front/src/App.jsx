import { useState } from "react";
import api from "./services/api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleAdd = () => {
    setRefresh(!refresh);
    setEditing(null); // limpa form após salvar
  };

  const handleDelete = async (id) => {
    if (confirm("Deseja excluir esta transação?")) {
      try {
        await api.delete(`/transactions/${id}`);
        setRefresh(!refresh);
      } catch (err) {
        console.error("Erro ao deletar transação:", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Controle Financeiro</h1>
      <Dashboard refresh={refresh} />
      <TransactionForm
        transaction={editing}
        onAdd={handleAdd}
        onCancel={() => setEditing(null)}
      />
      <TransactionList
        refresh={refresh}
        onEdit={(t) => setEditing(t)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

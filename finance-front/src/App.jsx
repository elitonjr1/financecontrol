import { useState, useEffect } from "react";
import api from "./services/api";
import Login from "./components/Login";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoggedIn(true);
    }
  }, []);

  const handleAdd = () => {
    setRefresh(!refresh);
    setEditing(null);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setLoggedIn(false);
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Controle Financeiro</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 underline"
        >
          Sair
        </button>
      </div>

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

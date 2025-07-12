import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => setRefresh(!refresh);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Controle Financeiro</h1>
      <Dashboard key={refresh} />
      <TransactionForm onAdd={handleAdd} />
      <TransactionList key={refresh} />
    </div>
  );
}

export default App;

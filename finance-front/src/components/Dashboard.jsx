import { useEffect, useState } from "react";
import api from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function Dashboard({ refresh }) {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/transactions/summary").then((res) => setSummary(res.data));
    api.get("/transactions/by-category").then((res) => setCategories(res.data));
  }, [refresh]); // ✅ atualiza sempre que refresh mudar

  if (!summary) return <p className="text-center">Carregando dashboard...</p>;

  const chartData = {
    labels: categories.map((c) => c.category),
    datasets: [
      {
        data: categories.map((c) => c.total),
        backgroundColor: [
          "#f87171", "#facc15", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Resumo Financeiro</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-sm text-green-800">Receitas</p>
          <p className="text-lg font-bold text-green-900">R$ {summary.totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <p className="text-sm text-red-800">Despesas</p>
          <p className="text-lg font-bold text-red-900">R$ {summary.totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-sm text-blue-800">Saldo</p>
          <p className="text-lg font-bold text-blue-900">R$ {summary.balance.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Gastos por categoria</h3>
      {categories.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Nenhuma despesa registrada ainda.</p>
      )}
    </div>
  );
}

export default Dashboard;

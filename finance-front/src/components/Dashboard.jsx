import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";

const COLORS = ["#f87171", "#facc15", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];

function Dashboard({ refresh }) {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  console.log("Carregando resumo financeiro...");
  api.get("/transactions/summary")
    .then((res) => {
      console.log("Resumo recebido:", res.data);
      setSummary(res.data);
    })
    .catch((err) => console.error("Erro ao buscar resumo:", err));

  console.log("Carregando dados por categoria...");
  api.get("/transactions/by-category")
    .then((res) => {
      console.log("Categorias recebidas:", res.data);
      setCategories(res.data);
    })
    .catch((err) => console.error("Erro ao buscar categorias:", err));
}, [refresh]);


  useEffect(() => {
    if (categories.length > 0) {
      console.log("Categorias para o gráfico:", categories);
    }
  }, [categories]);

  if (!summary) return <p className="text-center">Carregando dashboard...</p>;

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
        <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded text-center h-screen">
          <ResponsiveContainer width="100%" height="40%">
            <PieChart width={400} height={400}>
              <Pie
                data={categories}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />              
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-blue-100 p-4 rounded text-center h-screen">
          <ResponsiveContainer width="100%" height="40%">
            <PieChart>
              <Pie data={categories} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {categories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />              
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-blue-100 p-4 rounded text-center h-screen">
          <ResponsiveContainer width="100%" height="40%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />              
            </PieChart>
          </ResponsiveContainer>
        </div>
        </div>
        
      ) : (
        <p>Nenhuma despesa registrada ainda.</p>
      )}
    </div>
  );
}

export default Dashboard;

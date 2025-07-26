import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import api from "../services/api";

const COLORS = [
  "#f87171",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
];

function Dashboard({ refresh }) {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    api
      .get("/transactions/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Erro ao buscar resumo:", err));

    api
      .get("/transactions/by-category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));

    api
      .get("/transactions/by-month")
      .then((res) => setMonthly(res.data))
      .catch((err) => console.error("Erro ao buscar dados mensais:", err));
  }, [refresh]);

  if (!summary) return <p className="text-center">Carregando dashboard...</p>;

  const expenseCategories = categories.filter((c) => c.type === "Expense");
  const incomeCategories = categories.filter((c) => c.type === "Income");

  const monthlyData = [];

  monthly.forEach((item) => {
    const label = `${item.month.toString().padStart(2, "0")}/${item.year}`;
    const existing = monthlyData.find((d) => d.name === label);

    if (!existing) {
      monthlyData.push({
        name: label,
        [item.type]: item.total,
      });
    } else {
      existing[item.type] = item.total;
    }
  });

  return (
    <div className="p-4 bg-white rounded shadow-md mb-6 w-full">
      <h2 className="text-xl font-bold mb-4">Resumo Financeiro</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-sm text-green-800">Receitas</p>
          <p className="text-lg font-bold text-green-900">
            R$ {summary.totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <p className="text-sm text-red-800">Despesas</p>
          <p className="text-lg font-bold text-red-900">
            R$ {summary.totalExpense.toFixed(2)}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-sm text-blue-800">Saldo</p>
          <p className="text-lg font-bold text-blue-900">
            R$ {summary.balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Despesas por categoria */}
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-lg font-semibold mb-2">Despesas por Categorias</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseCategories}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {expenseCategories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Receitas por categoria */}
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-lg font-semibold mb-2">Receitas por Categorias</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incomeCategories}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {incomeCategories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras por mês */}
        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-lg font-semibold mb-2">
            Despesas x Receitas por Mês
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#34d399" />
              <Bar dataKey="Expense" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

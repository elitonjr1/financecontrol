import { useEffect, useState } from "react";
import api from "../../services/api";

function TransactionList({ onEdit, onDelete, refresh }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/transactions")
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar transações:", error);
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <p className="text-center">Carregando...</p>;

  if (transactions.length === 0)
    return <p className="text-center">Nenhuma transação encontrada.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 text-center">Ações</th>
            <th className="p-2">Data</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Valor</th>
            <th className="p-2">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="p-2 text-center">
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => onEdit(t)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(t.id)}
                >
                  Excluir
                </button>
              </td>
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2 text-right">
                {t.type === "Expense" ? "-" : "+"} R$ {t.amount.toFixed(2)}
              </td>
              <td className="p-2">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;

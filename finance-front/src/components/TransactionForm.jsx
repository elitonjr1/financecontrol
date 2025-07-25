import { useEffect, useState, forwardRef } from "react";
import api from "../services/api";

const TransactionForm = forwardRef(function TransactionForm({ onAdd, transaction, onCancel }, ref) {
  const [form, setForm] = useState({
    type: "Expense",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        ...transaction,
        date: transaction.date.split("T")[0],
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date).toISOString(),
    };

    try {
      if (transaction?.id) {
        await api.put(`/transactions/${transaction.id}`, payload);
      } else {
        await api.post("/transactions", payload);
      }

      setForm({
        type: "Expense",
        amount: "",
        date: "",
        category: "",
        description: "",
      });

      if (onAdd) onAdd();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      alert("Erro ao salvar transação.");
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-white rounded shadow-md mb-6"
    >
      <div className="flex gap-4">
        <label className="flex-1">
          Tipo:
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Expense">Despesa</option>
            <option value="Income">Receita</option>
          </select>
        </label>

        <label className="flex-1">
          Valor:
          <input
            type="number"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <label className="block">
        Data:
        <div className="flex gap-2 mt-1">
          <button
            type="button"
            onClick={() =>
              setForm((f) => ({
                ...f,
                date: new Date().toISOString().split("T")[0],
              }))
            }
            className={`px-3 py-1 rounded ${
              form.date === new Date().toISOString().split("T")[0]
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Hoje
          </button>
          <button
            type="button"
            onClick={() => {
              const ontem = new Date();
              ontem.setDate(ontem.getDate() - 1);
              setForm((f) => ({
                ...f,
                date: ontem.toISOString().split("T")[0],
              }));
            }}
            className={`px-3 py-1 rounded ${
              form.date ===
              (() => {
                const d = new Date();
                d.setDate(d.getDate() - 1);
                return d.toISOString().split("T")[0];
              })()
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Ontem
          </button>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 border rounded flex-1"
          />
        </div>
      </label>

      <label className="block">
        Categoria:
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </label>

      <label className="block">
        Descrição:
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <div className="flex gap-4 items-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {transaction ? "Salvar Alterações" : "Adicionar Transação"}
        </button>

        {transaction && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 underline"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
});

export default TransactionForm;

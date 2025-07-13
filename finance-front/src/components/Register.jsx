import { useState } from "react";
import api from "../services/api";

function Register({ onSuccess, onCancel }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      alert("Cadastro realizado com sucesso!");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(
        err.response?.data || "Erro ao registrar. Tente novamente."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Criar Conta</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 underline"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

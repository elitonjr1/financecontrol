import { useState } from "react";
import api from "../services/api";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (onLogin) onLogin();
    } catch (err) {
      console.error(err);
      setError("Login inválido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Entrar
      </button>
    </form>
  );
}

export default Login;

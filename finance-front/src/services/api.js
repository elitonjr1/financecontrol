import axios from "axios";

const api = axios.create({
  baseURL: "https://financecontrol-backend.onrender.com/api",
});

// carregar token do localStorage (se existir)
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;

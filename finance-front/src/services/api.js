import axios from "axios";

const isLocal = import.meta.env.MODE === "development";

console.log("API base URL:", isLocal ? "http://localhost:5000/api" : "https://financecontrol-backend.onrender.com/api");

const api = axios.create({
  baseURL: isLocal
    ? "http://localhost:5000/api"
    : "https://financecontrol-backend.onrender.com/api",
});

const token = localStorage.getItem("token");
if (token) {
  console.log("Token JWT detectado e adicionado ao header.");
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  console.warn("Nenhum token encontrado no localStorage.");
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);

export default api;

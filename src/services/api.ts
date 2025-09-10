import axios from "axios";

const api = axios.create({
  baseURL: "/api", // o Vercel serve os endpoints da pasta /api direto
});

// interceptor para adicionar token em todas as requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

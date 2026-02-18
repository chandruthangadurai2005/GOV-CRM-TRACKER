import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5011",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("🔥 TOKEN SENT:", token);   // ⭐ ADD THIS

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

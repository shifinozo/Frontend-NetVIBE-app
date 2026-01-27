
import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://backend-netvibe-app-main.onrender.com"
})

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});


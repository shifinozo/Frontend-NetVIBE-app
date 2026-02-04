
// import axios from "axios";

// export const api = axios.create({
//   // baseURL: "http://localhost:5000/api",
//   baseURL:"https://backend-netvibe-app-main.onrender.com"
// })

// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;


export const api = axios.create({
  // baseURL: "https://backend-netvibe-app-main.onrender.com/api"
  baseURL: "https://backend-netvibe-app-main.onrender.com"
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

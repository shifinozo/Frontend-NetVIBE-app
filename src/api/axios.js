// import axios from 'axios'

// export const api = axios.create({
//     baseURL:"http://localhost:5000"
// })
// // This automatically sends JWT in every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// })

// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });
// ----------------------------------------------
// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
})

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});


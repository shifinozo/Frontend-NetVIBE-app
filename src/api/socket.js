
import { io } from "socket.io-client";

// export const socket = io("http://localhost:5000", {
//   autoConnect: false,
// });
export const socket = io("https://backend-netvibe-app-main.onrender.com", {
  autoConnect: false,
});

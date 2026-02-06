
import { io } from "socket.io-client";

// export const socket = io("http://localhost:5000", {
//   autoConnect: false,
// });
const API_URL = import.meta.env.VITE_API_URL;

export const socket = io(API_URL, {
  autoConnect: false,
});

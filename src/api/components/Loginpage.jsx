// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { api } from "../axios";


// export default function Login() {
//   const [formData, setFormData] = useState({
//     emailOrUsername: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   console.log("LOGIN API HIT");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = formData.emailOrUsername.includes("@")
//         ? { email: formData.emailOrUsername, password: formData.password }
//         : { username: formData.emailOrUsername, password: formData.password };

//       const res = await api.post("/loginUser", payload);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("username", res.data.user.username);
//       console.log("after loggeddd:",res.data.user._id); 
      
//       localStorage.setItem("userId", res.data.user._id);

//       navigate(`/profile/${res.data.user.username}`);
//     } catch (err) {
//       console.log("LOGIN API HIT");
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//   <div className="min-h-screen flex flex-col items-center justify-center 
//     bg-gray-100 dark:bg-black">
//     <div className="flex flex-col items-center w-full max-w-md">

//       <div className="w-full bg-gray-800 rounded-xl shadow-lg p-6">
//         <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 text-center mb-6">
//           NetVIBE
//         </h1>

//         <form onSubmit={handleLogin} className="space-y-3">
//           <input
//             type="text"
//             name="emailOrUsername"
//             value={formData.emailOrUsername}
//             onChange={handleChange}
//             placeholder="Email or username"
//             className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
//           >
//             Login
//           </button>
//         </form>

//         <div className="flex items-center my-4">
//           <div className="flex-grow h-px bg-gray-600" />
//           <span className="px-2 text-gray-400 text-sm">OR</span>
//           <div className="flex-grow h-px bg-gray-600" />
//         </div>

//         <button
//           type="button"
//           onClick={() =>
//             (window.location.href = "http://localhost:5000/api/auth/google")
//           }
//           className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition"
//         >
//           <FcGoogle size={20} />
//           Continue with Google
//         </button>
//       </div>

//       <div className="w-full mt-4 py-4 text-center">
//         <span className="text-gray-300 text-sm dark:text-gray-400">
//           Don't have an account?
//           <button
//           onClick={() => navigate("/signUp")}
//           className="ml-1 text-blue-400 dark:text-blue-500 font-semibold hover:underline focus:outline-none"
//           >
//           Sign Up
//           </button>
//         </span>
//         </div>

//     </div>
//   </div>
// );
// ;
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

export default function Login() {
  const navigate = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = emailOrUsername.includes("@")
        ? { email: emailOrUsername, password }
        : { username: emailOrUsername, password };

      const res = await api.post("/loginUser", payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("userId", res.data.user._id);

      navigate(`/profile/${res.data.user.username}`);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://backend-netvibe-app-main.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black">

      {/* Brand */}
      <h1 className="mb-6 text-4xl font-semibold tracking-wide">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
          NetVIBE
        </span>
      </h1>

      {/* Login Card */}
      <div className="w-full max-w-sm px-10 py-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md">

        <form onSubmit={handleLogin} className="space-y-3">

          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300 dark:bg-zinc-700"></div>
          <span className="mx-3 text-xs font-semibold text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-zinc-700"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          Continue with Google
        </button>
      </div>

      {/* Footer */}
      <div className="w-full max-w-sm mt-3 py-4 text-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Don’t have an account?
          <button
            onClick={() => navigate("/signUp")}
            className="ml-1 text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </button>
        </span>
      </div>

    </div>
  );
}

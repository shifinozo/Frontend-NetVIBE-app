


import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const payload = formData.emailOrUsername.includes("@")
      ? { email: formData.emailOrUsername, password: formData.password }
      : { username: formData.emailOrUsername, password: formData.password };

    const res = await api.post("/loginUser", payload);

    localStorage.setItem("token", res.data.token);

    console.log("Login success");

    navigate(`/profile/${res.data.user.username}`);

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold">NetVIBE</h1>
        </div>

        {/* Email / Username */}
        <input
          type="text"
          name="emailOrUsername"
          value={formData.emailOrUsername}
          onChange={handleChange}
          placeholder="Email or username"
          className="w-full mb-3 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() =>
            (window.location.href =
              "http://localhost:3000/api/auth/google")
          }
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <button onClick={()=>navigate("/signUp")} className="text-center text-sm text-red-400 mt-6">
          Don't have an account?Sign Up
          </button>
      </form>
    </div>
  );
}

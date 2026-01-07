import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";
import { toast } from "react-hot-toast";



export default function SignUp() {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password,setpassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();



     const handleuser = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      setMessage("Please fill both fields");
      return;
    }

    try {
      const user = { username, email ,password };

      const register = await api.post("/registerUser", user);

      localStorage.setItem("token", register.data.token);
      localStorage.setItem("username", username)

      console.log("User Added Successfully", register.data);

      setMessage("User registered successfully!");
      toast.success("user registered successfully")

      setTimeout(() => {
        navigate(`/profile/${username}`)
      }, 1000);

    } catch (error) {
      console.log("Something went wrong!", error);
      
      setMessage("Registration failed");
      toast.error("Registration failed")
    }
  };
  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};

return (
  <div className="min-h-screen flex flex-col items-center justify-center 
    bg-gray-50 dark:bg-black">

    <h1 className="mb-6 text-4xl font-semibold tracking-wide">
      <span className="text-transparent bg-clip-text bg-gradient-to-r 
        from-purple-500 to-cyan-400">
        NetVIBE
      </span>
    </h1>

    <div className="w-full max-w-sm px-10 py-8
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      rounded-md">

      <form onSubmit={handleuser} className="space-y-3">

        <input
          type="email"
          placeholder="Email or phone number"
          className="w-full px-3 py-2 text-sm rounded-sm
          bg-gray-50 dark:bg-zinc-800
          border border-gray-300 dark:border-zinc-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500"
          onChange={(e) => setemail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 text-sm rounded-sm
          bg-gray-50 dark:bg-zinc-800
          border border-gray-300 dark:border-zinc-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500"
          onChange={(e) => setusername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 text-sm rounded-sm
          bg-gray-50 dark:bg-zinc-800
          border border-gray-300 dark:border-zinc-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500"
          onChange={(e) => setpassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full mt-3 py-2 rounded-md
          bg-blue-500 hover:bg-blue-600
          text-white text-sm font-semibold"
        >
          Sign up
        </button>
      </form>

      <div className="flex items-center my-5">
        <div className="flex-grow h-px bg-gray-300 dark:bg-zinc-700"></div>
        <span className="mx-3 text-xs font-semibold
          text-gray-400 dark:text-gray-500">
          OR
        </span>
        <div className="flex-grow h-px bg-gray-300 dark:bg-zinc-700"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2
        text-sm font-semibold
        text-blue-600 dark:text-blue-400"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-4 h-4"
        />
        Log in with Google
      </button>
    </div>

    <div className="w-full max-w-sm mt-3 py-4 text-center
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-800
      rounded-md">

      <span className="text-sm text-gray-700 dark:text-gray-300">
        Have an account?
        <button
          onClick={() => navigate("/")}
          className="ml-1 text-blue-500 dark:text-blue-400
          font-semibold bg-transparent border-none p-0
          hover:underline focus:outline-none"
        >
          Log in
        </button>
      </span>
    </div>
  </div>
);

}
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
    window.location.href = "/googleAuthLogin";
  }

  return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
         NetVIBE
        </h1>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <form onSubmit={handleuser} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email or phone no:"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={(e)=>setemail(e.target.value)}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={(e)=>setusername(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={(e)=>setpassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg text-sm font-semibold"
          >
            Register
          </button>
        </form>

       
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

      </div>
          <button onClick={() => navigate("/")} className="text-center text-sm text-green-400 mt-6">
            Do have an account?Sign In
            </button>
    </div>
  )
}
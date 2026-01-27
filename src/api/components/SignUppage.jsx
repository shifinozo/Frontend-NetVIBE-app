

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ STEP 1: SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/send-otp", {
        username,
        email,
        password,
      });

      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STEP 2: VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/verify-otp", {
        email,
        otp,
      });

      // ✅ Save login details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      toast.success("Account verified successfully");

      navigate(`/profile/${res.data.username}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE SIGNUP (UNCHANGED)
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black">

      <h1 className="mb-6 text-4xl font-semibold tracking-wide">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
          NetVIBE
        </span>
      </h1>

      <div className="w-full max-w-sm px-10 py-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md">

        {!otpSent ? (
          // 🔹 SIGNUP FORM
          <form onSubmit={handleSendOtp} className="space-y-3">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold"
            >
              {loading ? "Sending OTP..." : "Sign Up"}
            </button>
          </form>
        ) : (
          // 🔹 OTP VERIFY FORM
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-3 py-2 text-sm rounded-sm bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* GOOGLE SIGNUP */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300 dark:bg-zinc-700"></div>
          <span className="mx-3 text-xs font-semibold text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-zinc-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          Sign up with Google
        </button>
      </div>

      <div className="w-full max-w-sm mt-3 py-4 text-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Have an account?
          <button
            onClick={() => navigate("/")}
            className="ml-1 text-blue-500 font-semibold hover:underline"
          >
            Log in
          </button>
        </span>
      </div>

    </div>
  );
}


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const handleCredentialResponse = async (response) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        credential: response.credential,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Google login failed", err);
      alert("Google login failed");
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "129311985141-ie5fqj4iq3ddv035urin80lun97uaejb.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          width: "100%",
        }
      );
    }
  }, []);

  return (
    <div className="min-h-[90vh] pt-16 flex items-start justify-center bg-[#A7C1A8] dark:bg-gray-950 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white/30 dark:bg-black/30 backdrop-blur text-gray-800 dark:text-white"
      >
        <h2 className="text-3xl font-poetic italic text-green-700 dark:text-green-400 text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border border-green-300 dark:border-green-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border border-green-300 dark:border-green-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-green-500"></div>
          <span className="mx-4 text-green-500 font-medium">or</span>
          <div className="flex-grow border-t border-green-500"></div>
        </div>

        {/* Google Sign-In */}
        <div className="w-full flex justify-center">
          <div
            id="google-login-btn"
            className="w-full flex justify-center"
          ></div>
        </div>

        <p className="mt-6 text-sm text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 dark:text-green-400 underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

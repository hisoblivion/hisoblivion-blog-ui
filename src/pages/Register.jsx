import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-[90vh] pt-16 flex items-start justify-center bg-[#A7C1A8] dark:bg-gray-950 transition-colors duration-300">
      <div className="bg-white dark:bg-black p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-green-700 dark:text-green-400 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded bg-transparent text-gray-900 dark:text-white border-green-400 placeholder:text-green-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded bg-transparent text-gray-900 dark:text-white border-green-400 placeholder:text-green-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded bg-transparent text-gray-900 dark:text-white border-green-400 placeholder:text-green-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 dark:text-green-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

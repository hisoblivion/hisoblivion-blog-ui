import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedIn, logout } from "../utils/Auth";
import { jwtDecode } from "jwt-decode";

function Navbar({ searchQuery, setSearchQuery }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Dark mode toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Decode token on route change
  useEffect(() => {
    if (isLoggedIn()) {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const name = decoded?.name?.split(" ")[0];
        setUserName(name || null);
      } catch {
        setUserName(null);
      }
    }
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <header
      className={`relative z-10 sticky top-0 transition-all duration-500 ${
        scrolled
          ? "bg-stone-100/90 dark:bg-black/80 shadow-lg backdrop-blur"
          : "bg-stone-100 dark:bg-black"
      } text-black dark:text-white`}
    >
      {/* Title */}
      <div className="relative z-10 flex flex-col items-center py-2 md:py-1">
        <Link
          to="/"
          className="text-4xl font-medium text-green-600 hover:text-green-500 transition-all font-poetic italic"
        >
          His Oblivion
        </Link>
        <p className="text-xs italic text-gray-600 dark:text-gray-400 mt-1">
          a place for feelings, fragments, and poetry ✨
        </p>
      </div>

      {/* Nav + Search + Theme Toggle */}
      <div className="relative z-10 flex items-center justify-between px-6 pb-2 md:pb-3">
        {/* Navigation */}
        <div className="space-x-6 text-sm md:text-base">
          {["Home", "Posts", "About", "Contact"].map((label) => {
            const path = `/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={label}
                to={path}
                className={`relative inline-block transition-all duration-200 ${
                  isActive ? "text-green-400 font-medium" : "hover:text-green-400"
                }`}
              >
                <span
                  className={`after:block after:h-[2px] after:bg-green-400 after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Hidden admin link */}
        <Link to="/admin" className="hidden">
          Admin
        </Link>

        {/* Search + Theme + Avatar */}
        <div className="flex items-center space-x-2">
          <motion.input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-b border-green-400 text-green-400 px-2 py-1 text-sm focus:outline-none placeholder:text-green-300"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl hover:text-green-400 transition-colors duration-300"
            title="Toggle Theme"
          >
            {darkMode ? "🔆" : "🌑"}
          </button>
        </div>
      </div>

      {/* Top-right Avatar + Dropdown */}
      {userName && (
        <div className="absolute top-3 right-4 z-50" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
            title="Account"
          >
            <span className="text-sm text-green-600 dark:text-green-300">Hi, {userName}</span>
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-2 w-32 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md"
              >
                <button
                  onClick={() => {
                    logout(navigate);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </header>
  );
}

export default Navbar;

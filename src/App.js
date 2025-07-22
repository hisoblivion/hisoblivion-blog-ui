import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Wrapper component to access useLocation outside Router
function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const hideLayoutOnRoutes = ["/login", "/register"];
  const shouldHide = hideLayoutOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-sage dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {!shouldHide && <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}

      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home searchQuery={debouncedQuery} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Posts searchQuery={debouncedQuery} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {!shouldHide && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

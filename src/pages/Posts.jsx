import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { FaArrowUp } from "react-icons/fa";

function Posts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allPosts = res.data.reverse(); // latest first
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery?.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory) {
      filtered = filtered.filter((post) =>
        post.category?.some(
          (cat) => cat.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, activeCategory, posts]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {activeCategory && (
        <div className="mb-4">
          <button
            onClick={() => setActiveCategory("")}
            className="text-sm text-red-500 underline"
          >
            Clear Category Filter: #{activeCategory}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <PostCard
            key={post.id}
            post={post}
            onCategoryClick={setActiveCategory}
            isFirst={idx === 0}
          />
        ))}
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default Posts;

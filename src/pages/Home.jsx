import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { FaArrowUp, FaPaperPlane } from "react-icons/fa";
import {
  isPostLiked,
  togglePostLike,
  getLikeCount,
} from "../utils/LikeStorage";
import { useNavigate } from "react-router-dom";
import CommentSection from "../components/comments/CommentSection";

function Home({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
        setFilteredPosts(sorted);

        if (sorted.length > 0) {
          setLiked(isPostLiked(sorted[0].id));
          setLikeCount(getLikeCount(sorted[0].id));
        }
      } catch (err) {
        console.error("Error fetching posts", err);
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
        Array.isArray(post.category)
          ? post.category.includes(activeCategory)
          : false
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, activeCategory, posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        visible < filteredPosts.length
      ) {
        setVisible((prev) => prev + 1);
      }

      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, filteredPosts.length]);

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const handleLike = (postId) => {
    const nowLiked = togglePostLike(postId);
    setLiked(nowLiked);
    setLikeCount(nowLiked ? 1 : 0);
  };

  const handleShare = async (postId, title) => {
    const shareUrl = `${window.location.origin}/posts/${postId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "Check out this post!",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Native share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("🔗 Link copied to clipboard!");
      } catch (err) {
        console.error("Copy failed", err);
      }
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {activeCategory && (
        <div className="mb-4 text-sm text-red-400">
          Showing posts tagged with <strong>#{activeCategory}</strong>{" "}
          <button onClick={() => setActiveCategory("")} className="underline">
            Clear
          </button>
        </div>
      )}

      {filteredPosts.slice(0, visible).map((post, index) => {
        const fullImageUrl = post.image
          ? `http://localhost:8080${post.image}`
          : "";
        const isVideo = fullImageUrl.match(/\.(mp4|webm|ogg)$/i);

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {index === 0 ? (
              <div className="mb-10">
                {post.image && (
                  <div className="mb-6">
                    {isVideo ? (
                      <video
                        src={fullImageUrl}
                        controls
                        className="w-full h-72 object-cover rounded"
                      />
                    ) : (
                      <img
                        src={fullImageUrl}
                        alt="Post Visual"
                        className="w-full object-contain rounded mb-6"
                      />
                    )}
                  </div>
                )}

                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    {liked ? "❤️" : "🤍"} {likeCount}
                  </button>

                  <button
                    onClick={() => handleShare(post.id, post.title)}
                    title="Share"
                  >
                    <FaPaperPlane className="text-green-600 hover:scale-110 transition-transform" />
                  </button>
                </div>

                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line mb-6">
                  {post.content}
                </p>

                {Array.isArray(post.category) && post.category.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 italic mb-6">
                    {post.category.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCategory(cat)}
                        className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-white px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform"
                      >
                        🌿 #{cat}
                      </button>
                    ))}
                  </div>
                )}

                <CommentSection postId={post.id} />
              </div>
            ) : (
              <PostCard
                post={post}
                isFirst={false}
                onCategoryClick={setActiveCategory}
              />
            )}
          </motion.div>
        );
      })}

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <FaArrowUp />
        </button>
      )}
    </motion.div>
  );
}

export default Home;

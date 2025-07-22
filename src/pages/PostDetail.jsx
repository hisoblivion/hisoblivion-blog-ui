import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane, FaArrowUp } from "react-icons/fa";
import {
  isPostLiked,
  togglePostLike,
  getLikeCount,
} from "../utils/LikeStorage";
import CommentSection from "../components/comments/CommentSection";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data);
        setLiked(isPostLiked(res.data.id));
        setLikeCount(getLikeCount(res.data.id));
      } catch (err) {
        console.error("Post fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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

  const handleLike = () => {
    const nowLiked = togglePostLike(post.id);
    setLiked(nowLiked);
    setLikeCount(nowLiked ? 1 : 0);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/posts/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
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

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!post) return <p className="text-center py-20">Post not found.</p>;

  const fullImageUrl = post.image ? `http://localhost:8080${post.image}` : "";
  const isVideo = fullImageUrl.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
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
          onClick={handleLike}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>

        <button onClick={handleShare} title="Share">
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
              onClick={() => navigate(`/posts?tag=${encodeURIComponent(cat)}`)}
              className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-white px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform"
            >
              🌿 #{cat}
            </button>
          ))}
        </div>
      )}

      <CommentSection postId={id} />

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

export default PostDetail;

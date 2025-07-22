import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import {
  isPostLiked,
  togglePostLike,
  getLikedPosts,
} from "../utils/LikeStorage";

function PostCard({ post, onCategoryClick, isFirst }) {
  const [liked, setLiked] = React.useState(isPostLiked(post.id));
  const [likeCount, setLikeCount] = React.useState(() => {
    const likedPosts = getLikedPosts();
    return likedPosts.includes(post.id) ? 1 : 0;
  });

  const handleLike = () => {
    const updated = togglePostLike(post.id);
    setLiked(updated.includes(post.id));
    setLikeCount(updated.includes(post.id) ? 1 : 0);
  };

  const isVideo = post.image && post.image.match(/\.(mp4|webm|ogg)$/i);
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `http://localhost:8080${post.image}`;

  return (
    <div
      className={`relative bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-[1.02] hover:shadow-2xl duration-300 animate-fade-in-down ${
        isFirst ? "border-2 border-green-500" : ""
      }`}
    >
      {/* Image or Video */}
      {post.image && (
        <div className="relative group">
          {isVideo ? (
            <video src={imageUrl} className="w-full h-64 object-cover" controls />
          ) : (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              to={`/posts/${post.id}`}
              className="bg-white text-black px-4 py-2 rounded shadow font-medium hover:bg-green-300"
            >
              Read Full Post →
            </Link>
          </div>
        </div>
      )}

      {/* Text */}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {new Date(post.createdAt || Date.now()).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">
          {post.content.length > 200
            ? `${post.content.substring(0, 200)}...`
            : post.content}
        </p>

        {/* Read More Link */}
        <Link
          to={`/posts/${post.id}`}
          className="text-green-600 hover:underline text-sm font-medium inline-block mb-3"
        >
          Read More →
        </Link>

        {Array.isArray(post.category) && post.category.length > 0 && (
  <div className="mt-2 flex flex-wrap gap-2 text-xs">
    {post.category.map((cat, idx) => (
      <button
        key={idx}
        onClick={() => onCategoryClick?.(cat)}
        className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-white px-2 py-1 rounded-full hover:scale-105 transition-transform"
      >
        🌿 #{cat}
      </button>
    ))}
  </div>
)}



        {/* ❤️ Like + 📤 Share */}
        <div className="flex items-center justify-end mt-4 gap-4 text-gray-600 dark:text-gray-300">
          <button onClick={handleLike} className="flex items-center space-x-1">
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-red-400" />
            )}
            <span className="text-sm">{likeCount}</span>
          </button>
          <button
            onClick={() =>
              navigator.share
                ? navigator.share({
                    title: post.title,
                    text: post.content,
                    url: window.location.origin + `/posts/${post.id}`,
                  })
                : navigator.clipboard.writeText(
                    `${window.location.origin}/posts/${post.id}`
                  )
            }
            title="Share"
          >
            <FaPaperPlane className="text-green-600 hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

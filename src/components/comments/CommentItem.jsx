import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaEllipsisV } from "react-icons/fa";
import ReplyInput from "./ReplyInput";

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const years = Math.floor(days / 365);
  return `${years}y`;
};

const CommentItem = ({
  comment,
  postId,
  onReplySubmit,
  onDelete,
  onEdit,
  onLike,
  depth = 0,
  userId,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [showReplies, setShowReplies] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const maxDepth = 3;
  const isLikedByUser = comment.likes?.some((like) => like.userId === userId);
  const getBg = () =>
    depth === 0 ? "bg-gray-800" : depth === 1 ? "bg-gray-700" : "bg-gray-600";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="mb-4">
      <div className={`p-3 rounded relative shadow ${getBg()} text-white`}>
        {/* Avatar + Name */}
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center mr-2 text-xs font-bold">
            {comment.name ? comment.name[0].toUpperCase() : "?"}
          </div>
          <p className="text-green-400 text-sm font-semibold">
            {comment.name || "Anonymous"}
          </p>
        </div>

        {/* Edit/Delete Dropdown */}
        <div className="absolute top-2 right-2" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaEllipsisV />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 bg-white dark:bg-gray-900 shadow text-sm rounded z-50">
              <button
                onClick={() => {
                  setEditMode(true);
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(comment.id);
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Comment Text */}
        {editMode ? (
          <ReplyInput
            value={editText}
            onChange={setEditText}
            onCancel={() => setEditMode(false)}
            onSubmit={() => {
              onEdit(comment.id, editText);
              setEditMode(false);
            }}
            actionLabel="Save"
          />
        ) : (
          <>
            <p>{comment.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {getRelativeTime(comment.createdAt)}
            </p>
          </>
        )}

        {/* Like / Reply / Collapse */}
        <div className="mt-2 flex gap-4 text-xs items-center text-blue-400">
          <button
            onClick={() => {
              if (!isLikedByUser) onLike(comment.id);
            }}
            disabled={isLikedByUser}
            className={`flex items-center gap-1 ${
              isLikedByUser ? "text-red-300" : "text-red-500 hover:scale-110"
            }`}
          >
            <FaHeart />
            <span>{comment.likeCount || 0}</span>
          </button>

          {depth < maxDepth && (
            <button onClick={() => setShowReply(!showReply)}>
              {showReply ? "Cancel" : "Reply"}
            </button>
          )}

          {Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <button onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? "Hide Replies" : "Show Replies"}
            </button>
          )}
        </div>

        {showReply && (
          <ReplyInput
            value=""
            onChange={(val) => setEditText(val)}
            onCancel={() => setShowReply(false)}
            onSubmit={() => {
              onReplySubmit(comment.id, editText);
              setShowReply(false);
            }}
          />
        )}
      </div>

      {/* Render Replies */}
      {showReplies &&
        Array.isArray(comment.replies) &&
        comment.replies.length > 0 &&
        depth < maxDepth && (
          <div className="ml-5 pl-4 border-l-2 border-blue-400 mt-2">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                onReplySubmit={onReplySubmit}
                onDelete={onDelete}
                onEdit={onEdit}
                onLike={onLike}
                depth={depth + 1}
                userId={userId}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default CommentItem;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";
import { jwtDecode } from "jwt-decode";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;
  const userName = decoded?.name;

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/posts/${postId}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(`http://localhost:8080/api/posts/${postId}/comments`, {
        content: newComment,
        name: userName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const handleReplySubmit = async (parentId, content) => {
    try {
      await axios.post(
        `http://localhost:8080/api/posts/${postId}/comments?parentId=${parentId}`,
        { content, name: userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (err) {
      console.error("Error submitting reply:", err);
    }
  };

  const handleEdit = async (commentId, content) => {
    try {
      await axios.put(
        `http://localhost:8080/api/posts/${postId}/comments/${commentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleLike = async (commentId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/comments/${commentId}/like?userId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (err) {
      console.log("Already liked or error:", err.response?.status);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 rounded border dark:bg-gray-800"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
        <button
          onClick={handleSubmitComment}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            onReplySubmit={handleReplySubmit}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onLike={handleLike}
            depth={0}
            userId={userId}
          />
        ))
      ) : (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentSection;

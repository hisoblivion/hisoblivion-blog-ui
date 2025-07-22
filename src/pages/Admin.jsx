import React, { useEffect, useState } from "react";
import axios from "axios";

// 👇 Token helper directly inside Admin.jsx
function getToken() {
  return localStorage.getItem("token");
}

function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategories("");
    setFile(null);
    setPreview(null);
    setEditingPostId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(editingPostId ? "Updating post..." : "Creating post...");

    try {
      let imageUrl = "";

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await axios.post("http://localhost:8080/api/posts/upload", formData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadRes.data;
      }

      const postData = {
        title,
        content,
        category: categories.split(",").map((c) => c.trim()),
        image: imageUrl || (editingPostId ? posts.find((p) => p.id === editingPostId)?.image : ""),
      };

      if (editingPostId) {
        await axios.put(`http://localhost:8080/api/posts/${editingPostId}`, postData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setMessage("✅ Post updated");
      } else {
        await axios.post("http://localhost:8080/api/posts", postData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setMessage("✅ Post created");
      }

      resetForm();
      fetchPosts();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit");
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setCategories(post.category.join(", "));
    setPreview(post.image || null);
    setEditingPostId(post.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setMessage("🗑 Post deleted");
      fetchPosts();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{editingPostId ? "Edit Post" : "Create Post"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 rounded border dark:bg-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Post content"
          className="w-full px-4 py-2 rounded border dark:bg-gray-800 h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Comma-separated categories (e.g., Poetry,Night)"
          className="w-full px-4 py-2 rounded border dark:bg-gray-800"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
        />

        {preview && (
          <div className="mt-2">
            <img src={preview} alt="Preview" className="w-full max-h-64 object-contain border rounded" />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            {editingPostId ? "Update" : "Post"}
          </button>
          {editingPostId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>

      {/* Post List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">All Posts</h3>
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start justify-between bg-gray-100 dark:bg-gray-800 p-4 mb-3 rounded shadow"
          >
            <div className="flex-1">
              <p className="font-bold">{post.title}</p>
              <p className="text-sm text-gray-500">{post.category.join(", ")}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-sm px-3 py-1 rounded bg-blue-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm px-3 py-1 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

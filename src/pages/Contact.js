import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [showModal, setShowModal] = useState(false);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("");
        setFormData({ name: "", email: "", message: "" });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);

      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="-mt-16 min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 md:px-20 pt-0 pb-2">
      {/* LEFT: Info Block */}
      <motion.div
        className="md:w-1/2 space-y-6 mb-12 md:mb-0 text-center md:text-left"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-green-400">Let's Connect</h2>
        <p className="text-gray-300 text-lg">
          Got a project, a poem, or a curious thought? I'd love to hear from you. Drop a message and I’ll get back soon!
        </p>

        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
            <FaEnvelope className="text-green-400" /> nitish.explores@gmail.com
          </p>
          <p className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
            <FaPhoneAlt className="text-green-400" /> +91 7397461860
          </p>
        </div>

        <div className="flex justify-center md:justify-start gap-4 text-xl pt-2">
          <a href="https://linkedin.com/in/nitish-kumar-50755213a" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaLinkedin /></a>
          <a href="https://github.com/hisoblivion" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaGithub /></a>
          <a href="https://instagram.com/his_oblivion" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaInstagram /></a>
          <a href="https://twitter.com/IndiaStandsTall" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaTwitter /></a>
        </div>
      </motion.div>

      {/* RIGHT: Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="md:w-1/2 bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 w-full max-w-lg"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 tracking-wide font-light mb-1">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-300 tracking-wide font-light mb-1">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-gray-300 tracking-wide font-light mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          ></textarea>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-6 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-400 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message ✉️"}
        </motion.button>

        {status && <p className="text-sm text-green-400 pt-2">{status}</p>}
        
        {showModal && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-3 text-gray-400 hover:text-red-400 text-xl"
      >
        &times;
      </button>
      <h3 className="text-xl font-semibold text-green-400 mb-2">Message Sent! ✅</h3>
      <p className="text-sm text-gray-300">Thanks for reaching out. I’ll get back to you soon.</p>
    </div>
  </motion.div>
)}
      </motion.form>
    </section>
  );
}

export default Contact;

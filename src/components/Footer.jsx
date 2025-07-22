import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 border-t border-white/10 text-center py-6 px-4 mt-12 shadow-inner rounded-t-xl">
      <div className="text-sm text-gray-400 mb-2 tracking-wide">
        © <span className="text-green-400 font-medium">His Oblivion</span> — Written in code & silence • {new Date().getFullYear()}
      </div>

      <div className="flex justify-center gap-6 text-xl text-gray-400">
        <a
          href="https://instagram.com/his_oblivion"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition hover:drop-shadow-lg"
          title="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/IndiaStandsTall"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition hover:drop-shadow-lg"
          title="Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com/in/nitish-kumar-50755213a"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition hover:drop-shadow-lg"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/hisoblivion"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition hover:drop-shadow-lg"
          title="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import profileImage from "../assests/Niks_image.jpg";

const phrases = ["What I do", "Why I code", "What inspires me"];

function About() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const jan1 = new Date(currentYear, 0, 1);
    const daysPassed = Math.floor((today - jan1) / (1000 * 60 * 60 * 24)) + 1;
  
    // Count working days (Mon-Fri)
    let workingDays = 0;
    for (let i = 0; i < daysPassed; i++) {
      const day = new Date(jan1);
      day.setDate(jan1.getDate() + i);
      const weekday = day.getDay(); // 0 = Sunday, 6 = Saturday
      if (weekday !== 0 && weekday !== 6) {
        workingDays++;
      }
    }
  
    // Approximate leaves: 2.5 per month till now
    const monthsPassed = today.getMonth() + 1;
    const approxLeaves = Math.round(monthsPassed * 2.5);
    const actualWorkingDays = Math.max(workingDays - approxLeaves, 0);
    const funDays = daysPassed - actualWorkingDays;
  
    // Final dynamic values
    const hoursWorked = actualWorkingDays * 8;
    const cupsOfCoffee = actualWorkingDays * 2;
    const linesOfCode = actualWorkingDays * 80;
    const zoomHours = actualWorkingDays * 2;
    const emails = actualWorkingDays * 20;
  
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingInterval = setInterval(() => {
      setTypedText(currentPhrase.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      if (charIndex === currentPhrase.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCharIndex(0);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypedText("");
        }, 1500);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, [charIndex, phraseIndex]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const formatDate = () => new Date().toLocaleDateString("en-GB");

  const fullAboutText = [
    "I'm Nitish, a passionate Software Engineer and writer from India 🇮🇳. I craft web applications that blend functionality with beauty, using React and Spring Boot to build seamless full-stack experiences.",
    "",
    "But beyond code, I find magic in words. ✍️ When I’m not shaping components or designing APIs, I’m penning thoughts, weaving poems, and capturing fleeting moments through my blog.",
    "",
    "With an eye for clean architecture and a heart for meaningful expression, I believe software should not only work—it should feel right.",
    "",
    "“Between lines of code and lines of verse, I build and I write—both with intent.”"
  ];

  const [aboutTyped, setAboutTyped] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [aboutCharIndex, setAboutCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= fullAboutText.length) return;
    const line = fullAboutText[lineIndex];
    const currentLine = aboutTyped[lineIndex] || "";
    const interval = setInterval(() => {
      if (aboutCharIndex < line.length) {
        const updatedLine = currentLine + line[aboutCharIndex];
        setAboutTyped((prev) => {
          const newLines = [...prev];
          newLines[lineIndex] = updatedLine;
          return newLines;
        });
        setAboutCharIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setAboutCharIndex(0);
        }, 400);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [lineIndex, aboutCharIndex]);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <motion.section
  className="py-40 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-center px-4"
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <motion.img
    src={profileImage}
    alt="Nitish Kumar"
    className="w-32 h-32 rounded-full shadow-lg ring-4 ring-green-400 mb-4"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
  />
  <motion.h1
    className="text-4xl sm:text-5xl text-green-400 font-light"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    Nitish Kumar
  </motion.h1>
  <motion.p
    className="mt-2 text-sm text-gray-300 italic"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    writing what the silence hides ✍️
  </motion.p>
  <div className="flex justify-center mt-4 space-x-6 text-grey-400 text-xl">
    <a href="https://instagram.com/his_oblivion" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-transform">
      <FaInstagram />
    </a>
    <a href="https://twitter.com/IndiaStandsTall" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-transform">
      <FaTwitter />
    </a>
    <a href="https://linkedin.com/in/nitish-kumar-50755213a" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-transform">
      <FaLinkedin />
    </a>
    <a href="https://github.com/hisoblivion" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-transform">
      <FaGithub />
    </a>
  </div>
</motion.section>


      {/* About + Timeline */}
      <section className="flex flex-col gap-12 items-start justify-center px-6 md:px-20 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white md:flex-row">
        <motion.div
          className="md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-green-400">About Me</h2>
          {aboutTyped.map((line, idx) => (
            <p key={idx} className="text-gray-300 whitespace-pre-line">{line}</p>
          ))}
        </motion.div>

        <div className="md:w-1/2 w-full relative">
          <div className="border-l-2 border-green-500 absolute left-1/2 transform -translate-x-1/2 h-full z-0" />
          {[
  { year: 1998, role: "Born", company: "in Madhubani, Bihar", emoji: "👶" },
  { year: 2020, role: "Graduated", company: "from VIT", emoji: "🎓" },
  { year: 2020, role: "Intern", company: "at State Street", emoji: "💼" },
  { year: 2020, role: "Software Developer", company: "at State Street", emoji: "💻" },
  { year: 2025, role: "Senior Software Developer", company: "at MassMutual India", emoji: "🚀" },
].map((item, index) => (
  <motion.div
    key={index}
    className="relative flex items-center justify-between mb-12 w-full"
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="w-1/2 text-right pr-6">
      <p className="text-gray-400">{item.year}</p>
    </div>
    <div className="w-0 flex justify-center items-center z-10">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
        {item.emoji}
      </div>
    </div>
    <div className="w-1/2 text-left pl-6">
      <h3 className="text-white font-semibold">
        {item.role} <span className="text-green-400 font-normal">{item.company}</span>
      </h3>
    </div>
  </motion.div>
))}
        </div>
      </section>

      {/* What I Do */}
      <motion.section
        className="bg-gray-800 text-white py-16 px-6 md:px-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold mb-2">
          {typedText}<span className="text-green-400 animate-pulse">|</span>
        </h2>
        <p className="text-gray-400 uppercase tracking-wider mb-12">Imagine, develop & execute.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {["Web Dev & Design", "Backend Development", "Writing", "Stay Curious"].map((title, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-700 rounded-xl shadow-lg transition-transform"
            >
              <img src={`https://img.icons8.com/ios-filled/100/${["monitor", "server", "pen", "trophy"][i]}.png`} className="h-16 mx-auto" />
              <h3 className="text-lg font-semibold text-center mt-4">{title}</h3>
              <p className="text-sm text-gray-300 mt-2 text-center">
                {[
                  "Craft elegant UIs and CSS animations.",
                  "Build REST APIs and databases.",
                  "Write poems, fragments, and blogs.",
                  "Create joyfully and explore ideas."
                ][i]}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Yearly Stats */}
      <motion.section
        className="bg-gray-700 text-white py-14 px-6 md:px-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl mb-10 font-semibold">What 2025 has looked like for me…</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-sm text-white">
          {[
  { icon: "👤", label: "Hours worked", value: hoursWorked },
  { icon: "☕", label: "Cups of coffee", value: cupsOfCoffee },
  { icon: "💻", label: "Lines of code", value: linesOfCode },
  { icon: "👥", label: "Zoom hours", value: zoomHours },
  { icon: "✉️", label: "Emails", value: emails },
  { icon: "😊", label: "Fun days", value: funDays },
].map((item, i) => (
            <CountUpBox key={i} icon={item.icon} label={item.label} value={item.value} />
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-8">Updated: {formatDate()}</p>
      </motion.section>

      {/* Scroll to Top */}
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

function CountUpBox({ icon, value, label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const step = Math.max(Math.floor(duration / value), 10);
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-green-400 text-2xl mb-2">{icon}</span>
      <p className="text-xl font-bold underline underline-offset-4 decoration-green-400">{count}</p>
      <p className="text-sm text-gray-300 text-center mt-1">{label}</p>
    </div>
  );
}

export default About;

"use client";

import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen px-6 sm:px-10 py-16 bg-gradient-to-br from-slate-100 to-white flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-700 mb-10 text-center"
      >
        Contact Me
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-lg bg-white text-black p-8 rounded-2xl shadow-lg space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for your message! (Email service not connected yet)");
        }}
      >
        <div className="relative ">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Your Email"
            required
          />
        </div>

        <div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-transform hover:scale-105"
        >
          <FaPaperPlane /> Send Message
        </button>
      </motion.form>
    </div>
  );
}

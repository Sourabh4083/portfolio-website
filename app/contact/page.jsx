"use client";

import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen px-6 sm:px-10 py-16 bg-gradient-to-br from-[#0a0f1a] to-[#0a0a0a] flex flex-col items-center justify-center">

      
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-cyan-400 drop-shadow-lg mb-10 text-center"
      >
        Contact Me
      </motion.h1>

      
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);

          const form = e.target;
          const data = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
          };

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
              alert("Message sent successfully!");
              form.reset();
            } else {
              alert("Failed to send message.");
            }
          } catch (error) {
            alert("Server error! Try again.");
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 
        shadow-xl shadow-cyan-500/10 p-8 rounded-3xl space-y-6 
        hover:shadow-cyan-500/20 transition-all"
      >

        
        <div className="relative">
          <FaUser className="absolute top-3.5 left-4 text-gray-300" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 
            rounded-xl text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
            transition"
          />
        </div>

        
        <div className="relative">
          <FaEnvelope className="absolute top-3.5 left-4 text-gray-300" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 
            rounded-xl text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
            transition"
          />
        </div>

        
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl 
          text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
          transition"
        ></textarea>

        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all 
            ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed text-gray-300"
                : "bg-cyan-500 hover:bg-cyan-400 text-black hover:scale-105 shadow-md hover:shadow-cyan-400/40"
            }
          `}
        >
          <FaPaperPlane />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

      </motion.form>
    </div>
  );
}

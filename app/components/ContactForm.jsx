"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const inputClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setStatus({ type: "success", text: "Message sent! I'll get back to you soon." });
        form.reset();
      } else {
        setStatus({ type: "error", text: result.message || "Failed to send message." });
      }
    } catch {
      setStatus({ type: "error", text: "Server error! Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input type="text" name="name" placeholder="Your name" required maxLength={100} className={inputClass} />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input type="email" name="email" placeholder="you@company.com" required className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea name="message" rows={5} placeholder="Tell me about the role or project…" required maxLength={5000} className={inputClass} />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 transition"
      >
        <FaPaperPlane className="text-sm" />
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      {status && (
        <p role="status" className={`text-center text-sm ${status.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {status.text}
        </p>
      )}
    </form>
  );
}

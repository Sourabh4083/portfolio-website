"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCopy, FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import SectionHeading from "../SectionHeading";
import ContactForm from "../ContactForm";
import { profile } from "../../data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            index="04"
            label="Contact"
            title="Let's build something people rely on."
            intro="I'm open to full-time roles and freelance projects. The fastest way to reach me is email. I usually reply within a day."
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <button
              onClick={copyEmail}
              className="group flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-left hover:border-white/20 transition"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">Email</span>
                <span className="text-white">{profile.email}</span>
              </span>
              <span className="flex items-center gap-2 text-sm text-muted group-hover:text-white">
                {copied ? <><FaCheck className="text-emerald-400" /> Copied</> : <><FaCopy /> Copy</>}
              </span>
            </button>
            <div className="flex flex-wrap gap-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-gray-200 hover:border-white/20 transition">
                <FaLinkedin /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-gray-200 hover:border-white/20 transition">
                <FaGithub /> GitHub
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-gray-200 hover:border-white/20 transition">
                <FaFileAlt /> Resume
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:pt-24"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

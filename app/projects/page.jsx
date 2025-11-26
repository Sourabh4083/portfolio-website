"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "🏗️ D2E Construction – Modern Architecture Website",
      link: "https://d2e-construction.vercel.app/",
      description: [
        "Fully responsive construction + architecture website.",
        "Smooth animations, hero effects, and modern UI/UX.",
        "Project showcase, services, contact form and gallery.",
        "Built using Next.js and Tailwind CSS.",
        "SEO optimized + fast loading performance.",
      ],
    },
    {
      title: "🛒 ShopMate – Full Stack E-commerce Website",
      link: "https://e-commerce-nextjs-flax.vercel.app/",
      description: [
        "Built with Next.js 14, React, Node.js, MongoDB Atlas, and Tailwind CSS.",
        "Secure JWT authentication with HTTP-only cookies.",
        "Role-based access for users and admins.",
        "Razorpay integrated secure payments.",
        "Cloudinary CDN image upload system.",
        "Dynamic cart, order tracking, and protected API routes.",
        "Modern UI + mobile-optimized responsive design.",
      ],
    },
    {
      title: "💰 Donate-Me – Fundraising Web App",
      link: "https://donate-me-xi.vercel.app/",
      description: [
        "Donation platform built using MERN stack.",
        "Role-based authentication and campaign management.",
        "Live donation goal updates and analytics.",
        "Clean donor-friendly UI with validations and emails.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-gray-200 px-6 sm:px-10 py-20 relative overflow-hidden">

    
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.06),transparent_60%)]" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 blur-[150px]" />


      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-5xl font-extrabold mb-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
      >
        My Projects
      </motion.h1>

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="bg-white/10 backdrop-blur-xl border md:flex gap-8 border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-1"
          >
            <div className="md:w-1/2">

              
              <a
                href={project.link}
                target="_blank"
                className="block overflow-hidden rounded-2xl border border-white/10 hover:border-cyan-400 transition group mb-6"
              >
                <iframe
                  src={project.link}
                  className="w-full h-100 rounded-2xl  duration-500"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="md:w-1/2">

              
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                {project.title}
              </h2>

    
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2 mb-6">
                {project.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

      
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="inline-block mt-3 px-6 py-3 bg-blue-600 rounded-xl text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition"
                >
                  🌐 View Live Project
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

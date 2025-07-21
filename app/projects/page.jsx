"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "🛒 ShopMate – Full Stack E-commerce Website",
      link: "https://e-commerce-nextjs-flax.vercel.app/", 
      description: [
        "Built with Next.js 14, React, Node.js, MongoDB Atlas, and Tailwind CSS.",
        "Implemented full authentication system using JWT stored in HTTP-only cookies for security.",
        "Role-based access: users can shop, admins can manage products and orders.",
        "Razorpay payment integration with secure order flow and transaction confirmation.",
        "Image uploads handled via Cloudinary for fast CDN-based product image delivery.",
        "Dynamic cart system, user order history, protected API routes via middleware.",
        "Clean and responsive UI with modern animations and mobile-first design.",
      ],
    },
    {
      title: "💰 Donate-Me – Fundraising Web App",
      link: "https://donate-me-xi.vercel.app/", 
      description: [
        "Donation platform built using MERN stack for secure and scalable contribution flow.",
        "Authentication with role-based permission: users can donate, organizers can manage campaigns.",
        "Donation tracking, campaign analytics, and real-time updates for donation goals.",
        "Clean, donor-friendly UI with form validations and email confirmations.",
      ],
    },
  ];

  return (
    <div className="min-h-screen px-6 sm:px-10 py-16 bg-gradient-to-br from-white to-slate-100">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">
        My Projects
      </h1>

      <div className="max-w-5xl mx-auto space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {project.title}
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              {project.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            {project.link !== "#" && (
              <Link
                href={project.link}
                target="_blank"
                className="inline-block mt-2 px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-transform hover:scale-105"
              >
                🌐 View Live Project
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

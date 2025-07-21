"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Sourabh Prasad";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4">
      <div className="backdrop-blur-lg bg-white/5 p-10 rounded-2xl shadow-2xl max-w-2xl text-center border border-white/10">
        <div className="flex flex-col items-center">
          
          <Image
            src="/profile.jpg" 
            alt="Sourabh Prasad"
            width={200}
            height={200}
            className="rounded-full border-4 border-blue-500 mb-4"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse">
            {text}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">
            Full Stack Developer | React, Next.js, Node, MongoDB
          </p>
          <a
            href="/projects"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            🚀 View My Work
          </a>
        </div>
      </div>
    </main>
  );
}

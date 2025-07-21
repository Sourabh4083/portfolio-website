import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen px-6 sm:px-10 py-16 bg-gradient-to-br from-slate-100 to-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700">
          About Me
        </h1>

    
        <section className="mb-10 text-center">
          <p className="text-lg sm:text-xl leading-relaxed">
            I'm <span className="font-semibold text-blue-700">Sourabh Prasad</span>, a passionate{" "}
            <strong className="text-blue-600">Full Stack Developer</strong> with a deep love for crafting modern, scalable, and performance-driven web applications. I specialize in building full-stack apps using the <strong>Next.js</strong> framework, backed by a powerful MongoDB database and topped with seamless UI/UX using Tailwind CSS.
          </p>
        </section>

    
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">🚀 Tech Stack</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-lg font-medium text-gray-700">
            <li>Next.js</li>
            <li>React</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>Tailwind CSS</li>
            <li>Razorpay</li>
            <li>Cloudinary</li>
            <li>JWT Auth</li>
            <li>REST APIs</li>
          </ul>
        </section>

        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">💼 Latest Project: Full-Stack E-commerce Website</h2>
          <p className="leading-loose text-gray-700 mb-4">
            I recently built a <strong>fully functional, modern e-commerce platform</strong> using the MERN stack (MongoDB, Express.js, React, Node.js) with <strong>Next.js</strong> at the core. It features a smooth user experience with secure authentication (JWT + HTTP-only cookies), an admin dashboard, product management, dynamic cart, order tracking, and integrated payments via <strong>Razorpay</strong>. I also implemented <strong>image uploads</strong> using <strong>Cloudinary</strong>, and all product, cart, and order data is stored and managed in <strong>MongoDB Atlas</strong>.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Dynamic product listings with filtering and sorting</li>
            <li>Secure user login/register with token-based auth</li>
            <li>Admin-only access to manage products and view orders</li>
            <li>Razorpay payment gateway integration</li>
            <li>Cloudinary for image uploads</li>
            <li>Protected routes using middleware and role-based access</li>
          </ul>
          <Link
            href="/projects"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform hover:scale-105"
          >
            🔍 Explore Project Details
          </Link>
        </section>

    
        <section className="text-center mt-16">
          <p className="text-lg mb-4">Want to collaborate or learn more?</p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              📬 Contact Me
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-6 py-3 border border-blue-500 text-blue-600 font-semibold rounded-md hover:bg-blue-100 transition"
            >
              📄 Download Resume
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";


export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center space-x-6 text-sm sm:text-base font-medium text-gray-800">
        <Link
          href="/"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          About
        </Link>
        <Link
          href="/projects"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Contact
        </Link>

       <div className="flex space-x-4 text-xl">
        <a
          href="https://github.com/Sourabh4083"  
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black text-gray-700 transition hover:scale-110"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sourabh-prasad-58b5541a1/" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 text-gray-700 transition hover:scale-110"
          >
          <FaLinkedin />
        </a>
            </div>
      </div>
    </nav>
  );
}

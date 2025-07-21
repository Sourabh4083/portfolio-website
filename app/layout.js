import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Protfolio",
  description: "Personal developer protfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-white text-black dark:bg-gray-900 dark:text-white"
      >
        <Navbar />
        <main className="pt-20">{children}</main>

      </body>
    </html>
  );
}

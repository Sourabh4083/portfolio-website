import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { profile } from "./data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Sourabh Prasad, full stack developer. I build production software with Next.js, React, TypeScript, Node.js, PostgreSQL and MongoDB, including an ERP in daily client use.";

export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: "Sourabh Prasad | Full Stack Developer",
    template: "%s | Sourabh Prasad",
  },
  description,
  openGraph: {
    title: "Sourabh Prasad | Full Stack Developer",
    description,
    url: "/",
    siteName: "Sourabh Prasad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourabh Prasad | Full Stack Developer",
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}

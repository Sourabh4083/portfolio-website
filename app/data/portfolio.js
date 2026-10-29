// Single source of truth for everything shown on the site.

export const profile = {
  name: "Sourabh Prasad",
  role: "Full Stack Developer",
  location: "Chhattisgarh, India",
  email: "sourabhprasad602@gmail.com",
  resume: "/resume.pdf",
  // Set NEXT_PUBLIC_SITE_URL in production; Vercel's own domain is the fallback.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  github: "https://github.com/Sourabh4083",
  linkedin: "https://www.linkedin.com/in/sourabh-prasad-58b5541a1/",
  headline: "I build production software that businesses run on.",
  rotating: ["ERP systems", "e-commerce platforms", "AI content pipelines", "secure full-stack apps"],
  summary:
    "Full stack developer working across Next.js, React, Node.js, TypeScript, PostgreSQL and MongoDB. I ship complete products end to end, from the database schema and auth to the last pixel, including an ERP that a client business uses every day.",
};

export const stats = [
  { value: 2, suffix: "", label: "Business clients served" },
  { value: 21, suffix: "", label: "Database models designed" },
  { value: 180, suffix: "+", label: "Integration tests written" },
  { value: 5, suffix: "+", label: "Products shipped" },
];

export const projects = [
  {
    slug: "salon-erp",
    title: "Salon ERP",
    subtitle: "Inventory, billing & business management system",
    tagline:
      "A full ERP for a salon & wig shop, used daily at the counter on phone, tablet and PC.",
    badge: "Live client project",
    period: "Sep 2026 – Present",
    role: "Sole developer: design, backend, frontend, testing, deployment",
    live: "https://salon-inventory-three.vercel.app/",
    github: "https://github.com/Sourabh4083/salon_inventory",
    image: "/projects/salon-erp/desktop.png",
    accent: "from-cyan-400 to-violet-500",
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind", "Zod", "Vitest"],
    highlights: [
      "Inventory, billing, purchasing, HR and finance in one app",
      "Stock ledger with row-locked transactions: no overselling",
      "Owner / Manager roles enforced on the server",
      "180+ integration tests against real PostgreSQL",
    ],
    caseStudy: {
      problem:
        "The shop tracked stock, bills, staff attendance and expenses across notebooks and spreadsheets. Stock counts drifted, unpaid balances were forgotten, and the owner had no reliable view of daily sales or profit.",
      solution:
        "I designed and built a complete back-office ERP: an inventory with a full movement ledger, a counter-friendly billing flow, purchase orders, staff and payroll tools, lead tracking and owner-only reports. It runs on Vercel with Supabase PostgreSQL and is used by the client every day.",
      features: [
        { title: "Inventory & stock ledger", text: "Auto-numbered products with SKU and barcode, low/out-of-stock screens, and a ledger entry for every quantity change: sale, stock in, adjustment, cancellation or edit." },
        { title: "Counter billing", text: "Scan or search products, add salon services, split payment across Cash / UPI / Card, keep bills open while the customer is in the chair, and print 80 mm thermal receipts." },
        { title: "Pay later", text: "Partial payments with tracked balances, collected over one or more later visits." },
        { title: "Purchasing", text: "Purchase orders with partial deliveries; stock rises only when items are received." },
        { title: "Staff & payroll", text: "Attendance (present, half day, leave, holiday) feeding automatic pay-cut calculation, salary log, cash advances and document uploads." },
        { title: "Reports & export", text: "Sales, product vs service income, gross profit, expenses and top sellers, with one-click Excel export." },
      ],
      architecture: [
        { label: "Browser", note: "Responsive UI, camera barcode scanner" },
        { label: "Route proxy", note: "Blocks anonymous & owner-only paths" },
        { label: "Server Actions", note: "Zod validation + permission check" },
        { label: "Service layer", note: "All business rules, transactions, audit log" },
        { label: "Prisma → PostgreSQL", note: "21 models, sequences, row locks" },
      ],
      challenges: [
        { title: "Two sales of the last unit at the same time", text: "Every stock change runs in a transaction that locks the product row, re-reads the quantity and writes exactly one ledger entry, so concurrent sales can never push stock below zero. Covered by dedicated concurrency tests." },
        { title: "Money that never drifts", text: "All amounts are calculated in integer paise, and each bill stores a snapshot of names, prices and costs, so later catalogue changes never rewrite history or reports." },
        { title: "A manager must never see cost prices", text: "Permissions live in one role matrix, enforced in every page and action. Cost fields are stripped on the server before data reaches a manager's browser; hidden buttons are only a convenience." },
        { title: "Correct days across timezones", text: "Every timestamp is stored as timestamptz in UTC and all reporting boundaries are computed in Asia/Kolkata, so 'today's sales' is right regardless of where the server runs." },
      ],
      results: [
        "In daily production use by the client since September 2026",
        "Replaced paper registers and spreadsheets for stock, billing and payroll",
        "183 automated tests covering auth, permissions, billing and concurrency",
      ],
    },
  },
  {
    slug: "shopmate",
    title: "ShopMate",
    subtitle: "Full-stack e-commerce platform",
    tagline: "Storefront and admin panel built from scratch, with real payments and media uploads.",
    badge: "E-commerce",
    period: "2025",
    role: "Full-stack developer",
    live: "https://e-commerce-nextjs-flax.vercel.app/",
    github: "https://github.com/Sourabh4083/E-commerce-nextjs",
    image: "/projects/shopmate/desktop.png",
    accent: "from-violet-400 to-fuchsia-500",
    stack: ["Next.js 14", "Node.js", "MongoDB", "Razorpay", "Cloudinary", "Tailwind"],
    highlights: [
      "JWT auth with HTTP-only cookies",
      "Razorpay checkout and Cloudinary uploads",
      "Admin dashboard with role-based access",
    ],
    caseStudy: {
      problem:
        "Small sellers need a store they fully own: product management, secure accounts and real online payments, without a monthly platform fee.",
      solution:
        "A complete storefront and admin panel on Next.js and MongoDB, with secure authentication, a persistent cart, Razorpay payments and Cloudinary-hosted product images.",
      features: [
        { title: "Secure accounts", text: "JWT authentication stored in HTTP-only cookies, with role-based access enforced in Next.js middleware." },
        { title: "Cart that follows you", text: "Guest carts merge into the user's cart on login, so nothing is lost at checkout." },
        { title: "Payments", text: "Razorpay checkout with server-side order creation and verification." },
        { title: "Admin panel", text: "Product CRUD with Cloudinary image uploads, order management and status tracking." },
      ],
      architecture: [
        { label: "Next.js storefront", note: "Product listing, search, cart, checkout" },
        { label: "Middleware", note: "Role-based route protection" },
        { label: "API routes", note: "Auth, products, orders, payments" },
        { label: "MongoDB + Cloudinary", note: "Data and image CDN" },
      ],
      challenges: [
        { title: "Guest-to-user cart sync", text: "Carts built before login are merged with the saved cart on sign-in, de-duplicating items and keeping quantities correct." },
        { title: "Trusting payments", text: "Orders are created on the server and Razorpay signatures are verified before an order is marked paid, so the client can't fake a payment." },
      ],
      results: ["Deployed on Vercel and fully usable end to end", "Mobile-first responsive design"],
    },
  },
  {
    slug: "d2e-construction",
    title: "D2E Construction",
    subtitle: "Corporate web platform",
    tagline: "A responsive corporate site with parallax hero animation and interactive service panels.",
    badge: "Client website",
    period: "2025",
    role: "Frontend developer",
    live: "https://d2e-construction.vercel.app/",
    github: "https://github.com/Sourabh4083/d2e_construction",
    image: "/projects/d2e-construction/desktop.png",
    accent: "from-amber-300 to-orange-500",
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    highlights: ["Parallax hero animation", "Project gallery & services", "Downloadable Excel takeoff summaries"],
  },
  {
    slug: "donate-me",
    title: "Donate-Me",
    subtitle: "Fundraising web app",
    tagline: "A donation platform with campaign management and live goal tracking.",
    badge: "MERN",
    period: "2025",
    role: "Full-stack developer",
    live: "https://donate-me-xi.vercel.app/",
    image: "/projects/donate-me/desktop.png",
    accent: "from-emerald-300 to-teal-500",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    highlights: ["Role-based authentication", "Live donation goals", "Campaign management"],
  },
];

export const experience = [
  {
    role: "Full Stack Developer (Freelance)",
    company: "Self-employed",
    period: "Aug 2025 – Present",
    points: [
      "Built and deployed full-stack apps for business clients, including the Salon ERP in daily production use.",
      "Automated 100% of contact-form processing with n8n into a central Google Sheets repository.",
      "Built a notification system with 99.9% delivery reliability using retries and instant auto-replies.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Omokai",
    period: "Feb 2026 – Aug 2026",
    points: [
      "Built an AI blog-generation system on the GLM-5.2 (Z.ai) API with multi-step orchestration.",
      "Wrote and iteratively tuned the prompts behind the pipeline for consistent article quality.",
      "Developed scheduled content automation for Reddit and X (Twitter).",
    ],
  },
  {
    role: "B.Tech, Information Technology",
    company: "Shri Shankaracharya Technical Campus, Bhilai",
    period: "2018 – 2022",
    points: ["CGPA 7.3"],
  },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "React Hook Form"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Server Actions", "JWT / OAuth", "NextAuth", "Zod", "RBAC"] },
  { group: "Databases", items: ["PostgreSQL", "Prisma", "MongoDB", "Mongoose", "Supabase"] },
  { group: "Testing & DevOps", items: ["Vitest", "Integration testing", "Git", "Vercel", "Cloudinary", "Razorpay"] },
  { group: "AI & Automation", items: ["Prompt engineering", "LLM orchestration", "n8n", "Google Sheets API"] },
];

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

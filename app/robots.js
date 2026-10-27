import { profile } from "./data/portfolio";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}

import { profile, projects } from "./data/portfolio";

export default function sitemap() {
  const pages = ["", "/about", "/projects", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];
  return pages.map((path) => ({ url: `${profile.siteUrl}${path}`, lastModified: new Date() }));
}

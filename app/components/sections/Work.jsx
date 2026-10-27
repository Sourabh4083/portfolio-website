import SectionHeading from "../SectionHeading";
import ProjectCard from "../ProjectCard";
import { projects } from "../../data/portfolio";

export default function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-20 mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading
        index="01"
        label="Selected work"
        title="Things I've built and shipped"
        intro="Real products with real users, from a live ERP running a business every day to full e-commerce with payments. Each one has a write-up of the decisions behind it."
      />
      <div className="grid gap-6">
        <ProjectCard project={featured} featured />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

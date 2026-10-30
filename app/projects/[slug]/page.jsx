import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../../data/portfolio";
import ScreenshotSlider from "../../components/ScreenshotSlider";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} – ${project.subtitle}`,
    description: project.tagline,
    openGraph: { images: [project.image] },
  };
}

function Block({ label, title, children }) {
  return (
    <section className="py-12 border-t border-line">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
      {title && <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h2>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const cs = project.caseStudy;

  return (
    <article className="mx-auto max-w-4xl px-5 sm:px-8 pt-14 pb-24">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition">
        <FaArrowLeft className="text-xs" /> All work
      </Link>

      {/* header */}
      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{project.badge}</p>
        <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tight text-white">{project.title}</h1>
        <p className="mt-3 text-xl text-muted">{project.subtitle}</p>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl">{project.tagline}</p>

        <dl className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Role</dt>
            <dd className="mt-1 text-gray-200">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Timeline</dt>
            <dd className="mt-1 text-gray-200">{project.period}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Links</dt>
            <dd className="mt-1 flex gap-4">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white hover:text-accent">
                  Live site <FaExternalLinkAlt className="text-[10px]" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white hover:text-accent">
                  <FaGithub /> Code
                </a>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-gray-300">
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* screenshots in a browser frame */}
      {project.screenshots ? (
        <ScreenshotSlider shots={project.screenshots} url={project.live} title={project.title} />
      ) : (
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-[#0b0b18] shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            {project.live && (
              <span className="ml-4 truncate font-mono text-[11px] text-muted">{project.live.replace(/^https?:\/\//, "")}</span>
            )}
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={project.image} alt={`${project.title} screenshot`} fill priority sizes="(min-width: 896px) 832px, 100vw" className="object-cover object-top" />
          </div>
        </div>
      )}

      {cs ? (
        <>
          <Block label="The problem" title="Why it needed to exist">
            <p className="text-gray-300 leading-relaxed text-lg">{cs.problem}</p>
          </Block>

          <Block label="The solution" title="What I built">
            <p className="text-gray-300 leading-relaxed text-lg">{cs.solution}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cs.features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-line bg-surface p-5">
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Architecture" title="How a request flows">
            <ol className="flex flex-col md:flex-row md:items-stretch gap-2">
              {cs.architecture.map((step, i) => (
                <li key={step.label} className="flex md:flex-1 flex-col md:flex-row items-center gap-2">
                  <div className="w-full h-full rounded-xl border border-line bg-surface p-4 text-center">
                    <p className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{step.label}</p>
                    <p className="mt-1 text-xs text-muted leading-snug">{step.note}</p>
                  </div>
                  {i < cs.architecture.length - 1 && (
                    <span aria-hidden className="text-muted rotate-90 md:rotate-0">→</span>
                  )}
                </li>
              ))}
            </ol>
          </Block>

          <Block label="Hard problems" title="Engineering decisions that mattered">
            <div className="space-y-4">
              {cs.challenges.map((c, i) => (
                <div key={c.title} className="grid gap-2 sm:grid-cols-[3rem_1fr] rounded-2xl border border-line bg-surface p-6">
                  <span className="font-mono text-2xl font-semibold bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-gray-300 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Results" title="Outcome">
            <ul className="space-y-3">
              {cs.results.map((r) => (
                <li key={r} className="flex gap-3 text-lg text-gray-200">
                  <span className="text-emerald-400">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </Block>
        </>
      ) : (
        <Block label="Highlights">
          <ul className="space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-lg text-gray-200">
                <span className="text-accent">→</span>
                {h}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* next project */}
      <Link
        href={`/projects/${next.slug}`}
        className="group mt-8 flex items-center justify-between rounded-2xl border border-line bg-surface p-6 hover:border-white/20 transition"
      >
        <span>
          <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">Next project</span>
          <span className="mt-1 block text-xl font-semibold text-white">{next.title}</span>
        </span>
        <FaArrowRight className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-white" />
      </Link>
    </article>
  );
}

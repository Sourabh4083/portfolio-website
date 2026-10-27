"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaCopy,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
  FaFolderOpen,
  FaHome,
} from "react-icons/fa";
import { profile, projects, sections } from "../data/portfolio";
import { OPEN_PALETTE_EVENT } from "./openCommandPalette";

const HINT_KEY = "palette-hint-seen";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);

    // one-time hint for new visitors on larger screens
    let hintTimer;
    try {
      if (!localStorage.getItem(HINT_KEY) && window.matchMedia("(min-width: 768px)").matches) {
        hintTimer = setTimeout(() => {
          showToast("Tip: press Ctrl K to jump anywhere");
          localStorage.setItem(HINT_KEY, "1");
        }, 4000);
      }
    } catch {}

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
      clearTimeout(hintTimer);
    };
  }, [showToast]);

  const run = (fn) => {
    setOpen(false);
    fn();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast(`Copied ${profile.email}`);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const itemClass =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 cursor-pointer data-[selected=true]:bg-white/[0.07] data-[selected=true]:text-white";

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        overlayClassName="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[18vh] z-[61] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-[#0b0b18] shadow-2xl shadow-cyan-500/10"
      >
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-[15px] text-white placeholder:text-muted outline-none"
        />
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No results.</Command.Empty>

          <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted">
            <Command.Item className={itemClass} onSelect={() => run(() => router.push("/"))}>
              <FaHome className="text-muted" /> Home
            </Command.Item>
            {sections.map(({ id, label }) => (
              <Command.Item key={id} className={itemClass} onSelect={() => run(() => router.push(`/#${id}`))}>
                <FaArrowRight className="text-muted" /> {label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Case studies" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted">
            {projects.map((p) => (
              <Command.Item
                key={p.slug}
                value={`${p.title} ${p.subtitle}`}
                className={itemClass}
                onSelect={() => run(() => router.push(`/projects/${p.slug}`))}
              >
                <FaFolderOpen className="text-muted" />
                {p.title}
                <span className="ml-auto text-xs text-muted">{p.subtitle}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted">
            <Command.Item className={itemClass} onSelect={() => run(copyEmail)}>
              <FaCopy className="text-muted" /> Copy email address
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => run(() => window.open(profile.resume, "_blank"))}>
              <FaFileDownload className="text-muted" /> Open resume
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => run(() => window.open(profile.github, "_blank"))}>
              <FaGithub className="text-muted" /> GitHub
            </Command.Item>
            <Command.Item className={itemClass} onSelect={() => run(() => window.open(profile.linkedin, "_blank"))}>
              <FaLinkedin className="text-muted" /> LinkedIn
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-line bg-[#0b0b18]/95 px-4 py-2 text-sm text-gray-200 shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    { label: "GitHub", href: "https://github.com" },
    { label: "Instagram", href: "https://www.instagram.com/nmiumii" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yukari-nemoto-15978a256" },
    { label: "Facebook", href: "https://www.facebook.com/share/1JNUJGp3En/" },
  ];

  const collaborationAvenues = [
    {
      title: "Web & Application Systems",
      desc: "Custom web applications, relational database schemas, and clean responsive interfaces.",
      skills: ["Next.js", "TypeScript", "SQL/PostgreSQL"],
    },
    {
      title: "Business Intelligence & Analytics",
      desc: "Interactive dashboards, DAX metric calculations, and automated data workflows.",
      skills: ["Power BI", "DAX", "Data Modeling"],
    },
    {
      title: "Creative Direction & Media",
      desc: "Visual branding, portrait photography, and digital post-production.",
      skills: ["Photoshop", "Lightroom", "UI Design"],
    },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative isolate min-h-[80vh] overflow-hidden bg-page px-4 py-10 text-ink sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.05)_1px,transparent_1px)] bg-[size:26px_26px] opacity-80"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* LEFT: Main Hero Statement & Direct Actions */}
          <div className="rounded-[28px] border border-line bg-card p-6 text-ink shadow-[0_18px_60px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue">
                <Sparkles className="size-3.5" strokeWidth={2} />
                Open for project work
              </div>

              <h1 className="mt-6 max-w-xl font-display text-[clamp(2.25rem,9vw,3rem)] font-black leading-[0.92] tracking-[-0.05em] text-ink text-balance sm:text-5xl lg:text-[4.2rem]">
                Build the signal.
                <span className="mt-2 block text-blue">Ship the system.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                I help turn complex requirements into thoughtful products: data dashboards, web tools,
                and digital interfaces that are clean, resilient, and built to scale.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 font-display text-base font-bold text-sidebar transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Send className="size-4" />
                  <span>Send an email</span>
                </a>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-2xl border border-line bg-card/80 px-6 py-3.5 font-medium text-ink transition-colors duration-200 hover:border-blue hover:bg-tile"
                >
                  Explore background
                </Link>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-line/70">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
                Connect Directly
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted">
                {socialLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-tile px-3 py-1.5 text-xs font-semibold text-ink transition-all duration-200 hover:border-blue hover:text-blue"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="size-3 text-muted group-hover:text-blue" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Bespoke Direct Communication Dossier */}
          <aside className="space-y-4">
            {/* Primary Communication Card */}
            <div className="rounded-[28px] border border-line bg-card p-6 text-ink shadow-[0_18px_50px_rgba(15,23,42,0.1)] relative overflow-hidden space-y-6">
              {/* Subtle ambient lighting */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-blue/10 blur-2xl"
              />

              {/* Header: Label + Live Status */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  DIRECT CONTACT
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              {/* Email & 1-Click Copy Box */}
              <div className="relative z-10 rounded-2xl border border-line bg-tile/70 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold uppercase text-muted">
                    PRIMARY INBOX
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-muted">
                    <Clock className="size-3 text-brown" />
                    <span>~24h response</span>
                  </div>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="block break-all font-mono text-base sm:text-lg font-bold text-ink transition-colors hover:text-blue"
                >
                  {profile.email}
                </a>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-1.5 font-mono text-xs font-semibold text-ink transition-all duration-200 hover:border-blue hover:text-blue"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied to clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5 text-muted" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-1.5 font-mono text-xs font-semibold text-muted transition-colors hover:text-ink hover:border-line"
                  >
                    <Mail className="size-3.5" />
                    <span>Open Mail</span>
                  </a>
                </div>
              </div>

              {/* Location & Timezone Chip */}
              <div className="relative z-10 flex items-center justify-between text-xs text-muted border-y border-line/60 py-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-brown shrink-0" />
                  <span>Bulacan, Philippines</span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-ink/80">
                  GMT+8 (PHT)
                </span>
              </div>

              {/* Collaboration Avenues */}
              <div className="relative z-10 space-y-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                  Focus &amp; Capabilities
                </p>

                <div className="space-y-2.5">
                  {collaborationAvenues.map((ave) => (
                    <div
                      key={ave.title}
                      className="rounded-xl border border-line/80 bg-tile/40 p-3 transition-colors hover:bg-tile/80 hover:border-blue/30"
                    >
                      <h4 className="font-display text-xs font-bold text-ink">
                        {ave.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                        {ave.desc}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {ave.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-line bg-card px-1.5 py-0.5 font-mono text-[9px] font-medium text-ink"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-line pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
            <p>© 2026 Yukari Tenshi Nemoto. All rights reserved.</p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:border-blue hover:bg-tile"
            >
              <ArrowUp className="size-4" strokeWidth={2} />
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

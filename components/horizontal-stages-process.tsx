"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StageItem {
  id: string;
  step: string;
  fraction: string;
  phase: string;
  title: string;
  narrative: string;
  tags: string[];
  graphicBadge: string;
  graphicSub: string;
  renderGraphic: () => React.ReactNode;
}

const stagesData: StageItem[] = [
  {
    id: "discovery",
    step: "01",
    fraction: "01 / 05",
    phase: "Discovery & Scope",
    title: "Listen",
    narrative:
      "Find the real problem, not just the request, before anything gets built.",
    tags: ["Signal Check", "User Framing", "Goal Clarity"],
    graphicBadge: "LISTEN",
    graphicSub: "ROOT // CAUSE",
    renderGraphic: () => (
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Radar concentric rings */}
        <circle cx="190" cy="120" r="90" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
        <circle cx="190" cy="120" r="65" stroke="currentColor" strokeOpacity="0.18" />
        <circle cx="190" cy="120" r="40" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="190" cy="120" r="16" stroke="currentColor" strokeOpacity="0.35" />
        {/* Crosshairs */}
        <line x1="80" y1="120" x2="300" y2="120" stroke="currentColor" strokeOpacity="0.12" />
        <line x1="190" y1="20" x2="190" y2="220" stroke="currentColor" strokeOpacity="0.12" />
        {/* Radar sweep beam */}
        <path
          d="M 190 120 L 126 56 A 90 90 0 0 1 190 30 Z"
          fill="url(#radar-sweep)"
          opacity="0.35"
        />
        {/* Detected signal blips */}
        <circle cx="150" cy="80" r="3" fill="#38BDF8" />
        <circle cx="230" cy="150" r="2.5" fill="#38BDF8" opacity="0.8" />
        <circle cx="160" cy="170" r="2" fill="#e2e8f0" opacity="0.6" />
        {/* Signal labels in plate */}
        <text x="240" y="45" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">SIGNAL</text>
        <line x1="240" y1="52" x2="275" y2="52" stroke="currentColor" strokeOpacity="0.25" />
        <text x="240" y="180" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">PATTERN</text>
        <defs>
          <linearGradient id="radar-sweep" x1="190" y1="120" x2="135" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "architecture",
    step: "02",
    fraction: "02 / 05",
    phase: "Architecture & Modeling",
    title: "Shape",
    narrative:
      "Map the logic, flows, and rules so the system can scale without confusion.",
    tags: ["Info Map", "KPI Logic", "Flow Design"],
    graphicBadge: "MAP",
    graphicSub: "SYSTEM // FLOW",
    renderGraphic: () => (
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Folded Map Iso Curves */}
        <path
          d="M 60 70 L 140 45 L 230 75 L 310 50 L 310 185 L 230 210 L 140 180 L 60 205 Z"
          stroke="currentColor"
          strokeOpacity="0.18"
          fill="none"
        />
        <line x1="140" y1="45" x2="140" y2="180" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="2 2" />
        <line x1="230" y1="75" x2="230" y2="210" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="2 2" />
        {/* Waypoint route line */}
        <path
          d="M 90 160 Q 150 140 180 90 T 260 130 T 290 85"
          stroke="#F59E0B"
          strokeOpacity="0.75"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
        />
        {/* Waypoint nodes */}
        <circle cx="90" cy="160" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#121212" />
        <circle cx="180" cy="90" r="5" stroke="#F59E0B" strokeWidth="1.5" fill="#121212" />
        <circle cx="180" cy="90" r="2" fill="#F59E0B" />
        <circle cx="260" cy="130" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#121212" />
        <circle cx="290" cy="85" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#121212" />
        <text x="75" y="45" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">TOPOLOGY</text>
      </svg>
    ),
  },
  {
    id: "development",
    step: "03",
    fraction: "03 / 05",
    phase: "Engineering & Analytics",
    title: "Build",
    narrative:
      "Turn the plan into working tools, dashboards, and interfaces with momentum.",
    tags: ["Next.js", "Data Layer", "Interface Build"],
    graphicBadge: "BUILD",
    graphicSub: "SPRINT // LIVE",
    renderGraphic: () => (
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* IDE / Terminal Window Frame */}
        <rect x="70" y="35" width="260" height="160" rx="8" stroke="currentColor" strokeOpacity="0.22" fill="none" />
        <line x1="70" y1="62" x2="330" y2="62" stroke="currentColor" strokeOpacity="0.15" />
        {/* Window dots */}
        <circle cx="86" cy="48" r="2.5" fill="#ef4444" opacity="0.8" />
        <circle cx="96" cy="48" r="2.5" fill="#eab308" opacity="0.8" />
        <circle cx="106" cy="48" r="2.5" fill="#22c55e" opacity="0.8" />
        <text x="125" y="52" fill="currentColor" fillOpacity="0.35" fontSize="8" fontFamily="monospace">src/analytics/pipeline.ts</text>
        {/* Code brackets and syntax blocks */}
        <path d="M 105 110 L 90 125 L 105 140" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 125 110 L 140 125 L 125 140" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stylized code lines */}
        <rect x="160" y="105" width="130" height="4" rx="2" fill="currentColor" fillOpacity="0.35" />
        <rect x="160" y="118" width="95" height="4" rx="2" fill="#38BDF8" fillOpacity="0.5" />
        <rect x="160" y="131" width="115" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />
        <rect x="160" y="144" width="70" height="4" rx="2" fill="#F59E0B" fillOpacity="0.5" />
        <text x="75" y="182" fill="currentColor" fillOpacity="0.4" fontSize="8" fontFamily="monospace" letterSpacing="0.1em">SPRINT / ACTIVE</text>
      </svg>
    ),
  },
  {
    id: "testing",
    step: "04",
    fraction: "04 / 05",
    phase: "Quality Audit & Testing",
    title: "Check",
    narrative:
      "Pressure-test the experience, logic, and edge cases before it goes live.",
    tags: ["QA Pass", "Data Checks", "Edge Review"],
    graphicBadge: "VERIFY",
    graphicSub: "TRUTH // DELTA",
    renderGraphic: () => (
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Precision Crosshair Target Dial */}
        <circle cx="190" cy="115" r="75" stroke="currentColor" strokeOpacity="0.12" />
        <circle cx="190" cy="115" r="50" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="3 3" />
        <circle cx="190" cy="115" r="28" stroke="#10B981" strokeOpacity="0.5" strokeWidth="1.5" />
        {/* Crosshair lines */}
        <line x1="85" y1="115" x2="295" y2="115" stroke="currentColor" strokeOpacity="0.12" />
        <line x1="190" y1="20" x2="190" y2="210" stroke="currentColor" strokeOpacity="0.12" />
        {/* Verification Checkmark */}
        <path
          d="M 180 115 L 187 122 L 202 107"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="210" y="45" fill="#10B981" fillOpacity="0.75" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">PASS // 100%</text>
        <line x1="210" y1="50" x2="265" y2="50" stroke="#10B981" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: "deployment",
    step: "05",
    fraction: "05 / 05",
    phase: "Deployment & Delivery",
    title: "Ship",
    narrative:
      "Deliver clean, documented, and ready-to-use outcomes with no black-box handoff.",
    tags: ["Launch Ready", "Handoff", "Production Flow"],
    graphicBadge: "LAUNCH",
    graphicSub: "READY // LIVE",
    renderGraphic: () => (
      <svg
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Global Edge Network Sphere */}
        <ellipse cx="190" cy="130" rx="90" ry="40" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 3" />
        <ellipse cx="190" cy="130" rx="60" ry="22" stroke="currentColor" strokeOpacity="0.25" />
        {/* Orbital rays */}
        <path d="M 130 130 C 130 90, 250 90, 250 130" stroke="#a855f7" strokeOpacity="0.4" strokeDasharray="3 3" fill="none" />
        {/* Rocket / Ascending Probe Icon */}
        <path
          d="M 190 40 L 198 65 L 194 75 L 190 70 L 186 75 L 182 65 Z"
          fill="#a855f7"
          opacity="0.9"
        />
        <path
          d="M 190 73 L 193 84 L 190 88 L 187 84 Z"
          fill="#f59e0b"
          opacity="0.9"
        />
        {/* Pulse beacon */}
        <circle cx="190" cy="130" r="4" fill="#a855f7" />
        <circle cx="190" cy="130" r="10" stroke="#a855f7" strokeOpacity="0.4" />
        <text x="220" y="45" fill="currentColor" fillOpacity="0.4" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">EDGE // 200 OK</text>
      </svg>
    ),
  },
];

export function HorizontalStagesProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        return Math.max(0, track.scrollWidth - container.clientWidth);
      };

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          id: "stages-scroll-trigger",
          trigger: section,
          start: "top 80px",
          end: () => `+=${getDistance() + 600}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const idx = Math.min(
              stagesData.length - 1,
              Math.max(0, Math.floor(p * stagesData.length))
            );
            setActiveStageIndex(idx);
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  // Programmatic scroll to a specific stage index (syncs with ScrollTrigger)
  const scrollToStage = (index: number) => {
    const st = ScrollTrigger.getById("stages-scroll-trigger");
    if (st && typeof window !== "undefined") {
      const progress = index / (stagesData.length - 1);
      const targetScroll = st.start + progress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    const nextIndex = Math.max(0, activeStageIndex - 1);
    scrollToStage(nextIndex);
  };

  const scrollNext = () => {
    const nextIndex = Math.min(stagesData.length - 1, activeStageIndex + 1);
    scrollToStage(nextIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="horizontal-stages-section"
      className="relative my-8 sm:my-14 overflow-hidden border-0 bg-transparent will-change-transform"
    >
      {/* Technical Blueprint Grid Pattern Background (Matching Reference) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        aria-hidden
      />

      <div className="relative p-0 sm:p-2 lg:p-4">
        {/* MAIN SPLIT GRID: Left Anchor + Right Horizontal Track */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT ANCHOR: Process Header, Narrative & Actions (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-tile/70 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-muted">
                <span>Our Process: Discovery to Launch</span>
              </div>

              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.08]">
                Five stages, first question to launch.
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-muted leading-relaxed">
                Every project follows a disciplined five-stage cycle: discovery, architecture,
                development, validation, and deployment. No black box: you always know which
                stage we are in and what comes next.
              </p>
            </div>

            {/* CTA & Scroll Guide Controls */}
            <div className="pt-2 space-y-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:text-blue transition-colors"
              >
                <span>Start a project</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Scroll prompt with arrow controls */}
              <div className="flex items-center justify-between border-t border-line/60 pt-4">
                <span className="text-[11px] text-muted flex items-center gap-1.5">
                  <Compass className="size-3 text-muted/70" />
                  <span>Scroll up/down to browse stages</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={activeStageIndex === 0}
                    className="flex size-7 cursor-pointer items-center justify-center rounded-lg border border-line bg-tile/70 text-muted transition-colors hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous stage"
                  >
                    <ArrowLeft className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    disabled={activeStageIndex === stagesData.length - 1}
                    className="flex size-7 cursor-pointer items-center justify-center rounded-lg border border-line bg-tile/70 text-muted transition-colors hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next stage"
                  >
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT HORIZONTAL TRACK: 5 Cards with Visual Plates (lg:col-span-8) */}
          <div ref={containerRef} className="lg:col-span-8 w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-5 sm:gap-6 pb-4 pt-1 will-change-transform"
            >
              {stagesData.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="group relative flex flex-col justify-between w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start cursor-pointer transition-all duration-200"
                  onClick={() => scrollToStage(idx)}
                >
                  {/* TOP: Dark Visual Technical Plate */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/80 bg-[#090b0e] text-slate-400 p-4 shadow-md transition-all duration-300 group-hover:border-line group-hover:shadow-xl dark:border-white/[0.08]">
                    {/* Top subheads inside the plate */}
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-400/80">
                      <span className="uppercase font-semibold tracking-wider">
                        {stage.graphicBadge}
                      </span>
                      <span className="text-slate-500">{stage.graphicSub}</span>
                    </div>

                    {/* Technical Graphic SVG Plate */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300">
                      {stage.renderGraphic()}
                    </div>

                    {/* Giant High-Impact Stage Numeral (Bottom-Right, matching reference) */}
                    <span className="absolute -bottom-2 right-3 font-display text-6xl sm:text-7xl font-bold tracking-tighter text-slate-100/90 pointer-events-none select-none dark:text-white/90">
                      {stage.step}
                    </span>
                  </div>

                  {/* BOTTOM: Narrative & Metadata */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-blue transition-colors">
                        {stage.title}
                      </h3>
                      <span className="font-mono text-xs text-muted/70">
                        {stage.fraction}
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3">
                      {stage.narrative}
                    </p>

                    {/* Practical Deliverable Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line/70 bg-tile/60 px-2 py-0.5 text-[10px] font-medium text-muted/90 dark:bg-white/[0.03] dark:border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SYNCHRONIZED TIMELINE: Sliding Dot & Segment Track */}
        <div className="mt-8 sm:mt-12 border-t border-line/70 pt-6">
          <div className="relative py-2">
            {/* Base Horizontal Track Line */}
            <div className="relative h-0.5 w-full bg-line/80 dark:bg-white/[0.08] rounded-full">
              {/* Active Progress Fill Line */}
              <div
                className="absolute left-0 top-0 h-full bg-ink dark:bg-white transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              />

              {/* Synchronized Sliding Dot (The signature Polaris Dev interaction) */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3.5 rounded-full bg-ink border-2 border-card shadow-md transition-all duration-150 ease-out dark:bg-white dark:border-[#090b0e]"
                style={{ left: `${scrollProgress * 100}%` }}
              >
                <span className="absolute inset-0 size-full rounded-full bg-blue animate-ping opacity-40" />
              </div>
            </div>

            {/* Segment Ticks & Clickable Step Markers */}
            <div className="mt-3 grid grid-cols-5 text-center">
              {stagesData.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => scrollToStage(idx)}
                    className="group cursor-pointer flex flex-col items-center gap-1 transition-colors"
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold transition-colors",
                        isActive
                          ? "text-ink dark:text-white"
                          : "text-muted/60 group-hover:text-ink"
                      )}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={cn(
                        "hidden sm:inline-block text-[11px] font-medium transition-colors truncate max-w-[110px]",
                        isActive
                          ? "text-ink font-semibold dark:text-white"
                          : "text-muted/70 group-hover:text-ink"
                      )}
                    >
                      {stage.phase.split("&")[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

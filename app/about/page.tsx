"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemedPortrait } from "@/components/themed-portrait";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Layers,
  Layout,
  Lightbulb,
  Mail,
  MapPin,
  Pause,
  Play,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { education } from "@/lib/data";
import {
  CanvaLogo,
  CapCutLogo,
  FigmaLogo,
  LightroomLogo,
  MySqlLogo,
  NextJsLogo,
  PhotoshopLogo,
  PowerBiIcon,
  PythonIcon,
  ReactLogo,
  TailwindLogo,
  TypeScriptLogo,
  VsCodeLogo,
} from "@/components/brand-icons";
import { ChibiMascot } from "@/components/chibi-mascot";
import { HorizontalStagesProcess } from "@/components/horizontal-stages-process";
import { Magnetic } from "@/components/magnetic-button";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// DATA STRUCTURES
// ---------------------------------------------------------------------------

type SkillCategory = "All" | "Analytics & BI" | "Systems & Web" | "Design & Media";

interface MarqueeSkill {
  name: string;
  category: "Analytics & BI" | "Systems & Web" | "Design & Media";
  role: string;
  badge: string;
  badgeColor: "blue" | "powder-blue" | "brown" | "beige";
  logoComponent: React.ComponentType<{ className?: string }>;
  logoColor?: string;
}

const marqueeSkillsData: MarqueeSkill[] = [
  {
    name: "Power BI",
    category: "Analytics & BI",
    role: "DAX Measures & KPI Models",
    badge: "Core BI",
    badgeColor: "blue",
    logoComponent: PowerBiIcon,
    logoColor: "text-amber-500",
  },
  {
    name: "Next.js 16",
    category: "Systems & Web",
    role: "App Router & SSR",
    badge: "Framework",
    badgeColor: "powder-blue",
    logoComponent: NextJsLogo,
  },
  {
    name: "React 19",
    category: "Systems & Web",
    role: "Reactive UI Architecture",
    badge: "Frontend",
    badgeColor: "powder-blue",
    logoComponent: ReactLogo,
  },
  {
    name: "TypeScript",
    category: "Systems & Web",
    role: "Strict Type Safety",
    badge: "Language",
    badgeColor: "blue",
    logoComponent: TypeScriptLogo,
  },
  {
    name: "Figma",
    category: "Design & Media",
    role: "UI/UX & Design Systems",
    badge: "Design",
    badgeColor: "brown",
    logoComponent: FigmaLogo,
  },
  {
    name: "MySQL",
    category: "Systems & Web",
    role: "Relational Schemas & SQL",
    badge: "Database",
    badgeColor: "blue",
    logoComponent: MySqlLogo,
  },
  {
    name: "Tailwind CSS",
    category: "Systems & Web",
    role: "Modern Design Tokens",
    badge: "Styling",
    badgeColor: "powder-blue",
    logoComponent: TailwindLogo,
  },
  {
    name: "Python",
    category: "Analytics & BI",
    role: "Data Cleaning & Analytics",
    badge: "Data Logic",
    badgeColor: "blue",
    logoComponent: PythonIcon,
  },
  {
    name: "Photoshop",
    category: "Design & Media",
    role: "Visual Assets & Finishing",
    badge: "Creative",
    badgeColor: "brown",
    logoComponent: PhotoshopLogo,
  },
  {
    name: "Lightroom",
    category: "Design & Media",
    role: "Color Grading & Tones",
    badge: "Photography",
    badgeColor: "brown",
    logoComponent: LightroomLogo,
  },
  {
    name: "VS Code",
    category: "Systems & Web",
    role: "Primary Engineering IDE",
    badge: "Workspace",
    badgeColor: "powder-blue",
    logoComponent: VsCodeLogo,
  },
  {
    name: "Canva",
    category: "Design & Media",
    role: "Marketing & Presentations",
    badge: "Graphics",
    badgeColor: "beige",
    logoComponent: CanvaLogo,
  },
  {
    name: "CapCut",
    category: "Design & Media",
    role: "Motion & Timeline Edits",
    badge: "Video",
    badgeColor: "beige",
    logoComponent: CapCutLogo,
  },
];

const growthAreas = [
  {
    id: "analytics",
    category: "BUSINESS & DATA ANALYTICS",
    badge: "Core Specialization",
    badgeColor: "blue",
    icon: BarChart3,
    headline: "Data Modeling & Decision Intelligence",
    desc: "Engineering structured analytical data models, formulating DAX calculations, and building high-contrast executive dashboards that reveal business trends.",
    tags: ["Power BI", "DAX Formulas", "Star Schema", "Trend Analysis", "KPI Dashboards"],
    stat: "High Priority",
  },
  {
    id: "systems",
    category: "SYSTEMS & WEB DEVELOPMENT",
    badge: "Core Engineering",
    badgeColor: "powder-blue",
    icon: Code2,
    headline: "Modern Web Systems & Component Architecture",
    desc: "Developing fast, scalable, and type-safe web applications using Next.js App Router, TypeScript, and relational MySQL database backends.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "MySQL"],
    stat: "Active Focus",
  },
  {
    id: "design",
    category: "UI/UX & INTERACTION DESIGN",
    badge: "Visual Craft",
    badgeColor: "brown",
    icon: Layout,
    headline: "Intuitive Interfaces & Visual Hierarchy",
    desc: "Designing clean digital experiences shaped by Apple HIG principles, optical typography, tactile feedback curves, and responsive accessibility.",
    tags: ["Figma", "Design Tokens", "Micro-Interactions", "Glassmorphic Depth"],
    stat: "Refining Daily",
  },
  {
    id: "professional",
    category: "PROFESSIONAL & ANALYTICAL GROWTH",
    badge: "Methodology",
    badgeColor: "beige",
    icon: Users,
    headline: "Cross-Functional Collaboration & Agility",
    desc: "Developing active listening, technical communication, sprint adaptability, and rigorous problem-solving through academic and client deliverables.",
    tags: ["Requirements Engineering", "System Analysis", "Sprint Coordination", "Adaptability"],
    stat: "Continuous",
  },
];

const statsStrip = [
  { label: "ACADEMIC YEAR", value: "4th Year", sub: "BSIT Senior" },
  { label: "SPECIALIZATION", value: "Analytics", sub: "Business & Data" },
  { label: "PORTFOLIO WORKS", value: "6 Works", sub: "Systems & Analytics" },
  { label: "CAMPUS", value: "BulSU", sub: "Bustos Campus" },
];

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // QuickTo parallax refs
  const portraitX = useRef<((value: number) => void) | null>(null);
  const portraitY = useRef<((value: number) => void) | null>(null);

  // Interactive States
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<SkillCategory>("All");
  const [isPaused, setIsPaused] = useState(false);

  // Initialize smooth mouse parallax on desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    if (portraitRef.current) {
      portraitX.current = gsap.quickTo(portraitRef.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      portraitY.current = gsap.quickTo(portraitRef.current, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!profileContainerRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = profileContainerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    portraitX.current?.(x * 12);
    portraitY.current?.(y * 12);
  };

  const handleMouseLeave = () => {
    portraitX.current?.(0);
    portraitY.current?.(0);
  };

  // GSAP Entrance and ScrollTrigger Animations
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        // Hero entrance
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-fade-in",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 }
        );

        tl.fromTo(
          ".hero-portrait-card",
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );

        // Staggered reveals on scroll sections
        const scrollSections = [
          { trigger: ".section-growth", items: ".growth-card" },
          { trigger: ".section-education", items: ".education-card" },
        ];

        scrollSections.forEach(({ trigger, items }) => {
          gsap.fromTo(
            items,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger,
                start: "top 82%",
                once: true,
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  // Filtered skills based on active category
  const activeFilteredSkills =
    selectedSkillCategory === "All"
      ? marqueeSkillsData
      : marqueeSkillsData.filter((s) => s.category === selectedSkillCategory);

  // Guarantee seamless looping across ultra-wide monitors
  const repeatCount =
    activeFilteredSkills.length <= 4
      ? 4
      : activeFilteredSkills.length <= 8
      ? 3
      : 2;

  const displayMarqueeSkills = Array.from({ length: repeatCount }, () => activeFilteredSkills).flat();

  return (
    <div ref={containerRef} className="space-y-16 sm:space-y-24 py-4 max-w-6xl mx-auto">
      {/* ===================================================================
          1. HERO BENTO: PROFILE, IDENTITY & INTERACTIVE SKILLS MATRIX
          =================================================================== */}
      <section
        ref={heroSectionRef}
        className="relative overflow-hidden rounded-3xl border border-line bg-card/85 p-6 sm:p-10 lg:p-12 shadow-sm backdrop-blur-md"
      >
        {/* Subtle Ambient Decorative Lights (Blue, Powder Blue, Brown) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-20 size-80 rounded-full bg-blue/10 blur-3xl dark:bg-blue/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-20 size-80 rounded-full bg-brown/15 blur-3xl dark:bg-brown/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-1/3 size-64 rounded-full bg-powder-blue/10 blur-3xl dark:bg-powder-blue/15"
        />

        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Bio, Credentials & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial Headline */}
            <div className="hero-fade-in space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.12]">
                Bridging data-driven analytics with thoughtful{" "}
                <span className="text-blue dark:text-powder-blue">systems &amp; design.</span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-muted max-w-2xl">
                I’m a 4th-year BSIT student at Bulacan State University specializing in{" "}
                <span className="font-semibold text-ink">Business &amp; Data Analytics</span>. I
                design, engineer, and refine end-to-end digital solutions—from interactive Power BI
                dashboards to responsive Next.js applications and interface systems.
              </p>
            </div>

            {/* Quick Impact Fact Strip */}
            <div className="hero-fade-in grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {statsStrip.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-tile/70 p-3 text-center sm:text-left transition-colors hover:border-blue/40"
                >
                  <p className="font-mono text-[10px] font-semibold tracking-wider text-muted uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-ink">{stat.value}</p>
                  <p className="text-[11px] text-muted">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hero-fade-in flex flex-wrap items-center gap-3 pt-2">
              <Magnetic strength={4}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs sm:text-sm font-bold text-page shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-95"
                >
                  <Mail className="size-4 text-powder-blue" />
                  <span>CONTACT ME</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Magnetic>

              <Magnetic strength={4}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-tile/80 px-4 py-3 text-xs sm:text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue active:scale-95"
                >
                  <span>EXPLORE MY WORK</span>
                  <ArrowUpRight className="size-4 text-muted" />
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: 3D Parallax Portrait with Dynamic Backing */}
          <div
            ref={profileContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px]"
          >
            {/* Visual Geometric Backdrop Layers */}
            <div
              aria-hidden
              className="pointer-events-none absolute size-[280px] sm:size-[320px] rounded-3xl border border-blue/20 bg-gradient-to-br from-blue/15 via-powder-blue/10 to-transparent dark:from-blue/25 dark:via-[#132338]/30"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute size-[250px] sm:size-[280px] rounded-[32px] border border-brown/30 bg-brown/10 dark:bg-brown/15 backdrop-blur-xs rotate-3"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute size-[310px] sm:size-[350px] rounded-full border border-line/80 border-dashed opacity-60"
            />

            {/* Interactive Portrait Card */}
            <div
              ref={portraitRef}
              className="hero-portrait-card group relative z-10 aspect-[3/4] w-[220px] sm:w-[260px] overflow-hidden rounded-2xl sm:rounded-3xl border border-line/90 bg-sidebar shadow-2xl backdrop-blur-md transition-shadow duration-300 hover:shadow-blue/15 dark:border-line"
            >
              <ThemedPortrait
                alt="Yukari Nemoto"
                sizes="(max-width: 640px) 220px, 260px"
                priority
                imgClassName="group-hover:scale-105"
              />

              {/* Ambient Specular Glass Bottom Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-10">
                <p className="font-display text-sm font-bold tracking-tight text-white drop-shadow-sm">
                  Yukari Nemoto
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Skills Auto-Scrolling Horizontal Marquee with Real Logos */}
        <div className="mt-10 border-t border-line/80 pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-blue animate-pulse" />
              <div>
                <p className="font-mono text-xs font-bold tracking-wider uppercase text-ink">
                  SKILLS &amp; TECHNOLOGIES
                </p>
                <p className="text-[11px] text-muted hidden sm:block">
                  Continuous horizontal scroll • Hover to pause &amp; inspect
                </p>
              </div>
            </div>

            {/* Controls: Play/Pause + Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-line bg-tile/80 px-2.5 py-1 text-[11px] font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                {isPaused ? (
                  <>
                    <Play className="size-3 text-blue fill-blue" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="size-3 text-muted" />
                    <span>Pause</span>
                  </>
                )}
              </button>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1">
                {(["All", "Analytics & BI", "Systems & Web", "Design & Media"] as SkillCategory[]).map(
                  (category) => {
                    const isActive = selectedSkillCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedSkillCategory(category)}
                        className={cn(
                          "cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all duration-200",
                          isActive
                            ? "bg-blue text-white shadow-xs dark:bg-blue dark:text-white"
                            : "border border-line bg-tile/60 text-muted hover:border-blue/40 hover:text-ink"
                        )}
                      >
                        {category}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Marquee Track with Edge Fade Gradient Masks */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_28px,black_calc(100%-28px),transparent)] py-2">
            <div
              className="tools-track flex items-center gap-3.5"
              style={{
                animationPlayState: isPaused ? "paused" : undefined,
                animationDuration: selectedSkillCategory === "All" ? "42s" : "28s",
              }}
            >
              {displayMarqueeSkills.map((skill, index) => {
                const Logo = skill.logoComponent;
                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className="glass-plate group flex items-center gap-3.5 rounded-2xl border border-line bg-card/90 px-4 py-3 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue/50 hover:shadow-md cursor-pointer select-none min-w-[230px] sm:min-w-[250px] shrink-0"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-tile shadow-xs transition-transform duration-200 group-hover:scale-105">
                      <Logo className={cn("size-5", skill.logoColor)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className="font-display text-xs font-bold text-ink truncate group-hover:text-blue transition-colors">
                          {skill.name}
                        </h4>
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider shrink-0",
                            skill.badgeColor === "blue"
                              ? "bg-blue/10 text-blue dark:text-powder-blue"
                              : skill.badgeColor === "powder-blue"
                              ? "bg-powder-blue/15 text-sky-700 dark:text-powder-blue"
                              : skill.badgeColor === "brown"
                              ? "bg-brown/10 text-brown"
                              : "bg-tile text-muted"
                          )}
                        >
                          {skill.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono text-[10px] text-muted truncate">
                        {skill.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. INTERACTIVE WORKFLOW: HOW I WORK & SOLVE PROBLEMS (5 STAGES HORIZONTAL)
          =================================================================== */}
      <HorizontalStagesProcess />

      {/* ===================================================================
          3. EDUCATION & SPECIALIZATION
          =================================================================== */}
      <section className="section-education space-y-6 border-t border-line/70 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex size-2 rounded-full bg-blue animate-pulse" />
              <h2 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-muted">
                ACADEMIC BACKGROUND
              </h2>
            </div>
            <p className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
              Education &amp; Specialization
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 font-mono text-xs font-bold text-blue dark:text-powder-blue shadow-xs">
              4TH YEAR · SENIOR STANDING
            </span>
          </div>
        </div>

        {/* PRIMARY UNIVERSITY: Bulacan State University */}
        <div className="education-card group relative overflow-hidden rounded-3xl border border-line bg-card/95 p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:border-blue/40 hover:shadow-md">
          {/* Subtle Ambient Decorative Lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-blue/10 blur-3xl transition-opacity duration-500 group-hover:bg-blue/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-brown/10 blur-3xl transition-opacity duration-500 group-hover:bg-brown/15"
          />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue/30 bg-blue/10 px-3 py-0.5 font-mono text-[11px] font-bold tracking-wider text-blue dark:text-powder-blue">
                <span className="size-1.5 rounded-full bg-blue animate-pulse" />
                2023 — PRESENT
              </span>
              <span className="rounded-full border border-line bg-tile px-2.5 py-0.5 font-mono text-[11px] font-semibold text-muted">
                UNDERGRADUATE DEGREE
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-ink leading-tight">
                Bachelor of Science in Information Technology
              </h3>

              <p className="font-mono text-base sm:text-lg font-bold text-blue dark:text-powder-blue">
                Major in Business &amp; Data Analytics
              </p>

              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-muted pt-0.5">
                <MapPin className="size-3.5 text-brown shrink-0" />
                <span>Bulacan State University — Bustos Campus · Bustos, Bulacan</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-4xl pt-2">
              Focused on enterprise data architectures, interactive business intelligence, and end-to-end analytics systems. Bridging technical engineering with strategic business insight through hands-on capstone projects and empirical research.
            </p>
          </div>
        </div>

        {/* SECONDARY FOUNDATIONAL EDUCATION: Colegio de Sta. Monica de Angat */}
        <div className="education-card group relative overflow-hidden rounded-2xl border border-line/80 bg-card/70 p-5 sm:p-6 transition-all duration-300 hover:border-line hover:bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line bg-tile px-2.5 py-0.5 font-mono text-[10px] font-semibold text-muted">
                  2017 — 2022
                </span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Award className="size-3" />
                  Graduated with Academic Honors
                </span>
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-ink">
                Colegio de Sta. Monica de Angat
              </h4>
              <p className="text-xs sm:text-sm text-muted">
                Junior &amp; Senior High School (HUMSS) · Formative academic training integrating philosophy, laws, and foundational technology skills.
              </p>
            </div>

            <div className="shrink-0 font-mono text-[11px] text-muted sm:text-right">
              Angat, Bulacan, Philippines
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. EDITORIAL MINDSET & PHILOSOPHY
          =================================================================== */}
      <section className="border-t border-line/70 py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-brown/30 bg-brown/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-[0.2em] uppercase text-brown">
            <span className="size-1.5 rounded-full bg-brown" />
            <span>CORE PHILOSOPHY</span>
          </div>

          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink leading-snug">
            “Stay curious. Keep learning.
            <br />
            <span className="text-muted/85">Improve through hands-on experience.”</span>
          </blockquote>

          <p className="max-w-xl mx-auto text-xs sm:text-base leading-relaxed text-muted">
            Whether exploring an unfamiliar data visualization framework, debugging relational
            queries, or conducting stakeholder walkthroughs, I embrace constructive feedback and
            continuous refinement.
          </p>
        </div>
      </section>
    </div>
  );
}

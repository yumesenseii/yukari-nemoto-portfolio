"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Magnetic } from "@/components/magnetic-button";
import { ProjectMedia } from "@/components/project-media";
import { cn } from "@/lib/cn";
import { defaultProjectTheme, ProjectItem, projectThemes } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailViewProps {
  project: ProjectItem;
  nextProject: ProjectItem;
}

export function ProjectDetailView({ project, nextProject }: ProjectDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = projectThemes[project.slug] || defaultProjectTheme;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // 1. Cinematic Page Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".detail-back-link",
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.1 }
      )
        .fromTo(
          ".detail-meta-pill",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".detail-title-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.95, ease: "power4.out" },
          "-=0.5"
        )
        .fromTo(
          ".detail-subtitle",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".detail-desc",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".detail-meta-card",
          { opacity: 0, y: 18, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.07, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".detail-showcase-image",
          { opacity: 0, scale: 1.05, clipPath: "inset(4% 0 4% 0)" },
          { opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)", duration: 0.95, ease: "power3.out" },
          "-=0.5"
        );

      // 2. ScrollTrigger reveals for content sections
      const sections = gsap.utils.toArray<HTMLElement>(".detail-scroll-section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [project.slug] }
  );

  return (
    <div ref={containerRef} className="space-y-14 sm:space-y-18 py-4 max-w-4xl mx-auto">
      {/* 1. Back Link with Magnetic micro-interaction */}
      <div className="detail-back-link">
        <Magnetic strength={5}>
          <Link
            href="/projects"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-card/60 px-3.5 py-2 text-xs font-semibold text-muted transition-colors hover:border-blue hover:text-ink hover:bg-tile"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Projects</span>
          </Link>
        </Magnetic>
      </div>

      {/* 2. Project Header with Masked Title Line Reveal */}
      <section>
        <div
          className={cn(
            "detail-meta-pill inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-mono font-semibold tracking-wider uppercase transition-colors",
            theme.badgeBg,
            theme.badgeBorder,
            theme.badgeText,
          )}
        >
          <span className={cn("size-2 rounded-full", theme.dotColor)} />
          <span>{project.meta}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight overflow-hidden py-1 text-balance">
          <span className="detail-title-line block">
            {project.title}
          </span>
        </h1>

        <p className="detail-subtitle mt-2 text-lg sm:text-xl font-medium text-muted">
          {project.subtitle}
        </p>

        <p className="detail-desc mt-5 text-base sm:text-lg leading-relaxed text-muted">
          {project.description}
        </p>
      </section>

      {/* 3. Metadata Dashboard Bar */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-line bg-card p-5 sm:p-6 shadow-xs">
        <div className="detail-meta-card">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
            Project Type
          </span>
          <p className="mt-1 font-display text-sm font-bold text-ink">
            {project.projectType}
          </p>
        </div>

        <div className="detail-meta-card">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
            Year
          </span>
          <p className="mt-1 font-display text-sm font-bold text-ink">
            {project.year}
          </p>
        </div>

        <div className="detail-meta-card">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
            My Role
          </span>
          <p className="mt-1 font-display text-sm font-bold text-ink">
            {project.role}
          </p>
        </div>

        <div className="detail-meta-card">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
            {project.client
              ? "Client & Team"
              : project.subject
                ? "Academic Subject"
                : "Primary Focus"}
          </span>
          <p className="mt-1 font-display text-xs sm:text-sm font-bold text-ink">
            {project.client
              ? `${project.client}${project.team ? ` · ${project.team}` : ""}`
              : project.subject
                ? `${project.subject}`
                : "Collaboration & Analytics"}
          </p>
        </div>
      </section>

      {/* 4. Large Project Media Showcase with Smooth Reveal */}
      <section className="detail-showcase-image relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line bg-tile shadow-md">
        <ProjectMedia
          project={project}
          isActive={true}
          priority
          className="h-full w-full object-cover"
        />
      </section>

      {/* 5. Project Overview & Context */}
      <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", theme.dotColor)} />
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
            PROJECT CONTEXT &amp; OVERVIEW
          </h2>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          The Problem &amp; Background
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-muted">
          {project.context}
        </p>
      </section>

      {/* 6. Process & Execution */}
      <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", theme.dotColor)} />
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
            DESIGN &amp; DEVELOPMENT PROCESS
          </h2>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          How It Was Conceived &amp; Built
        </h3>
        <p className="text-sm sm:text-base leading-relaxed text-muted">
          {project.process}
        </p>
      </section>

      {/* 7. Key Features */}
      <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full", theme.dotColor)} />
            <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
              KEY CAPABILITIES
            </h2>
          </div>
          <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Highlights &amp; Feature Breakdown
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.features?.map((feature: string, i: number) => {
            const parts = feature.split(":");
            const heading = parts[0];
            const body = parts.slice(1).join(":");

            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3.5 rounded-2xl border border-line bg-card p-5 shadow-xs transition-all duration-200",
                  theme.hoverBorder,
                )}
              >
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg border border-line bg-tile mt-0.5 transition-colors",
                    theme.accentText,
                  )}
                >
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">
                    {heading}
                  </h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7.5. Figma Prototype Screen Architecture & Walkthrough Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue" />
              <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
                PROTOTYPE SCREEN ARCHITECTURE
              </h2>
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Figma User Journey &amp; Screen Breakdown
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
              High-resolution screens designed and validated with client stakeholders for the System Analysis and Design final project.
            </p>
          </div>

          <div className="space-y-6">
            {project.images.map((imgSrc: string, idx: number) => {
              const screenMeta = [
                {
                  title: "01. Brand Entrance & Hero Call-to-Actions",
                  desc: "Clear brand positioning, value proposition, and quick access to the beverage catalog.",
                },
                {
                  title: "02. Drink Search & Category Navigation",
                  desc: "Prominent search bar, filter drawer triggers, and contextual category switching.",
                },
                {
                  title: "03. Wholesale Inventory & Case Pricing",
                  desc: "Wholesale stock availability indicators ('50+ in stock') with transparent per-case pricing.",
                },
                {
                  title: "04. Granular SKU Detail & Stock Status Modal",
                  desc: "Modal view with SKU code, detailed product notes, ratings, and out-of-stock ordering prevention.",
                },
                {
                  title: "05. Promotional Staging & Ordering CTA",
                  desc: "Staged marketing visual compositions for seasonal campaigns, beverage bundles, and client handover.",
                },
              ][idx] || {
                title: `Screen ${idx + 1}`,
                desc: "Figma interface prototype view.",
              };

              return (
                <div
                  key={imgSrc}
                  className="overflow-hidden rounded-2xl border border-line bg-card shadow-xs transition-all duration-300 hover:border-blue/40"
                >
                  <div className="p-4 sm:p-5 border-b border-line/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">
                        {screenMeta.title}
                      </h4>
                      <p className="text-xs text-muted mt-0.5">{screenMeta.desc}</p>
                    </div>
                    <span className="shrink-0 self-start sm:self-auto rounded-md border border-line bg-tile px-2.5 py-1 font-mono text-[10px] font-semibold text-muted">
                      SCREEN {idx + 1} OF {project.images?.length}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full bg-[#131b26]">
                    <Image
                      src={imgSrc}
                      alt={screenMeta.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 896px"
                      className="object-contain object-top"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. Final Result & Impact */}
      <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-brown" />
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
            FINAL RESULT
          </h2>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Outcome &amp; Deliverables
        </h3>
        <div className="rounded-2xl border border-line bg-card p-6 shadow-xs">
          <p className="text-sm sm:text-base leading-relaxed text-muted">
            {project.result}
          </p>
        </div>
      </section>

      {/* 9. Technology & Tools */}
      <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="size-4 text-blue" />
          <h2 className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
            TECHNOLOGIES &amp; TOOLS
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.toolsList?.map((tool: string) => (
            <span
              key={tool}
              className="rounded-xl border border-line bg-tile px-3.5 py-1.5 text-xs font-semibold text-ink"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* 10. Next Project & Return Navigation */}
      <section className="detail-scroll-section border-t border-line/70 pt-10 sm:pt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Magnetic strength={5}>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>All Projects</span>
          </Link>
        </Magnetic>

        <Magnetic strength={7}>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs font-semibold text-sidebar shadow-sm transition-all hover:opacity-95 dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
          >
            <span>Next Project: {nextProject.title}</span>
            <ArrowRight
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-1"
              strokeWidth={2.25}
            />
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "@/components/magnetic-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);
  const resumeArrowRef = useRef<SVGSVGElement>(null);

  // Subtle GSAP hover animation for Resume button
  const handleResumeEnter = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (resumeBtnRef.current) {
      gsap.to(resumeBtnRef.current, {
        y: -2,
        borderColor: "rgba(59, 130, 246, 0.45)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (resumeArrowRef.current) {
      gsap.to(resumeArrowRef.current, {
        x: 4,
        y: -2,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleResumeLeave = () => {
    if (resumeBtnRef.current) {
      gsap.to(resumeBtnRef.current, {
        y: 0,
        borderColor: "var(--line)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (resumeArrowRef.current) {
      gsap.to(resumeArrowRef.current, {
        x: 0,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  // Subtle restrained parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Master GSAP Hero Entrance Timeline & Restrained Scroll Parallax
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Eyebrow upward reveal
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      );

      // 2. Clipped reveal on main heading lines (YUKARI NEMOTO)
      tl.fromTo(
        ".hero-heading-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.0, stagger: 0.14, ease: "power4.out" },
        "-=0.6"
      );

      // 3. Subtitle moves upward with slight fade
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.6"
      );

      // 4. Description follows
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // 5. Hero buttons enter after main heading with stagger
      tl.fromTo(
        ".hero-btn",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );

      // 6. Status indicator enters
      tl.fromTo(
        ".hero-status",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // 7. Hero image reveals with subtle scale from 1.08 to 1 and opacity transition
      tl.fromTo(
        ".hero-portrait-frame",
        { opacity: 0, scale: 1.08, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" },
        "-=0.9"
      );

      // 8. Small decorative geometric elements enter last
      tl.fromTo(
        ".hero-deco-layer",
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" },
        "-=0.7"
      );

      // Subtle restrained parallax on hero image during scroll
      gsap.to(".hero-portrait-frame", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 pt-2 pb-12 sm:pb-16"
    >
      {/* LEFT COLUMN: Hero Copy & Actions */}
      <div className="flex flex-col lg:col-span-7">
        {/* Small Label */}
        <div className="hero-eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-line bg-tile/70 px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-blue">
          <span>WELCOME TO MY PORTFOLIO</span>
        </div>

        <h2 className="mt-5 flex flex-col font-display text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[0.95] tracking-tight text-ink">
          <span>Yukari Tenshi</span>
          <span>Nemoto</span>
        </h2>

        {/* Description */}
        <p className="hero-desc mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted">
          I design, develop, and create digital experiences that are strategic,
          user-focused, and meaningful.
        </p>

        {/* Buttons with Magnetic micro-interaction */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="hero-btn">
            <Magnetic strength={6}>
              <a
                href="#featured-projects"
                className="group flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs sm:text-sm font-semibold text-sidebar shadow-sm transition-all duration-200 hover:opacity-95 active:scale-[0.98] dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.25}
                />
              </a>
            </Magnetic>
          </div>

          <div className="hero-btn">
            <Magnetic strength={6}>
              <Link
                href="/contact"
                className="flex cursor-pointer items-center justify-center rounded-xl border border-line bg-tile/40 px-5 py-3 text-xs sm:text-sm font-semibold text-ink transition-all duration-200 hover:border-brown hover:bg-tile active:scale-[0.98]"
              >
                LET&apos;S WORK TOGETHER
              </Link>
            </Magnetic>
          </div>

          <div className="hero-btn">
            <Magnetic strength={6}>
              <a
                ref={resumeBtnRef}
                href="/projects/Nemoto-Yukari-Tenshi-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleResumeEnter}
                onMouseLeave={handleResumeLeave}
                className="group flex cursor-pointer items-center gap-2 rounded-xl border border-line/80 bg-tile/20 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-muted transition-colors duration-200 hover:border-blue/50 hover:text-ink active:scale-[0.98]"
                aria-label="View Resume (opens in a new tab)"
              >
                <span>RESUME</span>
                <ArrowUpRight
                  ref={resumeArrowRef}
                  className="size-3.5 text-muted transition-colors group-hover:text-ink"
                  strokeWidth={2}
                />
              </a>
            </Magnetic>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Layered Portrait & Geometric Composition */}
      <div className="relative flex items-center justify-center lg:col-span-5 min-h-[360px] sm:min-h-[420px]">

        {/* Layer 2: Subtle navy geometric shape with mouse parallax */}
        <div
          className="hero-deco-layer pointer-events-none absolute size-[260px] sm:size-[290px] rounded-3xl border border-blue/20 bg-gradient-to-br from-[#162b47]/45 via-[#0e1d30]/35 to-transparent transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0) rotate(-6deg)`,
          }}
        />

        {/* Layer 3: Warm brown translucent shape */}
        <div
          className="hero-deco-layer pointer-events-none absolute size-[220px] sm:size-[250px] rounded-[32px] border border-brown/25 bg-[#8c5b36]/15 backdrop-blur-xs transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0) rotate(10deg)`,
          }}
        />

        {/* Layer 4: Thin circular dashed technical line */}
        <div
          className="hero-deco-layer pointer-events-none absolute size-[300px] sm:size-[350px] rounded-full border border-brown/30 border-dashed transition-transform duration-500 ease-out opacity-80"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
          }}
        />

        {/* Layer 5: Portrait Centerpiece (Formal Portrait with cinematic reveal) */}
        <div
          className="hero-portrait-frame group relative z-10 aspect-[3/4] w-[210px] sm:w-[245px] overflow-hidden rounded-2xl sm:rounded-3xl border border-line/80 bg-sidebar/90 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
          }}
        >
          <Image
            src="/yukari-portrait.jpg"
            alt="Yukari Nemoto — Formal Portrait"
            width={480}
            height={640}
            priority
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />

        </div>

      </div>

    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChibiMascot } from "@/components/chibi-mascot";
import { Magnetic } from "@/components/magnetic-button";
import { profile } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCta() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        ".cta-card-box",
        { opacity: 0, scale: 0.98, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power3.out" }
      ).fromTo(
        ".cta-content-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="my-10 sm:my-16">
      <div className="cta-card-box relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-card via-[#132338]/25 to-[#2f1f14]/20 p-8 sm:p-12 lg:p-16 shadow-lg">
        {/* Subtle Ambient Glow Elements */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-blue/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-brown/15 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            {/* Small Label */}
            <div className="cta-content-item inline-flex items-center gap-2 rounded-full border border-line bg-tile/70 px-3.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-brown">
              <span>COLLABORATION &amp; INQUIRIES</span>
            </div>

            {/* Main CTA Heading */}
            <h2 className="cta-content-item mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              LET’S WORK TOGETHER
            </h2>

            {/* Subhead */}
            <p className="cta-content-item mt-3 font-display text-lg sm:text-xl font-semibold text-ink">
              Have a project, opportunity, or idea?
            </p>

            {/* Description */}
            <p className="cta-content-item mt-2 text-sm sm:text-base leading-relaxed text-muted">
              I’m open to learning, collaborating, and working on meaningful digital
              projects.
            </p>
          </div>

          {/* Action Button & Contact Mail with Magnetic behavior */}
          <div className="cta-content-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Magnetic strength={7}>
              <Link
                href="/contact"
                className="group flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-ink px-6 py-3.5 text-xs sm:text-sm font-bold text-sidebar shadow-sm transition-all duration-200 hover:opacity-95 active:scale-[0.98] dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
              >
                <span>LET’S TALK</span>
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.25}
                />
              </Link>
            </Magnetic>

            <Magnetic strength={6}>
              <a
                href={`mailto:${profile.email}`}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-card/80 px-4 py-3.5 text-xs sm:text-sm font-medium text-muted transition-colors hover:border-blue hover:text-ink"
              >
                <Mail className="size-4" />
                <span>Direct Email</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Subtle Chibi Mascot in bottom corner */}
        <div className="absolute right-4 bottom-2.5 hidden sm:block opacity-65 hover:opacity-100 transition-opacity">
          <ChibiMascot
            variant="sitting"
            size={34}
            tooltipText="Let's build together! 🚀"
          />
        </div>
      </div>
    </section>
  );
}

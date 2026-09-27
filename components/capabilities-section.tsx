"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Code2,
  Layout,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChibiMascot } from "@/components/chibi-mascot";
import { Magnetic } from "@/components/magnetic-button";
import { capabilities } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = {
  layout: Layout,
  code: Code2,
  chart: BarChart3,
  sparkles: Sparkles,
};

export function CapabilitiesSection() {
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
        ".capabilities-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
      ).fromTo(
        ".capability-card",
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-10 sm:py-12 border-t border-line/70">
      {/* Header */}
      <div className="capabilities-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-muted">
            QUICK CAPABILITIES
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <ChibiMascot
            variant="sitting"
            size={30}
            className="opacity-75 hover:opacity-100 transition-opacity"
            tooltipText="Tools & Systems"
          />
          <Magnetic strength={5}>
            <Link
              href="/tools"
              className="flex items-center gap-1.5 text-xs font-semibold text-blue transition-colors hover:text-ink"
            >
              <span>Tools &amp; Tech</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Compact 4-column Grid with Staggered Entrance */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap) => {
          const Icon = iconMap[cap.icon];

          return (
            <div
              key={cap.title}
              className="capability-card glass-plate flex items-start gap-3 rounded-xl border border-line bg-card p-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-blue/50"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-tile text-blue">
                <Icon className="size-4" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-xs font-bold tracking-wider text-ink">
                  {cap.title}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {cap.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { onLoaderDone } from "@/lib/loader-ready";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const bar = progressBarRef.current;
    if (!container) return;

    // Fast top progress accent pulse (released with the entrance below)
    const barTween = bar
      ? gsap.fromTo(
          bar,
          { width: "0%", opacity: 1 },
          {
            width: "100%",
            duration: 0.28,
            ease: "power2.out",
            paused: true,
            onComplete: () => {
              gsap.to(bar, { opacity: 0, duration: 0.15 });
            },
          },
        )
      : null;

    // Smooth, cinematic entrance for the incoming page content (0.3s)
    // Built paused so it plays after the loader lifts, not behind it.
    const entrance = gsap.fromTo(
      container,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        ease: "power3.out",
        paused: true,
        clearProps: "transform,opacity",
      },
    );

    const off = onLoaderDone(() => {
      barTween?.play();
      entrance.play();
    });
    return () => {
      off();
    };
  }, [pathname]);

  return (
    <>
      {/* Top progress accent line for route transition */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-[2px] bg-gradient-to-r from-blue via-brown to-blue opacity-0"
      />
      <div ref={containerRef} className="w-full">
        {children}
      </div>
    </>
  );
}

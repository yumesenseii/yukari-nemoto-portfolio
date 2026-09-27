"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "drag" | "play">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use gsap.quickTo for instant, lag-free 60fps cursor positioning
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);

      // Detect cursor targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor") as "drag" | "play";
        setCursorType(type || "hover");
        return;
      }

      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      if (isInteractive) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible]);

  // Animate cursor states smoothly with GSAP
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (cursorType === "drag" || cursorType === "play") {
      gsap.to(cursor, {
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: "var(--card)",
        borderColor: "var(--brown)",
        borderWidth: 1.5,
        opacity: 0.9,
        duration: 0.25,
        ease: "power3.out",
      });
    } else if (cursorType === "hover") {
      gsap.to(cursor, {
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: "transparent",
        borderColor: "var(--ink)",
        borderWidth: 1.5,
        opacity: 0.45,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursor, {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "var(--ink)",
        borderColor: "transparent",
        borderWidth: 0,
        opacity: 0.75,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [cursorType]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center backdrop-blur-xs select-none transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {(cursorType === "drag" || cursorType === "play") && (
        <span
          ref={labelRef}
          className="font-mono text-[9px] font-bold tracking-widest uppercase text-ink drop-shadow-xs"
        >
          {cursorType === "drag" ? "DRAG" : "PLAY"}
        </span>
      )}
    </div>
  );
}

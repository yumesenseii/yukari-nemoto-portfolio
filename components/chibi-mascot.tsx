"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/cn";

export type ChibiVariant = "chatbot" | "peeking" | "sitting" | "badge";

interface ChibiMascotProps {
  variant?: ChibiVariant;
  className?: string;
  size?: number; // size in px, default 42
  interactive?: boolean;
  onClick?: () => void;
  tooltipText?: string;
}

export function ChibiMascot({
  variant = "chatbot",
  className,
  size = 44,
  interactive = true,
  onClick,
  tooltipText,
}: ChibiMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<SVGSVGElement>(null);
  const leftEyeRef = useRef<SVGGElement>(null);
  const rightEyeRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const handRef = useRef<SVGPathElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // 1. Gentle Idle Floating Animation
    const floatAnim = gsap.to(mascot, {
      y: variant === "peeking" ? -2 : -4,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 2. Periodic Natural Blink Loop
    let blinkTimer: NodeJS.Timeout;
    const triggerBlink = () => {
      if (leftEyeRef.current && rightEyeRef.current) {
        gsap.to([leftEyeRef.current, rightEyeRef.current], {
          scaleY: 0.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          transformOrigin: "center center",
          ease: "power1.inOut",
        });
      }
      // Random delay between 3.5s and 6.5s for natural feeling
      const nextDelay = 3500 + Math.random() * 3000;
      blinkTimer = setTimeout(triggerBlink, nextDelay);
    };

    blinkTimer = setTimeout(triggerBlink, 3000);

    return () => {
      floatAnim.kill();
      clearTimeout(blinkTimer);
    };
  }, [variant]);

  // Subtle Eye Tracking towards cursor within proximity
  useEffect(() => {
    if (!interactive || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container || !leftPupilRef.current || !rightPupilRef.current) return;

      const rect = container.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - mascotCenterX;
      const dy = e.clientY - mascotCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only track within 280px radius
      if (dist < 280) {
        const maxOffset = 2.2;
        const normX = (dx / dist) * maxOffset;
        const normY = (dy / dist) * maxOffset;

        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: normX,
          y: normY,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // Return pupils to center
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!interactive || !mascotRef.current) return;

    gsap.to(mascotRef.current, {
      y: variant === "peeking" ? -5 : -7,
      scale: 1.06,
      rotate: variant === "peeking" ? 2 : -2,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Wave hand if chatbot variant
    if (variant === "chatbot" && handRef.current) {
      gsap.to(handRef.current, {
        rotate: 15,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        transformOrigin: "bottom left",
        ease: "sine.inOut",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!interactive || !mascotRef.current) return;

    gsap.to(mascotRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (handRef.current) {
      gsap.to(handRef.current, {
        rotate: 0,
        duration: 0.2,
        overwrite: "auto",
      });
    }
  };

  const handleClick = () => {
    if (!interactive) return;

    if (mascotRef.current) {
      // Cute responsive hop
      gsap.fromTo(
        mascotRef.current,
        { scale: 0.92, y: 2 },
        {
          scale: 1.08,
          y: -10,
          duration: 0.22,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1,
        },
      );
    }

    onClick?.();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center select-none will-change-transform",
        interactive && "cursor-pointer",
        className,
      )}
      style={{ width: size, height: size }}
      role={interactive && onClick ? "button" : undefined}
      tabIndex={interactive && onClick ? 0 : undefined}
      aria-label={tooltipText || "Yukari's portfolio chibi mascot"}
    >
      <svg
        ref={mascotRef}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
      >
        {/* Peeking Ledge paws */}
        {variant === "peeking" && (
          <g className="peeking-paws">
            <ellipse cx="22" cy="56" rx="5" ry="3.5" className="fill-[#141922] dark:fill-[#0c1016] stroke-white/20 dark:stroke-white/15 stroke-[1]" />
            <ellipse cx="42" cy="56" rx="5" ry="3.5" className="fill-[#141922] dark:fill-[#0c1016] stroke-white/20 dark:stroke-white/15 stroke-[1]" />
          </g>
        )}

        {/* Mascot Body: Cute curved rounded obsidian silhouette with subtle sleek rim stroke */}
        <path
          d={
            variant === "peeking"
              ? "M12 56 C12 30 18 16 32 16 C46 16 52 30 52 56 Z"
              : variant === "sitting"
                ? "M16 48 C14 32 18 18 32 18 C46 18 50 32 48 48 C47 54 44 56 32 56 C20 56 17 54 16 48 Z"
                : "M15 42 C13 26 19 14 32 14 C45 14 51 26 49 42 C48 53 43 56 32 56 C21 56 16 53 15 42 Z"
          }
          className="fill-[#141922] dark:fill-[#0c1016] stroke-black/40 dark:stroke-white/25 stroke-[1.25]"
        />

        {/* Small ears / silhouette nubs for added charm */}
        <circle cx="21" cy="18" r="4.5" className="fill-[#141922] dark:fill-[#0c1016] stroke-black/30 dark:stroke-white/20 stroke-[1]" />
        <circle cx="43" cy="18" r="4.5" className="fill-[#141922] dark:fill-[#0c1016] stroke-black/30 dark:stroke-white/20 stroke-[1]" />

        {/* Mascot Feet (Non-peeking variants) */}
        {variant !== "peeking" && (
          <g className="mascot-feet">
            <ellipse cx="24" cy="57" rx="4.5" ry="2.5" className="fill-[#0e1218] dark:fill-[#080b0f] stroke-black/30 dark:stroke-white/15 stroke-[0.8]" />
            <ellipse cx="40" cy="57" rx="4.5" ry="2.5" className="fill-[#0e1218] dark:fill-[#080b0f] stroke-black/30 dark:stroke-white/15 stroke-[0.8]" />
          </g>
        )}

        {/* Mascot Waving Arm (Chatbot variant) */}
        {variant === "chatbot" && (
          <path
            ref={handRef}
            d="M48 38 C53 35 56 31 54 28 C52 26 49 29 46 33"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="stroke-[#141922] dark:stroke-[#0c1016]"
          />
        )}

        {/* Eyes: Expressive Clean White Sclera with dark pupils */}
        <g id="eyes-group">
          {/* Left Eye */}
          <g ref={leftEyeRef} className="left-eye">
            <ellipse
              cx="25.5"
              cy="34"
              rx="4.8"
              ry="5.8"
              className="fill-white"
            />
            {/* Pupil */}
            <circle
              ref={leftPupilRef}
              cx="26"
              cy="34"
              r="2.8"
              className="fill-[#0c1016]"
            />
            {/* Eye Highlight Glint */}
            <circle cx="24.8" cy="32.5" r="1.1" className="fill-white" />
          </g>

          {/* Right Eye */}
          <g ref={rightEyeRef} className="right-eye">
            <ellipse
              cx="38.5"
              cy="34"
              rx="4.8"
              ry="5.8"
              className="fill-white"
            />
            {/* Pupil */}
            <circle
              ref={rightPupilRef}
              cx="38"
              cy="34"
              r="2.8"
              className="fill-[#0c1016]"
            />
            {/* Eye Highlight Glint */}
            <circle cx="36.8" cy="32.5" r="1.1" className="fill-white" />
          </g>
        </g>

        {/* Subtle Rosy Blush Dots */}
        <ellipse cx="19" cy="40.5" rx="2.4" ry="1.4" fill="rgba(244, 114, 182, 0.45)" />
        <ellipse cx="45" cy="40.5" rx="2.4" ry="1.4" fill="rgba(244, 114, 182, 0.45)" />

        {/* Minimal Subtle Mouth (Cute smile) */}
        <path
          d="M30 40 Q32 42 34 40"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="dark:stroke-white/80 stroke-white/90"
        />
      </svg>

      {/* Hover Tooltip if specified */}
      {tooltipText && isHovered && (
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-tile/95 px-2 py-0.5 font-mono text-[10px] font-semibold text-ink shadow-md backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          {tooltipText}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import {
  PORTRAIT_LIGHT_SRC,
  ThemedPortrait,
} from "@/components/themed-portrait";

export interface CardItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  accent: string;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: "card-1",
    title: "CNHS LEARN",
    category: "School Data System",
    image: "/projects/ayumirich/03-product-grid.png",
    accent: "#8b5cf6",
  },
  {
    id: "card-2",
    title: "Power BI Analytics",
    category: "Business Intelligence",
    image: "/projects/ayumirich/02-shop-catalog.png",
    accent: "#f59e0b",
  },
  {
    id: "card-3",
    title: "Teacher Anne Portal",
    category: "School Management",
    image: "/projects/ayumirich/05-marketing-showcase.png",
    accent: "#10b981",
  },
  {
    id: "card-4",
    title: "Ayumi Rich Merch",
    category: "E-Commerce Catalog",
    image: "/projects/ayumirich/01-hero-landing.png",
    accent: "#ec4899",
  },
  {
    id: "card-5",
    title: "Yukari Tenshi Nemoto",
    category: "IT & Business Analytics",
    image: PORTRAIT_LIGHT_SRC,
    accent: "#3b82f6",
  },
];

interface CardShufflePreloaderProps {
  brandTitle?: string;
  brandTagline?: string;
  minDuration?: number; // Minimum preloader duration in seconds (default 2.0s)
  cards?: CardItem[];
  onComplete?: () => void;
}

export function CardShufflePreloader({
  brandTitle = "YUKARI TENSHI NEMOTO",
  brandTagline = "PORTFOLIO · 2026",
  minDuration = 2.0,
  cards = DEFAULT_CARDS,
  onComplete,
}: CardShufflePreloaderProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING PORTFOLIO ENGINE...");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const darkCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFinished) return;

    // Skip repeat plays within a session + honor reduced-motion on phones
    try {
      if (sessionStorage.getItem("portfolio-preloader-seen") === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsFinished(true);
        return;
      }
    } catch {
      // sessionStorage unavailable — play once as usual
    }

    const isMobileLoader =
      typeof window !== "undefined" && window.innerWidth < 640;
    const effectiveDuration = isMobileLoader
      ? Math.min(minDuration, 1.2)
      : minDuration;

    const container = containerRef.current;
    const cardNodes = cardElementsRef.current.filter(Boolean) as HTMLDivElement[];
    const counterNode = counterRef.current;
    const progressNode = progressLineRef.current;
    const darkCurtainNode = darkCurtainRef.current;

    if (!container || cardNodes.length === 0) return;

    // Lock body scroll while preloader runs
    document.body.style.overflow = "hidden";

    // Base angles for 3D Fan Arc Out (narrower on phones to avoid overflow)
    const fanAngles = [-14, -7, 0, 7, 14];
    const fanXOffsets = isMobileLoader
      ? [-64, -32, 0, 32, 64]
      : [-120, -60, 0, 60, 120];

    // Initial state: Cards stacked in center
    cardNodes.forEach((card, i) => {
      gsap.set(card, {
        rotateZ: (i - 2) * 2,
        scale: 0.75,
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        left: "50%",
        transformOrigin: "center bottom",
        zIndex: i + 1,
        opacity: 0,
        y: 20,
      });
    });

    // 1. Entrance Pop
    gsap.to(cardNodes, {
      opacity: 1,
      y: 0,
      scale: 0.88,
      duration: 0.6,
      stagger: 0.06,
      ease: "back.out(1.4)",
    });

    // 2. Continuous Micro Sine Motion while loading
    const floatTimelines: gsap.core.Timeline[] = [];
    cardNodes.forEach((card, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(card, {
        y: `+=${dir * 4}`,
        rotateZ: `+=${dir * 1.5}`,
        duration: 1.2 + i * 0.15,
        ease: "sine.inOut",
      });
      floatTimelines.push(tl);
    });

    // 3. Counter & Fan Out Interpolation
    const counterObj = { val: 0 };
    const counterTween = gsap.to(counterObj, {
      val: 100,
      duration: effectiveDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        const currentVal = Math.min(100, Math.floor(counterObj.val));
        const progress = currentVal / 100;

        if (counterNode) {
          counterNode.textContent = String(currentVal).padStart(3, "0");
        }
        if (progressNode) {
          progressNode.style.width = `${currentVal}%`;
        }

        // Dynamic Status Ticker
        if (currentVal < 30) {
          setStatusText("INITIALIZING PORTFOLIO ENGINE...");
        } else if (currentVal < 65) {
          setStatusText("LOADING SYSTEMS & ANALYTICS DATA...");
        } else if (currentVal < 90) {
          setStatusText("COMPILING UI BLUEPRINTS...");
        } else {
          setStatusText("EXPERIENCE READY");
        }

        // Smoothly Fan Cards Out as progress increases
        cardNodes.forEach((card, i) => {
          const targetAngle = fanAngles[i % fanAngles.length] * progress;
          const targetX = fanXOffsets[i % fanXOffsets.length] * progress;
          gsap.to(card, {
            rotateZ: targetAngle,
            x: targetX,
            scale: 0.85 + progress * 0.1,
            duration: 0.2,
            overwrite: "auto",
          });
        });
      },
      onComplete: () => {
        // Stop floating sine animation
        floatTimelines.forEach((t) => t.kill());

        // 4. MASTER REVEAL TIMELINE — Smooth Dark Curtain Transition into Portfolio
        const revealTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            try {
              sessionStorage.setItem("portfolio-preloader-seen", "1");
            } catch {
              // ignore private-mode failures
            }
            gsap.set(container, { display: "none" });
            setIsFinished(true);
            if (onComplete) onComplete();
          },
        });

        // Step A: Snap cards back into aligned deck
        revealTl.to(cardNodes, {
          rotateZ: 0,
          x: 0,
          scale: 0.8,
          duration: 0.35,
          ease: "power3.inOut",
        });

        // Step B: Pure Dark Curtain slides UP smoothly over Light Canvas
        if (darkCurtainNode) {
          revealTl.to(
            darkCurtainNode,
            {
              y: "0%",
              duration: 0.7,
              ease: "power4.inOut",
            },
            "+=0.05"
          );
        }

        // Step C: Fade out preloader container
        revealTl.to(
          container,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2"
        );
      },
    });

    return () => {
      counterTween.kill();
      floatTimelines.forEach((t) => t.kill());
      document.body.style.overflow = "";
    };
  }, [isFinished, minDuration, onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      id="card-shuffle-preloader"
      suppressHydrationWarning
      className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#faf9f5] text-neutral-900 select-none overflow-hidden"
      style={{ pointerEvents: "auto" }}
      aria-label="Loading portfolio"
    >
      {/* Blueprint Grid Overlay (Light Theme) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* 1. DARK CURTAIN SWEEP (Seamless transition to dark theme website) */}
      <div
        ref={darkCurtainRef}
        className="absolute inset-0 bg-[#000000] z-50 pointer-events-none"
        style={{
          transform: "translateY(100%)",
          boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500" />
      </div>

      {/* TOP HEADER: Clean Editorial Branding */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="size-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-900 uppercase">
            {brandTitle}
          </span>
        </div>
        <span className="font-mono text-[11px] font-medium tracking-wider text-neutral-500 uppercase hidden sm:block">
          {brandTagline}
        </span>
      </header>

      {/* CENTER STAGE: 3D CARD FAN DECK */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto w-full px-4">
        <div
          ref={cardStackRef}
          className="relative h-[240px] w-[170px] sm:h-[290px] sm:w-[205px]"
          style={{ perspective: "1200px" }}
        >
          {cards.map((card, idx) => {
            const isHovered = hoveredCardId === card.id;
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardElementsRef.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`absolute h-full w-full rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                  isHovered
                    ? "border-neutral-900 shadow-[0_25px_50px_rgba(0,0,0,0.25)] -translate-y-3 scale-105 z-40"
                    : "border-neutral-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 20px 45px -5px rgba(0,0,0,0.22), 0 0 25px ${card.accent}44`
                    : undefined,
                }}
              >
                {/* Card Thumbnail */}
                {card.id === "card-5" ? (
                  <div className="relative h-full w-full">
                    <ThemedPortrait
                      alt={card.title}
                      sizes="220px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                ) : card.image ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="220px"
                      priority
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-neutral-100 to-neutral-200" />
                )}

                {/* Card Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <span
                    className="font-mono text-[9px] uppercase tracking-wider font-semibold block truncate"
                    style={{ color: card.accent }}
                  >
                    {card.category}
                  </span>
                  <span className="font-display text-xs font-bold text-white block truncate mt-0.5">
                    {card.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* BOTTOM FOOTER: COUNTER & DYNAMIC STATUS TICKER */}
      <footer className="relative z-10 flex flex-col items-center gap-3 pb-8 sm:pb-10 w-full max-w-md mx-auto px-6 text-center">
        {/* Dynamic Status Ticker */}
        <p className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase h-4">
          {statusText}
        </p>

        {/* Counter Number */}
        <div className="flex items-baseline gap-1 font-mono text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          <span ref={counterRef} className="tabular-nums">
            000
          </span>
          <span className="text-sm font-semibold text-neutral-400">%</span>
        </div>

        {/* Minimal Progress Track */}
        <div className="h-[3px] w-36 sm:w-48 rounded-full bg-neutral-200 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full bg-neutral-900 rounded-full transition-none"
            style={{ width: "0%" }}
          />
        </div>
      </footer>
    </div>
  );
}


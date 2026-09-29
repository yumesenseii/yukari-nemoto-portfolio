"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { markLoaderDone } from "@/lib/loader-ready";

export interface CardItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  accent: string;
}

interface CardShufflePreloaderProps {
  brandTitle?: string;
  brandTagline?: string;
  minDuration?: number; // Minimum preloader duration in seconds (default 1.8s)
  cards?: CardItem[];
  onComplete?: () => void;
}

/**
 * Lightweight brand preloader for Yukari Nemoto.
 *
 * Deliberately image-free and GSAP-free: monogram + wordmark + counter are
 * pure CSS keyframes, progress runs on a single rAF loop, and the handoff
 * is one CSS transform transition. Safe for low-end devices.
 */
export function CardShufflePreloader({
  brandTitle = "YUKARI TENSHI NEMOTO",
  brandTagline = "PORTFOLIO · 2026",
  minDuration = 1.8,
  onComplete,
}: CardShufflePreloaderProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFinished) return;

    // Repeat view: the boot script already hid the loader pre-paint via
    // html[data-preloader]; just unmount for cleanliness.
    try {
      if (sessionStorage.getItem("portfolio-preloader-seen") === "1") {
        markLoaderDone();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsFinished(true);
        return;
      }
    } catch {
      // sessionStorage unavailable — play once as usual
    }

    const isMobileLoader = window.innerWidth < 640;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    // Reduced motion / data-saver: shortest run, straight to fade-out
    const liteMode =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData === true;
    const minMs = liteMode
      ? 200
      : (isMobileLoader ? Math.min(minDuration, 1.4) : minDuration) * 1000;

    // Real readiness signal: the counter may only hit 100 once the page's
    // critical assets (images, video metadata, fonts) have actually loaded.
    // Safety cap forces completion so a stalled asset can never trap the UI.
    let pageReady = document.readyState === "complete";
    const onPageLoad = () => {
      pageReady = true;
    };
    if (!pageReady) {
      window.addEventListener("load", onPageLoad);
    }

    // Lock body scroll while preloader runs
    document.body.style.overflow = "hidden";

    let raf = 0;
    const timers: number[] = [];

    const finish = () => {
      setLeaving(true);
      timers.push(
        window.setTimeout(() => {
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("portfolio-preloader-seen", "1");
            document.documentElement.setAttribute("data-preloader", "seen");
          } catch {
            // ignore private-mode failures
          }
          // Release gated entrance animations after the loader is gone.
          markLoaderDone();
          setIsFinished(true);
          onComplete?.();
        }, 220),
      );
    };

    timers.push(window.setTimeout(onPageLoad, minMs + 3000));

    const paint = (val: number) => {
      const v = Math.min(100, Math.floor(val));
      if (counterRef.current) {
        counterRef.current.textContent = String(v).padStart(3, "0");
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${v}%`;
      }
    };

    const t0 = performance.now();
    let sweepStart = 0;
    const tick = (now: number) => {
      const t = now - t0;

      // Phase 1 — crawl toward 92 while waiting for min time + real load.
      // Parks at ~92 (never 100) until the page is genuinely ready.
      if (t < minMs || !pageReady) {
        const p = Math.min(1, t / minMs);
        paint(92 * (1 - Math.pow(1 - p, 2)));
        raf = requestAnimationFrame(tick);
        return;
      }

      // Phase 2 — page is ready: sweep 92 → 100, then fade out.
      if (liteMode) {
        finish();
        return;
      }
      if (!sweepStart) sweepStart = now;
      const fp = Math.min(1, (now - sweepStart) / 300);
      paint(92 + 8 * fp);
      if (fp < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      finish();
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("load", onPageLoad);
      document.body.style.overflow = "";
    };
  }, [isFinished, minDuration, onComplete]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      id="card-shuffle-preloader"
      suppressHydrationWarning
      role="status"
      aria-label="Loading portfolio"
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6 overflow-hidden bg-page px-6 text-ink select-none transition-opacity duration-200",
        leaving && "opacity-0",
      )}
      style={{ pointerEvents: "auto" }}
    >
      {/* Brand monogram */}
      <div className="loader-pop relative z-10 flex size-16 items-center justify-center rounded-2xl border border-line bg-tile font-display text-xl font-bold tracking-tight shadow-xs">
        YN
      </div>

      {/* Brand wordmark with staggered letter reveal */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <p
          aria-hidden
          className="font-display text-sm font-bold uppercase tracking-[0.22em] sm:text-base"
        >
          {brandTitle.split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="loader-letter"
              style={{ animationDelay: `${80 + i * 25}ms` }}
            >
              {ch === " " ? " " : ch}

            </span>
          ))}
        </p>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
          {brandTagline}
        </p>
      </div>

      {/* Counter + progress */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <p
          aria-hidden
          className="flex items-baseline gap-1 font-mono text-3xl font-bold tracking-tight tabular-nums"
        >
          <span ref={counterRef}>000</span>
          <span className="text-xs font-semibold text-muted">%</span>
        </p>
        <div className="h-[3px] w-40 overflow-hidden rounded-full bg-line">
          <div
            ref={progressRef}
            aria-hidden
            className="loader-bar h-full rounded-full bg-ink"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

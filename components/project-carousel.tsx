"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Folder,
} from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { cn } from "@/lib/cn";
import { projects } from "@/lib/data";

type ProjectCarouselProps = {
  className?: string;
};

export function ProjectCarousel({ className }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const total = projects.length;
  const project = projects[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch gesture support for mobile swiping
  const minSwipeDistance = 45;

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow)] sm:p-7 flex flex-col justify-between",
        className,
      )}
    >
      {/* Header section with category icon and link */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="flex size-8 items-center justify-center rounded-lg bg-tile text-brown">
              <Folder className="size-4" strokeWidth={1.75} />
            </span>
            <span>Projects</span>
          </div>

          <Link
            href="/projects"
            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-blue transition-colors duration-200 hover:text-ink"
          >
            View all projects
            <ArrowUpRight className="size-3.5" strokeWidth={2} />
          </Link>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted">
          An enrollment system, a student workspace, and a merch shop.
        </p>
      </div>

      {/* Prominent, Elevated Floating Active Project Card */}
      <div
        className="group relative mt-6 flex flex-col rounded-2xl border border-line/80 bg-sidebar/95 p-5 shadow-[0_12px_32px_-8px_rgba(28,25,22,0.08)] transition-all duration-300 hover:shadow-[0_20px_40px_-8px_rgba(28,25,22,0.12)] dark:bg-[#0a0a0a] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)] sm:p-6"
        onTouchStart={onTouchStartHandler}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEndHandler}
      >
        {/* 1. Top media/preview container with overlaid navigation chevrons */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line/60 bg-tile">
          <ProjectVisual
            kind={project.visual}
            uid={`carousel-${project.slug}`}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />

          {/* Left chevron button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-line/70 bg-sidebar/90 text-ink shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-sidebar active:scale-95 sm:size-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="size-4 sm:size-5" strokeWidth={2.25} />
          </button>

          {/* Right chevron button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-line/70 bg-sidebar/90 text-ink shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-sidebar active:scale-95 sm:size-10"
            aria-label="Next project"
          >
            <ChevronRight className="size-4 sm:size-5" strokeWidth={2.25} />
          </button>
        </div>

        {/* 2. Below preview: Category tag, Bold Title, Description */}
        <div className="mt-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
            {project.category}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
            {project.did}
          </p>
        </div>

        {/* 3. Flexible row of tech stack badge pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-line bg-tile px-3 py-1 text-xs font-medium text-ink/80 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 4. Primary dark CTA button at the bottom */}
        <Link
          href={project.demoUrl}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-sm font-semibold text-[#f3f6f9] shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.99] dark:bg-[#f4f1ec] dark:text-[#1c1916] dark:hover:bg-white"
        >
          <span>Live Demo</span>
          <ArrowUpRight className="size-4" strokeWidth={2.25} />
        </Link>
      </div>

      {/* Pagination tracker beneath active card */}
      <div className="mt-6 flex items-center justify-between px-1 sm:px-2">
        {/* Numeric step counter */}
        <span className="font-mono text-xs font-semibold tracking-widest text-muted">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        {/* Smooth active progress bar */}
        <div className="mx-3 h-1.5 flex-1 max-w-[130px] overflow-hidden rounded-full bg-line/80 sm:mx-4 sm:max-w-[180px]">
          <div
            className="h-full rounded-full bg-blue transition-all duration-400 ease-out"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Clickable navigation dots/pips */}
        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-300",
                i === currentIndex
                  ? "w-6 bg-blue"
                  : "w-2 bg-line hover:bg-muted/40",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

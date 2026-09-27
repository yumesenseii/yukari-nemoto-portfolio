"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { cn } from "@/lib/cn";
import { ProjectItem } from "@/lib/data";

interface ProjectMediaProps {
  project: ProjectItem;
  isActive?: boolean;
  className?: string;
  priority?: boolean;
  slideInterval?: number; // milliseconds per slide, default 3400
}

export function ProjectMedia({
  project,
  isActive = true,
  className,
  priority = false,
  slideInterval = 3400,
}: ProjectMediaProps) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slideshow state for image-based prototypes
  const images = project.images || [];
  const hasImages = images.length > 0;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync video play/pause with isActive
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  // Handle slideshow auto-advance
  const nextSlide = useCallback(() => {
    if (images.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    if (images.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!hasImages || !isActive || isPaused || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, slideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasImages, isActive, isPaused, isHovered, nextSlide, slideInterval]);

  // 1. Video presentation branch
  if (!videoError && project.videoUrl) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-tile", className)}>
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          playsInline
          loop
          preload="metadata"
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // 2. Video-style presentation reel for Figma prototype images
  if (hasImages) {
    return (
      <div
        className={cn(
          "group/media relative h-full w-full overflow-hidden bg-[#131b26] select-none",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Render stacked slides with Ken-Burns motion on active slide */}
        {images.map((imgSrc, idx) => {
          const isCurrent = idx === currentSlide;

          return (
            <div
              key={imgSrc}
              aria-hidden={!isCurrent}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <div
                className={cn(
                  "relative h-full w-full transform transition-transform duration-[3800ms] ease-out",
                  isCurrent ? "scale-105 translate-y-[-1%]" : "scale-100 translate-y-0"
                )}
              >
                <Image
                  src={imgSrc}
                  alt={`${project.title} - screen ${idx + 1}`}
                  fill
                  priority={priority && idx === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          );
        })}

        {/* Video Reel Gradient Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/35"
        />

        {/* Top Header Badge: Figma Prototype Indicator */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-semibold text-white/90 shadow-sm">
            <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>FIGMA PROTOTYPE</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">
              {String(currentSlide + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Top-Right Pause/Play Status Indicator (Reveals on Hover) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused((p) => !p);
          }}
          className={cn(
            "absolute top-3 right-3 z-30 flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-opacity duration-200 hover:bg-black/80",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-label={isPaused ? "Resume preview" : "Pause preview"}
        >
          {isPaused ? <Play className="size-3 text-emerald-400 fill-emerald-400" /> : <Pause className="size-3 text-white" />}
        </button>

        {/* Hover Navigation Chevrons */}
        <div
          className={cn(
            "absolute inset-y-0 inset-x-2 z-30 flex items-center justify-between pointer-events-none transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="pointer-events-auto flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 hover:bg-black/80"
            aria-label="Previous screen"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="pointer-events-auto flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 hover:bg-black/80"
            aria-label="Next screen"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Bottom Slide Indicators & Animated Video Progress Line */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-2.5 sm:p-3 space-y-1.5">
          {/* Synchronized slide indicator dots */}
          <div className="flex items-center justify-center gap-1.5">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(dotIdx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  dotIdx === currentSlide
                    ? "w-6 bg-white shadow-xs"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Jump to screen ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Running progress bar simulating video playback */}
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              key={currentSlide}
              className={cn(
                "h-full rounded-full bg-blue transition-all ease-linear",
                isActive && !isPaused && !isHovered ? "w-full" : "w-0"
              )}
              style={{
                transitionDuration: isActive && !isPaused && !isHovered ? `${slideInterval}ms` : "0ms",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. Fallback to vector art if no media exists
  return (
    <ProjectVisual
      kind={project.visual}
      uid={`media-${project.slug}`}
      className={cn("h-full w-full", className)}
    />
  );
}

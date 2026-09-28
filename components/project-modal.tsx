"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  X,
} from "lucide-react";
import { FigmaLogo } from "@/components/brand-icons";
import { ProjectMedia } from "@/components/project-media";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";
import { defaultProjectTheme, ProjectItem, projectThemes } from "@/lib/data";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const themeContext = useTheme();
  const isDark = themeContext?.theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!project) return;

    setActiveImageIndex(0);
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !mounted) return null;

  const theme = projectThemes[project.slug] || defaultProjectTheme;
  const hasImages = project.images && project.images.length > 0;
  const hasVideo = Boolean(project.videoUrl);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/35 backdrop-blur-sm dark:bg-black/75 dark:backdrop-blur-md transition-all duration-200 animate-in fade-in"
      onClick={onClose}
    >
      {/* Modal Container — Compact & Non-Stretchable */}
      <div
        className={cn(
          "relative flex w-full max-w-4xl lg:max-w-5xl flex-col rounded-3xl border border-line/80 bg-card shadow-2xl transition-all duration-300 animate-in zoom-in-95 overflow-hidden dark:border-white/10",
          theme.activeBorder,
        )}
        style={{
          boxShadow: isDark
            ? `0 25px 60px -15px ${theme.glowColor}, 0 0 45px rgba(0,0,0,0.6)`
            : `0 24px 50px -12px rgba(15, 23, 42, 0.14), 0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 16px 36px -10px ${theme.glowColor}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute right-3.5 top-3.5 z-30 flex size-8 cursor-pointer items-center justify-center rounded-full border border-line bg-card/90 text-muted shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-ink hover:text-ink active:scale-95 sm:right-5 sm:top-5"
        >
          <X className="size-4" strokeWidth={2.2} />
        </button>

        {/* Modal Content — Compact, Balanced & Non-Scrollable on Desktop */}
        <div className="max-h-[90vh] overflow-y-auto lg:overflow-visible p-5 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
            {/* LEFT COLUMN: Visual Media / Interactive Preview (lg:col-span-7) */}
            <div className="space-y-3.5 lg:col-span-7">
              {/* Media Player / Showcase Stage */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/80 bg-tile shadow-inner">
                {hasVideo ? (
                  /* HTML5 Video with Full Browser Controls */
                  <video
                    src={project.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : hasImages ? (
                  /* Figma Prototype Screenshot Carousel */
                  <div className="relative h-full w-full">
                    <Image
                      src={project.images![activeImageIndex]}
                      alt={`${project.title} preview screenshot ${activeImageIndex + 1}`}
                      fill
                      priority
                      className="object-cover transition-opacity duration-300"
                    />

                    {/* Image navigation controls if multiple images */}
                    {project.images!.length > 1 && (
                      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between pointer-events-none">
                        <span className="rounded-lg bg-black/70 px-2 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-sm pointer-events-auto">
                          {activeImageIndex + 1} / {project.images!.length}
                        </span>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === 0
                                  ? project.images!.length - 1
                                  : prev - 1,
                              )
                            }
                            className="flex size-7 cursor-pointer items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === project.images!.length - 1
                                  ? 0
                                  : prev + 1,
                              )
                            }
                            className="flex size-7 cursor-pointer items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black"
                            aria-label="Next image"
                          >
                            <ChevronRight className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Live Reel Media Fallback */
                  <ProjectMedia
                    project={project}
                    isActive={true}
                    priority
                    className="h-full w-full"
                  />
                )}
              </div>

              {/* Thumbnail Selector (When multiple images exist, e.g. Ayumi Rich) */}
              {hasImages && project.images!.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
                  {project.images!.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={cn(
                        "relative aspect-[16/10] h-12 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all duration-200",
                        activeImageIndex === i
                          ? cn("ring-2 scale-105", theme.activeBorder)
                          : "border-line/70 opacity-60 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Direct Files & Live Action Links Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {/* Figma Prototype Link */}
                {project.prototypeUrl && (
                  <a
                    href={project.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-tile/70 px-4 py-2 text-xs font-semibold text-ink shadow-xs transition-all hover:border-ink hover:bg-tile active:scale-98"
                  >
                    <FigmaLogo className="size-3.5" />
                    <span>Open Figma Prototype</span>
                    <ArrowUpRight className="size-3 text-muted" />
                  </a>
                )}

                {/* Live Demo Link */}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-tile/70 px-4 py-2 text-xs font-semibold text-ink shadow-xs transition-all hover:border-ink hover:bg-tile active:scale-98"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Visit Live Website</span>
                  </a>
                )}

                {/* Power BI .PBIX Workbook Download */}
                {project.pbixUrl && (
                  <a
                    href={project.pbixUrl}
                    download={project.pbixFileName || `${project.slug}.pbix`}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-tile/70 px-4 py-2 text-xs font-semibold text-ink shadow-xs transition-all hover:border-ink hover:bg-tile active:scale-98"
                  >
                    <Download className="size-3.5 text-blue-500" />
                    <span>Download .PBIX</span>
                  </a>
                )}

                {/* Direct External Actions (PBIX download, Live demo, Figma prototype) */}
              </div>
            </div>

            {/* RIGHT COLUMN: Project Intelligence & Architecture (lg:col-span-5) */}
            <div className="flex flex-col justify-center space-y-3.5 lg:col-span-5">
              {/* Category & Year Header Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase transition-colors",
                    theme.badgeBg,
                    theme.badgeBorder,
                    theme.badgeText,
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", theme.dotColor)} />
                  <span>{project.category}</span>
                </div>

                <span className="rounded-full border border-line bg-tile px-2 py-0.5 font-mono text-[10px] font-semibold text-muted">
                  {project.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2
                  id="modal-project-title"
                  className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink leading-tight"
                >
                  {project.title}
                </h2>
                <p className="mt-0.5 text-xs font-medium text-muted">
                  {project.subtitle}
                </p>
              </div>

              {/* Concise Overview Description */}
              <p className="text-xs text-muted leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Role & Client / Team Compact Strip */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-line/70 bg-tile/50 px-3 py-1.5 text-xs">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={cn("size-1.5 rounded-full", theme.dotColor)} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Role:
                  </span>
                  <span className="font-semibold text-ink text-xs">
                    {project.role}
                  </span>
                </div>
                {(project.client || project.team) && (
                  <div className="flex items-center gap-1 text-[11px] text-muted">
                    <span className="text-[10px] uppercase tracking-wider">•</span>
                    <span>{project.client || project.team}</span>
                  </div>
                )}
              </div>

              {/* Key Highlights (Punchy Bullet Points - 3 items max) */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Key Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs">
                    {project.features.slice(0, 3).map((feature, i) => {
                      const parts = feature.split(":");
                      const headline = parts[0];
                      const snippet = parts[1]?.trim();
                      return (
                        <li key={i} className="flex items-start gap-2 text-ink/90">
                          <span
                            className={cn(
                              "size-1.5 rounded-full mt-1.5 shrink-0",
                              theme.dotColor,
                            )}
                          />
                          <div className="leading-snug">
                            <span className="font-semibold text-ink">{headline}</span>
                            {snippet && (
                              <span className="text-muted text-[11px]">
                                {" "}— {snippet}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Primary Tech Stack Pills */}
              {project.toolsList && project.toolsList.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.toolsList.slice(0, 6).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-line bg-tile px-2 py-0.5 text-[10px] font-medium text-ink/90"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

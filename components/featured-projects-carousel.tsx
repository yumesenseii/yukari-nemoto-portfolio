"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSidebar } from "@/components/app-shell";
import { ChibiMascot } from "@/components/chibi-mascot";
import { ProjectMedia } from "@/components/project-media";
import { ProjectModal } from "@/components/project-modal";
import { cn } from "@/lib/cn";
import { defaultProjectTheme, ProjectItem, projects, projectThemes } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedProjectsCarousel() {
  const router = useRouter();
  const { collapsed } = useSidebar();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevArrowRef = useRef<SVGSVGElement>(null);
  const nextArrowRef = useRef<SVGSVGElement>(null);

  // Interaction tracking refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const activeIdxRef = useRef(0);

  // Mouse & Touch Drag physics refs
  const dragStartXRef = useRef<number | null>(null);
  const dragDeltaXRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const total = projects.length;

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // Section entrance reveal
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".featured-header",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  // Compute responsive horizontal offset for side cards
  const getCardOffset = useCallback(() => {
    if (typeof window === "undefined") return 320;
    if (window.innerWidth >= 1280) return 340;
    if (window.innerWidth >= 1024) return 300;
    if (window.innerWidth >= 768) return 240;
    if (window.innerWidth >= 640) return 190;
    return 0; // mobile
  }, []);

  // Synchronize layout of ALL cards in the stage
  // Guarantees zero overlapping or ghosting cards regardless of total count
  const animateStage = useCallback(
    (newActive: number, direction: 1 | -1, immediate = false) => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile =
        typeof window !== "undefined" && window.innerWidth < 640;
      const offset = getCardOffset();

      const prevIdx = (newActive - 1 + total) % total;
      const nextIdx = (newActive + 1) % total;

      // Animate counter text
      if (counterRef.current) {
        gsap.fromTo(
          counterRef.current,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        );
      }

      // Animate progress bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${((newActive + 1) / total) * 100}%`,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // IMMEDIATE or REDUCED MOTION: Deterministically position every single card
      if (immediate || prefersReducedMotion) {
        projects.forEach((_, idx) => {
          const card = cardRefs.current[idx];
          if (!card) return;

          // Clear any conflicting tweens
          gsap.killTweensOf(card);

          if (idx === newActive) {
            gsap.set(card, {
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotateY: 0,
              zIndex: 30,
              pointerEvents: "auto",
              display: "block",
            });
          } else if (idx === prevIdx) {
            gsap.set(card, {
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              x: isMobile ? -600 : -offset,
              y: 0,
              scale: isMobile ? 0.8 : 0.88,
              opacity: isMobile ? 0 : 0.55,
              rotateY: isMobile ? 0 : 3,
              zIndex: 15,
              pointerEvents: isMobile ? "none" : "auto",
              display: isMobile ? "none" : "block",
            });
          } else if (idx === nextIdx) {
            gsap.set(card, {
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              x: isMobile ? 600 : offset,
              y: 0,
              scale: isMobile ? 0.8 : 0.88,
              opacity: isMobile ? 0 : 0.55,
              rotateY: isMobile ? 0 : -3,
              zIndex: 15,
              pointerEvents: isMobile ? "none" : "auto",
              display: isMobile ? "none" : "block",
            });
          } else {
            // ALL OTHER CARDS: Hidden, zero opacity, no pointer events, display none
            gsap.set(card, {
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              x: idx < newActive ? -offset * 1.5 : offset * 1.5,
              y: 0,
              scale: 0.75,
              opacity: 0,
              rotateY: 0,
              zIndex: 0,
              pointerEvents: "none",
              display: "none",
            });
          }
        });
        return;
      }

      // ANIMATED 3D TRANSITION TIMELINE
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.65 },
      });

      const activeCard = cardRefs.current[newActive];
      const prevCard = cardRefs.current[prevIdx];
      const nextCard = cardRefs.current[nextIdx];
      const activeMedia = mediaContainerRefs.current[newActive];

      // Ensure active media subtle punch
      if (activeMedia) {
        tl.fromTo(
          activeMedia,
          { scale: 0.96 },
          { scale: 1.0, duration: 0.65, ease: "power3.out" },
          0,
        );
      }

      // Hide all non-active, non-side cards immediately
      projects.forEach((_, idx) => {
        if (idx !== newActive && idx !== prevIdx && idx !== nextIdx) {
          const card = cardRefs.current[idx];
          if (card) {
            gsap.killTweensOf(card);
            gsap.to(card, {
              opacity: 0,
              scale: 0.75,
              duration: 0.25,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(card, { display: "none", pointerEvents: "none", zIndex: 0 });
              },
            });
          }
        }
      });

      // Direction === 1: ADVANCING FORWARD (Right -> Center, Center -> Left, Next enters from right)
      if (direction === 1) {
        // 1. Right card moves into Center Active
        if (activeCard) {
          gsap.set(activeCard, { display: "block", zIndex: 30, pointerEvents: "auto" });
          tl.to(
            activeCard,
            {
              x: 0,
              y: 0,
              xPercent: -50,
              yPercent: -50,
              scale: 1,
              opacity: 1,
              rotateY: 0,
            },
            0,
          );
        }

        // 2. Previous Active moves to Left Previous
        if (prevCard) {
          gsap.set(prevCard, { display: isMobile ? "none" : "block", zIndex: 15, pointerEvents: isMobile ? "none" : "auto" });
          tl.to(
            prevCard,
            {
              x: isMobile ? -600 : -offset,
              y: 0,
              xPercent: -50,
              yPercent: -50,
              scale: isMobile ? 0.8 : 0.88,
              opacity: isMobile ? 0 : 0.55,
              rotateY: isMobile ? 0 : 3,
            },
            0,
          );
        }

        // 3. New Next card glides in from right
        if (nextCard) {
          gsap.set(nextCard, {
            display: isMobile ? "none" : "block",
            zIndex: 15,
            pointerEvents: isMobile ? "none" : "auto",
            x: isMobile ? 600 : offset + 50,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0.82,
            opacity: 0,
            rotateY: isMobile ? 0 : -5,
          });
          tl.to(
            nextCard,
            {
              x: isMobile ? 600 : offset,
              scale: isMobile ? 0.8 : 0.88,
              opacity: isMobile ? 0 : 0.55,
              rotateY: isMobile ? 0 : -3,
              duration: 0.55,
            },
            0.1,
          );
        }
      }
      // Direction === -1: MOVING BACKWARD (Left -> Center, Center -> Right, Prev enters from left)
      else {
        // 1. Left card moves into Center Active
        if (activeCard) {
          gsap.set(activeCard, { display: "block", zIndex: 30, pointerEvents: "auto" });
          tl.to(
            activeCard,
            {
              x: 0,
              y: 0,
              xPercent: -50,
              yPercent: -50,
              scale: 1,
              opacity: 1,
              rotateY: 0,
            },
            0,
          );
        }

        // 2. Previous Active moves to Right Next
        if (nextCard) {
          gsap.set(nextCard, { display: isMobile ? "none" : "block", zIndex: 15, pointerEvents: isMobile ? "none" : "auto" });
          tl.to(
            nextCard,
            {
              x: isMobile ? 600 : offset,
              y: 0,
              xPercent: -50,
              yPercent: -50,
              scale: isMobile ? 0.8 : 0.88,
              opacity: isMobile ? 0 : 0.55,
              rotateY: isMobile ? 0 : -3,
            },
            0,
          );
        }

        // 3. New Prev card glides in from left
        if (prevCard) {
          gsap.set(prevCard, {
            display: isMobile ? "none" : "block",
            zIndex: 15,
            pointerEvents: isMobile ? "none" : "auto",
            x: isMobile ? -600 : -offset - 50,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0.82,
            opacity: 0,
            rotateY: isMobile ? 0 : 5,
          });
          tl.to(
            prevCard,
            {
              x: isMobile ? -600 : -offset,
              scale: isMobile ? 0.8 : 0.88,
              opacity: isMobile ? 0 : 0.55,
              rotateY: isMobile ? 0 : 3,
              duration: 0.55,
            },
            0.1,
          );
        }
      }
    },
    [getCardOffset, total],
  );

  // Initial layout & resize handling
  useEffect(() => {
    animateStage(activeIdxRef.current, 1, true);

    const handleResize = () => {
      animateStage(activeIdxRef.current, 1, true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [animateStage]);

  // Recalculate stage when sidebar collapses or expands
  useEffect(() => {
    animateStage(activeIdxRef.current, 1, true);
    const timer = setTimeout(() => {
      animateStage(activeIdxRef.current, 1, true);
    }, 520);
    return () => clearTimeout(timer);
  }, [collapsed, animateStage]);

  // Navigate to target index
  const goTo = useCallback(
    (targetIndex: number, direction: 1 | -1) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      setActiveIdx(targetIndex);
      animateStage(targetIndex, direction);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 650);
    },
    [animateStage],
  );

  const handleNext = useCallback(() => {
    const current = activeIdxRef.current;
    const next = (current + 1) % total;
    goTo(next, 1);
  }, [goTo, total]);

  const handlePrev = useCallback(() => {
    const current = activeIdxRef.current;
    const prev = (current - 1 + total) % total;
    goTo(prev, -1);
  }, [goTo, total]);

  // Clean auto-advance timer (5.5s)
  const resetTimer = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    autoPlayTimerRef.current = setInterval(() => {
      if (!isInteractingRef.current) {
        handleNext();
      }
    }, 5500);
  }, [handleNext]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [resetTimer]);

  const onUserNavigateNext = useCallback(() => {
    handleNext();
    resetTimer();
  }, [handleNext, resetTimer]);

  const onUserNavigatePrev = useCallback(() => {
    handlePrev();
    resetTimer();
  }, [handlePrev, resetTimer]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        onUserNavigatePrev();
      } else if (e.key === "ArrowRight") {
        onUserNavigateNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUserNavigateNext, onUserNavigatePrev]);

  // Mouse & Touch Drag physics for desktop and mobile
  const handleDragStart = (clientX: number) => {
    dragStartXRef.current = clientX;
    dragDeltaXRef.current = 0;
    isDraggingRef.current = false;
    isInteractingRef.current = true;
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartXRef.current === null) return;
    const diff = clientX - dragStartXRef.current;
    dragDeltaXRef.current = diff;
    if (Math.abs(diff) > 8) {
      isDraggingRef.current = true;
    }
  };

  const handleDragEnd = () => {
    isInteractingRef.current = false;
    resetTimer();

    const diff = dragDeltaXRef.current;
    dragStartXRef.current = null;
    dragDeltaXRef.current = 0;

    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        onUserNavigateNext();
      } else {
        onUserNavigatePrev();
      }
    }

    // Brief timeout to prevent accidental card navigation clicks on swipe
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  // Nav button subtle hover animations (GSAP)
  const onPrevBtnEnter = () => {
    if (prevBtnRef.current) {
      gsap.to(prevBtnRef.current, {
        scale: 1.06,
        borderColor: "rgba(59, 130, 246, 0.6)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (prevArrowRef.current) {
      gsap.to(prevArrowRef.current, {
        x: -4,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const onPrevBtnLeave = () => {
    if (prevBtnRef.current) {
      gsap.to(prevBtnRef.current, {
        scale: 1,
        borderColor: "var(--line)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (prevArrowRef.current) {
      gsap.to(prevArrowRef.current, {
        x: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const onNextBtnEnter = () => {
    if (nextBtnRef.current) {
      gsap.to(nextBtnRef.current, {
        scale: 1.06,
        borderColor: "rgba(59, 130, 246, 0.6)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (nextArrowRef.current) {
      gsap.to(nextArrowRef.current, {
        x: 4,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const onNextBtnLeave = () => {
    if (nextBtnRef.current) {
      gsap.to(nextBtnRef.current, {
        scale: 1,
        borderColor: "var(--line)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (nextArrowRef.current) {
      gsap.to(nextArrowRef.current, {
        x: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  // Side Card Hover Interaction
  const onSideCardEnter = (idx: number) => {
    if (idx === activeIdxRef.current) return;
    const card = cardRefs.current[idx];
    if (card) {
      gsap.to(card, {
        scale: 0.91,
        opacity: 0.72,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const onSideCardLeave = (idx: number) => {
    if (idx === activeIdxRef.current) return;
    const card = cardRefs.current[idx];
    if (card) {
      gsap.to(card, {
        scale: 0.88,
        opacity: 0.55,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  // Active Card Subtle Hover Interaction
  const onActiveCardMouseEnter = () => {
    const activeCard = cardRefs.current[activeIdxRef.current];
    if (activeCard) {
      gsap.to(activeCard, {
        y: -4,
        scale: 1.015,
        borderColor: "rgba(59, 130, 246, 0.75)",
        duration: 0.25,
        ease: "power2.out",
      });
      const arrow = activeCard.querySelector(".active-arrow");
      if (arrow) {
        gsap.to(arrow, { x: 4, duration: 0.2, ease: "power2.out" });
      }
    }
  };

  const onActiveCardMouseLeave = () => {
    const activeCard = cardRefs.current[activeIdxRef.current];
    if (activeCard) {
      gsap.to(activeCard, {
        y: 0,
        scale: 1.0,
        borderColor: "rgba(59, 130, 246, 0.5)",
        duration: 0.25,
        ease: "power2.out",
      });
      const arrow = activeCard.querySelector(".active-arrow");
      if (arrow) {
        gsap.to(arrow, { x: 0, duration: 0.2, ease: "power2.out" });
      }
    }
  };

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      onMouseEnter={() => {
        isInteractingRef.current = true;
      }}
      onMouseLeave={() => {
        isInteractingRef.current = false;
      }}
      className="relative py-8 sm:py-12 border-t border-line/70 select-none"
    >
      {/* SECTION HEADER: Title, Counter, Animated Progress, Nav Buttons */}
      <div className="featured-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue" />
            <h2 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-muted">
              FEATURED PROJECTS
            </h2>
            <ChibiMascot
              variant="peeking"
              size={28}
              className="ml-1 -mb-1 opacity-80 hover:opacity-100 transition-opacity"
              tooltipText="Peek! 👀"
            />
          </div>
          <p className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
            Selected Works &amp; Projects
          </p>
        </div>

        {/* Controls, synchronized 01/05 counter & View all link */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5">
            <span
              ref={counterRef}
              className="font-mono text-xs font-semibold tracking-wider text-muted tabular-nums"
            >
              {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <div className="h-1.5 w-16 lg:w-24 overflow-hidden rounded-full bg-line/80">
              <div
                ref={progressBarRef}
                className="h-full rounded-full bg-blue transition-none"
                style={{
                  width: `${((activeIdx + 1) / total) * 100}%`,
                }}
              />
            </div>
          </div>

          <Link
            href="/projects"
            className="hidden items-center gap-1.5 text-xs font-semibold text-blue transition-colors hover:text-ink sm:inline-flex"
          >
            <span>View all projects</span>
            <ArrowRight className="size-3.5" />
          </Link>

          {/* Previous / Next buttons */}
          <div className="flex items-center gap-1.5">
            <button
              ref={prevBtnRef}
              type="button"
              onClick={onUserNavigatePrev}
              onMouseEnter={onPrevBtnEnter}
              onMouseLeave={onPrevBtnLeave}
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-line bg-card text-ink shadow-xs transition-colors hover:border-blue hover:bg-tile active:scale-95"
              aria-label="Previous project"
              title="Previous project (←)"
            >
              <ChevronLeft
                ref={prevArrowRef}
                className="size-4"
                strokeWidth={2}
              />
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              onClick={onUserNavigateNext}
              onMouseEnter={onNextBtnEnter}
              onMouseLeave={onNextBtnLeave}
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-line bg-card text-ink shadow-xs transition-colors hover:border-blue hover:bg-tile active:scale-95"
              aria-label="Next project"
              title="Next project (→)"
            >
              <ChevronRight
                ref={nextArrowRef}
                className="size-4"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3D DEPTH STAGE: Interactive Mouse Drag & Touch Flick */}
      <div
        className="relative mt-4 sm:mt-6 w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.targetTouches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.targetTouches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={stageRef}
          className="relative mx-auto flex h-[470px] sm:h-[500px] md:h-[520px] w-full items-center justify-center"
          style={{ perspective: "1100px" }}
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIdx;
            const theme = projectThemes[project.slug] || defaultProjectTheme;

            return (
              <div
                key={project.slug}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseEnter={() => !isActive && onSideCardEnter(idx)}
                onMouseLeave={() => !isActive && onSideCardLeave(idx)}
                onClick={(e) => {
                  // Suppress click navigation if user was dragging/swiping
                  if (isDraggingRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  if (!isActive) {
                    const prevIdx = (activeIdx - 1 + total) % total;
                    goTo(idx, idx === prevIdx ? -1 : 1);
                    resetTimer();
                  } else {
                    setActiveModalProject(project);
                  }
                }}
                className={cn(
                  "absolute group/card",
                  "w-[90%] max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[490px]",
                  "rounded-3xl border bg-card transition-shadow duration-300 will-change-transform",
                  isActive
                    ? cn("cursor-pointer ring-1", theme.activeBorder)
                    : "cursor-pointer border-line/75 shadow-lg hover:border-line",
                )}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: isActive
                    ? `0 20px 50px -10px rgba(0,0,0,0.65), 0 0 35px ${theme.glowColor}`
                    : undefined,
                }}
              >
                {/* Clickable Card Content */}
                <div
                  onMouseEnter={() => isActive && onActiveCardMouseEnter()}
                  onMouseLeave={() => isActive && onActiveCardMouseLeave()}
                  className="flex flex-col justify-between p-4 sm:p-5"
                >
                  <div>
                    {/* Media Container with HTML5 Video or Interactive Reel */}
                    <div
                      ref={(el) => {
                        mediaContainerRefs.current[idx] = el;
                      }}
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/60 bg-tile will-change-transform"
                    >
                      <ProjectMedia
                        project={project}
                        isActive={isActive}
                        className="h-full w-full"
                      />

                      {/* Side card subtle dimming overlay to enhance 3D depth */}
                      {!isActive && (
                        <div className="pointer-events-none absolute inset-0 bg-black/35 transition-opacity duration-300" />
                      )}
                    </div>

                    {/* Metadata & Category with Brand Dot */}
                    <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono text-muted">
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <span
                          className={cn("size-1.5 rounded-full shrink-0", theme.dotColor)}
                        />
                        <span className="truncate font-medium">
                          {project.category}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-md border border-line bg-tile px-2 py-0.5 font-semibold text-ink">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      className={cn(
                        "mt-1.5 font-display text-lg sm:text-xl font-bold tracking-tight text-ink transition-colors duration-200 truncate",
                        isActive && theme.accentText,
                      )}
                    >
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5 overflow-hidden max-h-[56px]">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line bg-tile px-2 py-0.5 text-[10px] font-medium text-ink/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
                    {isActive ? (
                      <div
                        className={cn(
                          "group/link flex w-full items-center justify-between transition-colors group-hover/card:text-ink",
                          theme.accentText,
                        )}
                      >
                        <span className="text-xs font-semibold">
                          View
                        </span>
                        <div
                          className={cn(
                            "flex size-7 items-center justify-center rounded-lg border border-line bg-tile text-ink transition-all duration-200 group-hover/card:text-white",
                            theme.hoverBorder,
                          )}
                        >
                          <ArrowRight
                            className="active-arrow size-3.5 transition-transform duration-200 group-hover/card:translate-x-1"
                            strokeWidth={2.25}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-between text-muted">
                        <span className="text-xs font-medium">
                          Click to select
                        </span>
                        <div className="flex size-7 items-center justify-center rounded-lg border border-line/60 bg-tile/60 text-muted">
                          <ArrowRight className="size-3.5" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE NAVIGATION STRIP: Clickable Pills + Keyboard & Drag Hints */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        {/* Interactive Clickable Project Pills */}
        <div className="flex items-center gap-2">
          {projects.map((proj, i) => {
            const isCur = i === activeIdx;
            const pTheme = projectThemes[proj.slug] || defaultProjectTheme;

            return (
              <button
                key={proj.slug}
                type="button"
                onClick={() => {
                  if (i === activeIdx) return;
                  goTo(i, i > activeIdx ? 1 : -1);
                  resetTimer();
                }}
                className={cn(
                  "group/dot relative flex items-center justify-center cursor-pointer rounded-full transition-all duration-300",
                  isCur
                    ? "h-2.5 w-8 shadow-sm"
                    : "h-2.5 w-2.5 bg-line hover:w-5 hover:bg-muted/50",
                )}
                style={{
                  backgroundColor: isCur ? pTheme.primary : undefined,
                }}
                aria-label={`Jump to ${proj.title}`}
                title={proj.title}
              >
                {/* Floating tooltip on hover */}
                <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-ink px-2 py-0.5 text-[10px] font-medium text-sidebar opacity-0 shadow-sm transition-opacity group-hover/dot:opacity-100 dark:bg-card dark:text-ink border border-line">
                  {proj.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right side helper info */}
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px]">
            <kbd className="rounded border border-line bg-tile px-1.5 py-0.5 text-[10px] font-semibold text-ink">
              ←
            </kbd>
            <kbd className="rounded border border-line bg-tile px-1.5 py-0.5 text-[10px] font-semibold text-ink">
              →
            </kbd>
            <span>or drag / click side cards to explore</span>
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-muted sm:hidden">
            {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Project Quick-View Pop-up Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Check,
  Code2,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";

type WorkflowNode = {
  id: number;
  label: string;
  sublabel: string;
  icon: typeof Zap;
};

const nodes: WorkflowNode[] = [
  {
    id: 0,
    label: "Lead comes in",
    sublabel: "Client brief & scope",
    icon: Zap,
  },
  {
    id: 1,
    label: "Tag & route",
    sublabel: "UI/UX & architecture",
    icon: Tag,
  },
  {
    id: 2,
    label: "Build & test",
    sublabel: "Next.js & database",
    icon: Code2,
  },
  {
    id: 3,
    label: "Launch & handoff",
    sublabel: "Production ready",
    icon: Calendar,
  },
];

export function WorkflowIntroOverlay() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [cableProgress, setCableProgress] = useState<number[]>([0, 0, 0]);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Finish and smoothly dissolve the overlay
  const finishWorkflow = useCallback(() => {
    setIsDissolving(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenWorkflowIntro", "true");
    }
    setTimeout(() => {
      setMounted(false);
    }, 700);
  }, []);

  // Run the sequence step by step
  const runSequence = useCallback(() => {
    setActiveStep(0);
    setCompletedSteps([]);
    setCableProgress([0, 0, 0]);
    setIsDissolving(false);

    // Step 0: Node 0 lights up (0ms - 500ms)
    timerRef.current = setTimeout(() => {
      setCompletedSteps([0]);

      // Cable 0 fills (500ms - 1100ms)
      setCableProgress([100, 0, 0]);
      setActiveStep(1);

      timerRef.current = setTimeout(() => {
        setCompletedSteps([0, 1]);

        // Cable 1 fills (1100ms - 1700ms)
        setCableProgress([100, 100, 0]);
        setActiveStep(2);

        timerRef.current = setTimeout(() => {
          setCompletedSteps([0, 1, 2]);

          // Cable 2 fills (1700ms - 2300ms)
          setCableProgress([100, 100, 100]);
          setActiveStep(3);

          timerRef.current = setTimeout(() => {
            setCompletedSteps([0, 1, 2, 3]);

            // Final completion pause before dissolution (2300ms - 3100ms)
            timerRef.current = setTimeout(() => {
              finishWorkflow();
            }, 850);
          }, 600);
        }, 600);
      }, 600);
    }, 550);
  }, [finishWorkflow]);

  // Initial mount check
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenWorkflowIntro");
    if (!hasSeen) {
      const startTimer = setTimeout(() => {
        setMounted(true);
        runSequence();
      }, 50);
      return () => clearTimeout(startTimer);
    }
  }, [runSequence]);

  // Support replaying via custom event
  useEffect(() => {
    const handleReplay = () => {
      setMounted(true);
      setIsDissolving(false);
      setTimeout(() => {
        runSequence();
      }, 100);
    };

    window.addEventListener("replay-intro", handleReplay);
    return () => window.removeEventListener("replay-intro", handleReplay);
  }, [runSequence]);

  // Keyboard shortcut to skip (Escape or Enter)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        if (mounted && !isDissolving) {
          finishWorkflow();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mounted, isDissolving, finishWorkflow]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome Introduction"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-10 transition-all duration-700 select-none overflow-hidden",
        "bg-[#faf8f5] text-[#0d1b2a] dark:bg-[#000000] dark:text-[#f5f2eb]",
        isDissolving
          ? "opacity-0 -translate-y-4 pointer-events-none scale-[1.01] blur-xs"
          : "opacity-100 translate-y-0 scale-100",
      )}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-b from-[#b87d4f]/15 to-transparent blur-3xl dark:from-[#b87d4f]/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-10 size-[450px] rounded-full bg-[#152b47]/10 blur-3xl dark:bg-[#234d7d]/15"
        aria-hidden
      />

      {/* TOP BAR: Monogram + Skip Button */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl border border-line bg-card font-display text-xs font-bold text-ink shadow-xs">
            YN
          </div>
          <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-muted">
            YUKARI NEMOTO · BSIT
          </span>
        </div>

        <button
          type="button"
          onClick={finishWorkflow}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-line bg-card/80 px-4 py-2 text-xs font-semibold text-ink shadow-xs backdrop-blur-md transition-all duration-200 hover:border-brown hover:bg-tile hover:shadow-md active:scale-95"
        >
          <span>Skip Intro</span>
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2.2}
          />
        </button>
      </header>

      {/* CENTER: Main Headline & Pipeline Workflow */}
      <main className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-4xl py-6">
        {/* Editorial Headline */}
        <div className="text-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-brown mb-5 shadow-xs">
            <Sparkles className="size-3" />
            <span>AUTOMATED WORKFLOW EXECUTION</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]">
            Photos, edits, and systems{" "}
            <span className="text-brown dark:text-[#d4976a]">
              that feel finished.
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            Executing end-to-end design, development, and analytics pipeline.
          </p>
        </div>

        {/* WORKFLOW PIPELINE COMPONENT (MATCHING REFERENCE IMAGE) */}
        <div className="mt-14 sm:mt-20 w-full px-2 sm:px-6">
          <div className="relative flex items-center justify-between">
            {/* 3 Interconnecting Glowing Cable Segments */}
            <div className="absolute left-[12%] right-[12%] top-8 sm:top-10 -translate-y-1/2 flex items-center justify-between -z-0">
              {[0, 1, 2].map((idx) => {
                const filled = cableProgress[idx] === 100;
                return (
                  <div
                    key={idx}
                    className="relative flex-1 mx-2 sm:mx-4 h-1 rounded-full bg-[#e3ded5] dark:bg-[#1f1f1f] overflow-hidden"
                  >
                    {/* Glowing laser fill beam */}
                    <div
                      style={{ width: `${cableProgress[idx]}%` }}
                      className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out",
                        "bg-gradient-to-r from-[#b87d4f] via-[#e28743] to-[#ff7a1a]",
                        filled &&
                          "shadow-[0_0_12px_rgba(255,122,26,0.8),0_0_4px_rgba(255,122,26,1)]",
                      )}
                    />
                  </div>
                );
              })}
            </div>

            {/* 4 Interactive Workflow Nodes */}
            {nodes.map((node) => {
              const Icon = node.icon;
              const isCompleted = completedSteps.includes(node.id);
              const isActive = activeStep === node.id && !isCompleted;

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    // Clicking accelerates to that node
                    if (node.id === 3 && isCompleted) {
                      finishWorkflow();
                    } else {
                      setActiveStep(node.id);
                      setCompletedSteps(
                        Array.from({ length: node.id + 1 }, (_, i) => i),
                      );
                      const newProgress = [
                        node.id >= 1 ? 100 : 0,
                        node.id >= 2 ? 100 : 0,
                        node.id >= 3 ? 100 : 0,
                      ];
                      setCableProgress(newProgress);
                    }
                  }}
                  className="relative z-10 flex flex-col items-center cursor-pointer group"
                >
                  {/* Node Box */}
                  <div
                    className={cn(
                      "relative flex size-15 sm:size-19 items-center justify-center rounded-2xl border transition-all duration-300 shadow-md",
                      "bg-card/95 backdrop-blur-md",
                      // Inactive
                      !isActive &&
                        !isCompleted &&
                        "border-line text-muted hover:border-line-strong hover:scale-105",
                      // Active Node (pulsing orange halo like reference image)
                      isActive &&
                        "border-[#ff7a1a] text-[#ff7a1a] scale-110 shadow-[0_0_28px_rgba(255,122,26,0.35)] ring-4 ring-[#ff7a1a]/20",
                      // Completed Node
                      isCompleted &&
                        "border-emerald-500/70 text-ink shadow-sm hover:scale-105",
                    )}
                  >
                    {/* Lateral Port Knobs (n8n node style ports) */}
                    <span
                      className={cn(
                        "absolute -left-1.5 top-1/2 -translate-y-1/2 size-2.5 rounded-full border bg-card transition-colors duration-200",
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500/20"
                          : isActive
                            ? "border-[#ff7a1a] bg-[#ff7a1a]"
                            : "border-line bg-tile",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute -right-1.5 top-1/2 -translate-y-1/2 size-2.5 rounded-full border bg-card transition-colors duration-200",
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500/20"
                          : isActive
                            ? "border-[#ff7a1a] bg-[#ff7a1a]"
                            : "border-line bg-tile",
                      )}
                    />

                    {/* Node Icon */}
                    <Icon
                      className={cn(
                        "size-5 sm:size-6.5 transition-transform duration-200 group-hover:scale-110",
                        isActive && "text-[#ff7a1a] animate-pulse",
                        isCompleted && "text-ink",
                      )}
                      strokeWidth={1.9}
                    />

                    {/* Green checkmark badge on top right (as shown in reference) */}
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 flex size-5.5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md border-2 border-card animate-in zoom-in-75 duration-200">
                        <Check className="size-3" strokeWidth={3} />
                      </div>
                    )}

                    {/* Active pulse aura when waiting */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-2xl bg-[#ff7a1a]/20 animate-ping pointer-events-none" />
                    )}
                  </div>

                  {/* Label below node */}
                  <div className="mt-3.5 text-center max-w-[90px] sm:max-w-[120px]">
                    <p
                      className={cn(
                        "font-display text-xs sm:text-sm font-bold tracking-tight transition-colors duration-200",
                        isActive && "text-[#ff7a1a]",
                        isCompleted && "text-ink",
                        !isActive && !isCompleted && "text-muted",
                      )}
                    >
                      {node.label}
                    </p>
                    <p className="mt-0.5 hidden sm:block font-mono text-[10px] text-muted/70 leading-tight">
                      {node.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Execution Status & Action Hint */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
              {completedSteps.length < 4 ? (
                <>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7a1a] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#ff7a1a]" />
                  </span>
                  <span className="font-semibold text-ink">
                    Executing workflow...
                  </span>
                  <span className="text-muted/60">
                    (Step {Math.min(activeStep + 1, 4)} of 4)
                  </span>
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Workflow completed · Welcome!
                  </span>
                </>
              )}
            </div>

            {/* Quick interactive hint */}
            <div className="text-[11px] text-muted/70 font-mono">
              Click node to navigate · Esc or Enter to enter
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM FOOTER: Ready indicator */}
      <footer className="relative z-10 w-full max-w-5xl flex items-center justify-between text-[11px] text-muted border-t border-line/60 pt-4">
        <span>BSIT · Business &amp; Data Analytics</span>
        <button
          type="button"
          onClick={finishWorkflow}
          className="cursor-pointer font-semibold text-ink hover:text-brown transition-colors"
        >
          Enter Portfolio Directly →
        </button>
      </footer>
    </div>
  );
}

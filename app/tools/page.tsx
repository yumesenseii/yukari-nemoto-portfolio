"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  CanvaLogo,
  CapCutLogo,
  FigmaLogo,
  LightroomLogo,
  MySqlLogo,
  NextJsLogo,
  PhotoshopLogo,
  PowerBiLogo,
  ReactLogo,
  SupabaseLogo,
  TailwindLogo,
  TypeScriptLogo,
  VercelLogo,
  VsCodeLogo,
  XamppLogo,
} from "@/components/brand-icons";
import { PillButton } from "@/components/pill-button";
import { ToolItem, tools } from "@/lib/data";
import { cn } from "@/lib/cn";

function RealToolLogo({
  logo,
  className = "size-6",
}: {
  logo: ToolItem["logo"];
  className?: string;
}) {
  switch (logo) {
    case "powerbi":
      return <PowerBiLogo className={className} />;
    case "figma":
      return <FigmaLogo className={className} />;
    case "photoshop":
      return <PhotoshopLogo className={className} />;
    case "lightroom":
      return <LightroomLogo className={className} />;
    case "canva":
      return <CanvaLogo className={className} />;
    case "capcut":
      return <CapCutLogo className={className} />;
    case "vscode":
      return <VsCodeLogo className={className} />;
    case "nextjs":
      return <NextJsLogo className={className} />;
    case "react":
      return <ReactLogo className={className} />;
    case "typescript":
      return <TypeScriptLogo className={className} />;
    case "tailwind":
      return <TailwindLogo className={className} />;
    case "mysql":
      return <MySqlLogo className={className} />;
    case "vercel":
      return <VercelLogo className={className} />;
    case "supabase":
      return <SupabaseLogo className={className} />;
    case "xampp":
      return <XamppLogo className={className} />;
    default:
      return null;
  }
}

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  // Close modal on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedTool) {
        setSelectedTool(null);
      }
    },
    [selectedTool],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTool) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTool]);

  const filterCategories = [
    "All",
    "Data & Analytics",
    "Frontend",
    "Backend & Cloud",
    "Creative & Design",
    "Dev Tools",
  ] as const;

  type FilterCategory = (typeof filterCategories)[number];

  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: tools.length };
    filterCategories.forEach((cat) => {
      if (cat === "All") return;
      counts[cat] = tools.filter((tool) => {
        if (tool.filterCategories) return tool.filterCategories.includes(cat);
        if (cat === "Creative & Design") return tool.group === "Creative & Multimedia Production";
        if (cat === "Frontend") return ["Next.js", "React", "TypeScript", "Tailwind CSS"].includes(tool.name);
        if (cat === "Backend & Cloud") return ["Supabase", "Vercel", "XAMPP", "MySQL"].includes(tool.name);
        if (cat === "Dev Tools") return ["VS Code", "XAMPP", "Vercel", "Power BI"].includes(tool.name);
        if (cat === "Data & Analytics") return ["Power BI", "MySQL"].includes(tool.name);
        return false;
      }).length;
    });
    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    let result = [...tools];

    if (selectedFilter !== "All") {
      result = result.filter((tool) => {
        if (tool.filterCategories) return tool.filterCategories.includes(selectedFilter);
        if (selectedFilter === "Creative & Design") return tool.group === "Creative & Multimedia Production";
        if (selectedFilter === "Frontend") return ["Next.js", "React", "TypeScript", "Tailwind CSS"].includes(tool.name);
        if (selectedFilter === "Backend & Cloud") return ["Supabase", "Vercel", "XAMPP", "MySQL"].includes(tool.name);
        if (selectedFilter === "Dev Tools") return ["VS Code", "XAMPP", "Vercel", "Power BI"].includes(tool.name);
        if (selectedFilter === "Data & Analytics") return ["Power BI", "MySQL"].includes(tool.name);
        return true;
      });
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((tool) => {
        const inName = tool.name.toLowerCase().includes(q);
        const inDesc = tool.desc.toLowerCase().includes(q);
        const inCat = tool.category.toLowerCase().includes(q);
        const inUsed = tool.usedFor?.some((u) => u.toLowerCase().includes(q));
        return inName || inDesc || inCat || inUsed;
      });
    }

    return result;
  }, [selectedFilter, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 sm:space-y-14 py-4">
      {/* 1. PAGE HEADER — Refined Editorial Hierarchy */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between border-b border-line/70 pb-10 sm:pb-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-tile/70 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-muted">
            <Sparkles className="size-3 text-brown" />
            <span>Curated Stack &amp; Toolkit</span>
          </div>

          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
            Tools &amp; Technologies
          </h1>

          <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-muted">
            The software, frameworks, and creative applications I use daily to engineer
            systems, grade visual media, and ship production-ready digital products.
          </p>
        </div>

        <div className="pt-2 sm:pt-4">
          <PillButton href="/contact">Get in touch</PillButton>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {filterCategories.map((cat) => {
              const isActive = selectedFilter === cat;
              const count = categoryCounts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFilter(cat)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-150",
                    isActive
                      ? "bg-ink text-sidebar shadow-xs dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
                      : "border border-line bg-card/60 text-muted hover:border-line/90 hover:text-ink hover:bg-tile/70",
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 font-mono text-[10px]",
                      isActive
                        ? "bg-sidebar/20 text-sidebar dark:bg-ink/20 dark:text-ink"
                        : "bg-tile text-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, skills, or stacks..."
              className="h-9 w-full rounded-xl border border-line bg-card/70 pl-8 pr-7 text-xs text-ink placeholder:text-muted/70 focus:border-blue focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted hover:text-ink"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* Counter Info Banner */}
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} active across client &amp; academic projects
            </span>
          </span>
          {selectedFilter !== "All" && (
            <button
              type="button"
              onClick={() => setSelectedFilter("All")}
              className="cursor-pointer text-blue hover:underline font-medium"
            >
              Show all stacks →
            </button>
          )}
        </div>

        {/* 3. RESPONSIVE BENTO GRID */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="group relative flex flex-col justify-between cursor-pointer rounded-2xl border border-line/80 bg-card p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-line hover:shadow-lg dark:hover:border-white/20"
              >
                <div>
                  {/* Top: Logo container & Category badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex size-13 shrink-0 items-center justify-center rounded-xl border border-line bg-tile/70 p-2.5 shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:-translate-y-0.5 dark:bg-[#121212]/90"
                      style={{
                        boxShadow: `0 6px 20px -6px ${tool.brandGlow || "rgba(0,0,0,0.06)"}`,
                      }}
                    >
                      <RealToolLogo logo={tool.logo} className="size-6.5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-line bg-tile/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {tool.category}
                      </span>

                      <div className="flex size-6 items-center justify-center rounded-lg text-muted/70 transition-all duration-200 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  {/* Tool Name */}
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink group-hover:text-blue transition-colors">
                    {tool.name}
                  </h3>

                  {/* Short description */}
                  <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
                    {tool.desc}
                  </p>

                  {/* Capability Chips Preview */}
                  {tool.usedFor && tool.usedFor.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {tool.usedFor.slice(0, 2).map((cap) => (
                        <span
                          key={cap}
                          className="rounded-md border border-line/60 bg-tile/50 px-2 py-0.5 text-[10px] font-medium text-muted/90 dark:bg-white/[0.03] dark:border-white/[0.05]"
                        >
                          {cap}
                        </span>
                      ))}
                      {tool.usedFor.length > 2 && (
                        <span className="rounded-md border border-line/40 bg-tile/30 px-1.5 py-0.5 text-[10px] font-mono text-muted/60">
                          +{tool.usedFor.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom context indicator */}
                <div className="mt-5 border-t border-line/50 pt-3 flex items-center justify-between text-[11px] text-muted/80">
                  <span>
                    {tool.relatedProjects && tool.relatedProjects.length > 0
                      ? `${tool.relatedProjects.length} connected project${
                          tool.relatedProjects.length > 1 ? "s" : ""
                        }`
                      : "Core technology"}
                  </span>
                  <span className="text-muted/60 group-hover:text-ink transition-colors font-medium">
                    Inspect tool →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="rounded-2xl border border-line bg-card p-12 text-center shadow-xs">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-tile text-muted">
              <Search className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">
              No tools found
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted max-w-sm mx-auto">
              Try searching with another keyword or reset your active category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFilter("All");
                setSearchQuery("");
              }}
              className="mt-5 cursor-pointer rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-sidebar dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. STUDIO SPECIMEN MODAL (Bespoke & Editorial) */}
      {selectedTool && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-tool-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop with Blur */}
          <div
            onClick={() => setSelectedTool(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity dark:bg-black/85"
            aria-hidden
          />

          {/* Studio Specimen Card */}
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl border border-line/80 bg-card p-6 sm:p-7 shadow-2xl transition-all overflow-hidden dark:bg-[#0c0e12] dark:border-white/[0.08]"
            style={{
              boxShadow: `0 24px 60px -15px rgba(0, 0, 0, 0.6), 0 0 30px ${selectedTool.brandGlow || "rgba(0,0,0,0.1)"}`,
            }}
          >
            {/* Ambient Brand Halo */}
            <div
              className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full blur-3xl opacity-20 dark:opacity-25"
              style={{ backgroundColor: selectedTool.brandColor || "#3b82f6" }}
            />

            {/* Header */}
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-tile/90 p-3 shadow-xs dark:bg-white/[0.04] dark:border-white/[0.08]"
                  style={{
                    boxShadow: `0 8px 24px -6px ${selectedTool.brandGlow || "rgba(0,0,0,0.1)"}`,
                  }}
                >
                  <RealToolLogo logo={selectedTool.logo} className="size-7" />
                </div>

                <div>
                  <h3
                    id="modal-tool-title"
                    className="font-display text-2xl font-bold tracking-tight text-ink"
                  >
                    {selectedTool.name}
                  </h3>
                  <div className="mt-1 text-xs text-muted">
                    <span className="font-medium text-ink/80">{selectedTool.category}</span>
                  </div>
                </div>
              </div>

              {/* Close Button + Keyboard ESC Indicator */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center rounded-md border border-line/70 bg-tile/80 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-muted uppercase">
                  ESC
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTool(null)}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-line bg-tile/70 text-muted transition-all hover:scale-105 hover:border-ink hover:text-ink active:scale-95"
                  aria-label="Close dialog"
                >
                  <X className="size-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="relative mt-4 text-xs sm:text-sm text-muted leading-relaxed font-sans">
              {selectedTool.desc}
            </p>

            {/* Core Capabilities & Workflow Chips (Replaces Checklist) */}
            {selectedTool.usedFor && selectedTool.usedFor.length > 0 && (
              <div className="relative mt-5 border-t border-line/60 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[11px] font-semibold tracking-wider uppercase text-muted/90 flex items-center gap-1.5">
                    <Layers className="size-3 text-muted/70" />
                    <span>Core Capabilities &amp; Workflow</span>
                  </h4>
                  <span className="text-[10px] text-muted/60 font-mono">
                    {selectedTool.usedFor.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedTool.usedFor.map((capability) => (
                    <div
                      key={capability}
                      className="inline-flex items-center rounded-xl border border-line/70 bg-tile/60 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-ink/30 dark:bg-white/[0.03] dark:border-white/[0.07]"
                    >
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applied in Production / Related Projects */}
            {selectedTool.relatedProjects &&
              selectedTool.relatedProjects.length > 0 && (
                <div className="relative mt-5 border-t border-line/60 pt-4">
                  <h4 className="text-[11px] font-semibold tracking-wider uppercase text-muted/90 mb-3">
                    Featured in Projects
                  </h4>

                  <div className="grid grid-cols-1 gap-2">
                    {selectedTool.relatedProjects.map((project) => (
                      <Link
                        key={project.title}
                        href="/projects"
                        onClick={() => setSelectedTool(null)}
                        className="group flex cursor-pointer items-center justify-between rounded-xl border border-line/70 bg-tile/50 px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-line hover:bg-tile/90 hover:shadow-xs dark:bg-white/[0.02] dark:border-white/[0.06] dark:hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-card border border-line/70 text-ink/70 group-hover:text-ink group-hover:border-ink/40 transition-colors">
                            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                              {project.title}
                            </p>
                            {project.role && (
                              <p className="text-[11px] text-muted/80">
                                {project.role}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] font-medium text-muted/70 group-hover:text-ink transition-colors">
                          View project →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Refined Footer */}
            <div className="relative mt-6 flex items-center justify-between border-t border-line/60 pt-4">
              <Link
                href="/projects"
                onClick={() => setSelectedTool(null)}
                className="text-xs font-semibold text-muted hover:text-ink transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore all projects</span>
                <ArrowUpRight className="size-3" />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                className="cursor-pointer rounded-xl border border-line/80 bg-tile/80 px-4 py-1.5 text-xs font-semibold text-ink shadow-xs transition-all hover:bg-tile active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

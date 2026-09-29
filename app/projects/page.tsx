"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import { ProjectVisual } from "@/components/project-visual";
import { ProjectModal } from "@/components/project-modal";
import { Magnetic } from "@/components/magnetic-button";
import { cn } from "@/lib/cn";
import { defaultProjectTheme, ProjectItem, projects, projectThemes } from "@/lib/data";

const filterOptions = [
  "All",
  "Systems",
  "Web",
  "UI/UX",
  "Academic",
  "Client",
] as const;

type FilterType = (typeof filterOptions)[number];
type SortType = "latest" | "oldest" | "alpha";

const sortOptions: { value: SortType; label: string; hint: string }[] = [
  { value: "latest", label: "Sort by: Latest", hint: "Newest first" },
  { value: "oldest", label: "Sort by: Oldest", hint: "Oldest first" },
  { value: "alpha", label: "Sort by: A–Z", hint: "Alphabetical" },
];

function ProjectsPageInner() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Deep-link support: top search bar / chatbot navigate here with ?q=
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  useEffect(() => {
    if (qParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery(qParam);
    }
  }, [qParam]);
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const totalProjects = projects.length;
  const featuredProject = projects[featuredIndex];
  const featuredTheme =
    projectThemes[featuredProject.slug] || defaultProjectTheme;

  // Handle click outside & escape key to close custom sort dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrevFeatured = () => {
    setFeaturedIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  };

  const handleNextFeatured = () => {
    setFeaturedIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  };

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter category
    if (selectedFilter !== "All") {
      result = result.filter((p) =>
        p.filterCategories.includes(selectedFilter),
      );
    }

    // Search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const inTitle = p.title.toLowerCase().includes(q);
        const inSubtitle = p.subtitle.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inCategory = p.category.toLowerCase().includes(q);
        const inYear = p.year.toLowerCase().includes(q);
        const inRole = p.role.toLowerCase().includes(q);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const inTools = p.toolsList?.some((tool) =>
          tool.toLowerCase().includes(q),
        );
        return (
          inTitle ||
          inSubtitle ||
          inDesc ||
          inCategory ||
          inYear ||
          inRole ||
          inTags ||
          inTools
        );
      });
    }

    // Sorting
    if (sortBy === "latest") {
      result.sort((a, b) => Number(b.year) - Number(a.year));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => Number(a.year) - Number(b.year));
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedFilter, sortBy]);

  // Secondary "Other projects" list (excluding featured if in "All" mode without active search)
  const otherProjects = useMemo(() => {
    if (selectedFilter === "All" && !searchQuery.trim()) {
      return filteredProjects.filter((p) => p.slug !== featuredProject.slug);
    }
    return filteredProjects;
  }, [featuredProject.slug, filteredProjects, searchQuery, selectedFilter]);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort by: Latest";

  return (
    <div className="space-y-16 sm:space-y-20 py-4">
      {/* 1. PROJECT PAGE HEADER */}
      <section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-line/70 pb-12 sm:pb-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-tile/70 px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-brown">
            <span className="size-1.5 rounded-full bg-brown" />
            <span>SELECTED WORK</span>
          </div>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
            Projects I’ve
            <br />
            <span className="text-brown">worked on.</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between lg:justify-end gap-6 sm:gap-10">
          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-muted">
            A collection of academic, client, and personal projects across system
            analysis, design, and web development.
          </p>

          <div className="flex shrink-0 flex-col items-start sm:items-end rounded-2xl border border-line bg-card px-5 py-3 shadow-xs">
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {String(projects.length).padStart(2, "0")}+
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
              Projects
            </span>
          </div>
        </div>
      </section>

      {/* 2. PROJECT FILTERS & SORT BAR */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={cn(
                  "cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-150",
                  isActive
                    ? "bg-[#1a2230] text-[#f5f2eb] dark:bg-[#f5f2eb] dark:text-[#0a0d12] shadow-xs"
                    : "border border-line bg-card/60 text-muted hover:border-blue/40 hover:text-ink hover:bg-tile/70",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tags..."
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

          {/* Interactive Custom Sort Dropdown */}
          <div ref={sortRef} className="relative flex items-center">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
              className={cn(
                "group flex h-9 cursor-pointer items-center justify-between gap-2.5 rounded-xl border bg-card/80 px-3.5 text-xs font-medium text-ink transition-all duration-200",
                isSortOpen
                  ? "border-blue ring-2 ring-blue/20 bg-card shadow-xs"
                  : "border-line hover:border-blue/50 hover:bg-tile/70",
              )}
            >
              <span>{currentSortLabel}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-muted transition-transform duration-200 group-hover:text-ink",
                  isSortOpen && "rotate-180 text-blue",
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isSortOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full z-50 mt-1.5 min-w-[190px] overflow-hidden rounded-2xl border border-line bg-card/95 p-1.5 shadow-xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted border-b border-line/60 mb-1">
                  Sort Order
                </div>
                {sortOptions.map((option) => {
                  const isSelected = sortBy === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-colors",
                        isSelected
                          ? "bg-tile font-semibold text-blue"
                          : "text-ink hover:bg-tile/70 hover:text-ink",
                      )}
                    >
                      <div className="flex flex-col">
                        <span>{option.label.replace("Sort by: ", "")}</span>
                        <span className="text-[10px] text-muted">
                          {option.hint}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="size-3.5 shrink-0 text-blue" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Settings/Filter Icon */}
          <div className="hidden sm:flex size-9 items-center justify-center rounded-xl border border-line bg-card text-muted shadow-xs">
            <SlidersHorizontal className="size-3.5" />
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECT (Visible when no search or when 'All' is active) */}
      {!searchQuery.trim() && selectedFilter === "All" && (
        <section
          className={cn(
            "glass-plate relative overflow-hidden rounded-3xl border bg-card p-6 transition-all duration-300 sm:p-8 lg:p-10",
            featuredTheme.activeBorder,
          )}
          style={{
            boxShadow: `0 20px 45px -15px ${featuredTheme.glowColor}`,
          }}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Visual Media Preview */}
            <div
              onClick={() => setActiveModalProject(featuredProject)}
              className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/70 bg-tile lg:col-span-7 cursor-pointer"
            >
              <ProjectMedia
                project={featuredProject}
                isActive={true}
                priority
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
              />
            </div>

            {/* Featured Details */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                {/* Header row: Label + Counter & Prev/Next */}
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono font-semibold tracking-wider uppercase transition-colors",
                      featuredTheme.badgeBg,
                      featuredTheme.badgeBorder,
                      featuredTheme.badgeText,
                    )}
                  >
                    <span
                      className={cn("size-2 rounded-full", featuredTheme.dotColor)}
                    />
                    <span>FEATURED PROJECT</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold tracking-wider text-muted">
                      {String(featuredIndex + 1).padStart(2, "0")} /{" "}
                      {String(totalProjects).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrevFeatured}
                      className="flex size-7 cursor-pointer items-center justify-center rounded-lg border border-line bg-tile text-ink transition-colors hover:border-blue active:scale-95"
                      aria-label="Previous featured project"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFeatured}
                      className="flex size-7 cursor-pointer items-center justify-center rounded-lg border border-line bg-tile text-ink transition-colors hover:border-blue active:scale-95"
                      aria-label="Next featured project"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  {featuredProject.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted">
                  {featuredProject.subtitle}
                </p>

                <p
                  className={cn(
                    "mt-3 font-mono text-[11px] font-semibold tracking-wide",
                    featuredTheme.accentText,
                  )}
                >
                  {featuredProject.meta}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted">
                  {featuredProject.description}
                </p>

                {/* Role and Collaboration Metadata Card - Perfectly Aligned */}
                <div className="mt-5 rounded-2xl border border-line/80 bg-tile/50 p-4 transition-all duration-300">
                  <div className="space-y-3">
                    {/* My Role */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-line/60">
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "size-2 rounded-full transition-colors",
                            featuredTheme.dotColor,
                          )}
                        />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
                          My Role
                        </span>
                      </div>
                      <span className="font-display text-xs sm:text-sm font-bold text-ink sm:text-right">
                        {featuredProject.role}
                      </span>
                    </div>

                    {/* Collaboration & Client */}
                    {featuredProject.team && (
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="flex items-center gap-2 shrink-0 pt-0.5">
                          <span className="size-2 rounded-full bg-muted/40" />
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
                            Collaboration
                          </span>
                        </div>
                        <div className="flex flex-col sm:items-end text-xs sm:text-right leading-relaxed">
                          <span className="font-medium text-ink">
                            {featuredProject.team}
                          </span>
                          {featuredProject.client && (
                            <span className="text-[11px] text-muted mt-0.5">
                              Client:{" "}
                              <span className="font-medium text-ink/90">
                                {featuredProject.client}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic strength={6}>
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(featuredProject)}
                    className="group flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs font-semibold text-sidebar shadow-sm transition-all duration-150 hover:opacity-95 active:scale-98 dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
                  >
                    <span>View</span>
                    <ArrowRight
                      className="size-3.5 transition-transform duration-150 group-hover:translate-x-1"
                      strokeWidth={2.25}
                    />
                  </button>
                </Magnetic>

                {featuredProject.pbixUrl ? (
                  <a
                    href={featuredProject.pbixUrl}
                    download={featuredProject.pbixFileName || `${featuredProject.slug}.pbix`}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-card px-4 py-3 text-xs font-semibold text-ink transition-colors hover:border-blue hover:bg-tile"
                  >
                    <Download className="size-3.5 text-blue-500" />
                    <span>Download .PBIX</span>
                  </a>
                ) : featuredProject.demoUrl ? (
                  <a
                    href={featuredProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-3 text-xs font-semibold text-ink transition-colors hover:border-blue hover:bg-tile"
                  >
                    <span>Live System</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : featuredProject.prototypeUrl ? (
                  <a
                    href={featuredProject.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-3 text-xs font-semibold text-ink transition-colors hover:border-blue hover:bg-tile"
                  >
                    <span>Figma Prototype</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. OTHER PROJECTS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-line/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue" />
            <h2 className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-muted">
              {selectedFilter === "All" && !searchQuery.trim()
                ? "OTHER PROJECTS"
                : `FILTERED PROJECTS (${otherProjects.length})`}
            </h2>
          </div>

          {(selectedFilter !== "All" || searchQuery.trim()) && (
            <button
              type="button"
              onClick={() => {
                setSelectedFilter("All");
                setSearchQuery("");
              }}
              className="cursor-pointer text-xs font-semibold text-blue hover:text-ink"
            >
              Reset Filters →
            </button>
          )}
        </div>

        {/* Projects Grid with Brand Themes & Modal Trigger */}
        {otherProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {otherProjects.map((project) => {
              const theme = projectThemes[project.slug] || defaultProjectTheme;

              return (
                <div
                  key={project.slug}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveModalProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }
                  }}
                  className={cn(
                    "glass-plate group relative flex flex-col justify-between rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-blue/30",
                    theme.hoverBorder,
                  )}
                >
                  <div>
                    {/* Large Project Image / Live Presentation Reel */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line/60 bg-tile">
                      <ProjectMedia
                        project={project}
                        isActive={false}
                        className="h-full w-full"
                      />
                    </div>

                    {/* Year & Category Meta with Brand Dot */}
                    <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-muted">
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

                    {/* Title & Subtitle */}
                    <h3
                      className={cn(
                        "mt-2.5 font-display text-xl font-bold tracking-tight text-ink transition-colors duration-200",
                        `group-hover:${theme.accentText}`,
                      )}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted font-medium">
                      {project.subtitle}
                    </p>

                    {/* Short Description */}
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted line-clamp-2">
                      {project.description}
                    </p>

                    {/* Role Badge with Brand Theming */}
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-muted">My Role:</span>
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold transition-colors",
                          theme.badgeBg,
                          theme.badgeBorder,
                          theme.badgeText,
                        )}
                      >
                        {project.role}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-tile px-2.5 py-0.5 text-[10px] font-medium text-muted transition-colors group-hover:border-line/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar: View (modal) and Contextual Direct Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4">
                    {project.pbixUrl || project.demoUrl || project.prototypeUrl ? (
                      <>
                        {/* Choice 1: Quick View Modal */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalProject(project);
                          }}
                          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-sidebar transition-all duration-150 hover:opacity-90 active:scale-95 dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
                        >
                          <span>View</span>
                          <ArrowRight className="size-3" />
                        </button>

                        {/* Choice 2: Contextual Direct Action */}
                        {project.pbixUrl ? (
                          <a
                            href={project.pbixUrl}
                            download={project.pbixFileName || `${project.slug}.pbix`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-tile/70 px-2.5 py-1.5 text-[11px] font-semibold text-ink transition-all hover:border-blue hover:text-blue hover:bg-tile active:scale-95"
                            title={`Download ${project.pbixFileName || "Power BI file"}`}
                          >
                            <Download className="size-3 text-blue-500" />
                            <span>Download .PBIX</span>
                          </a>
                        ) : project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-tile/70 px-2.5 py-1.5 text-[11px] font-semibold text-ink transition-all hover:border-blue hover:text-blue hover:bg-tile active:scale-95"
                            title="Open Live System in new tab"
                          >
                            <span>Live System</span>
                            <ArrowUpRight className="size-3 text-muted" />
                          </a>
                        ) : (
                          <a
                            href={project.prototypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-tile/70 px-2.5 py-1.5 text-[11px] font-semibold text-ink transition-all hover:border-blue hover:text-blue hover:bg-tile active:scale-95"
                            title="Open Figma Prototype"
                          >
                            <span>Figma</span>
                            <ArrowUpRight className="size-3 text-muted" />
                          </a>
                        )}
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-ink px-3.5 py-2 text-xs font-semibold text-sidebar transition-all duration-150 hover:opacity-90 active:scale-98 dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
                      >
                        <span>View</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="rounded-2xl border border-line bg-card p-12 text-center shadow-xs">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-tile text-muted">
              <Search className="size-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">
              No projects found
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted max-w-sm mx-auto">
              Try searching with another keyword or change your active category filter.
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

      {/* Project Quick-View Pop-up Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsPageInner />
    </Suspense>
  );
}

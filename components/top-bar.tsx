"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  Menu,
  Search,
  X,
} from "lucide-react";
import { capabilities, projects, tools } from "@/lib/data";

type TopBarProps = {
  onOpenMobile?: () => void;
};

export function TopBar({ onOpenMobile }: TopBarProps) {
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K or / to focus search, Escape to dismiss
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = searchRef.current?.querySelector("input");
        input?.focus();
        setSearchFocused(true);
      }
      if (e.key === "Escape") {
        setSearchFocused(false);
        (document.activeElement as HTMLElement | null)?.blur?.();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter searchable items
  const q = query.trim().toLowerCase();
  const filteredProjects = q
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    : [];

  const filteredCapabilities = q
    ? capabilities.filter(
        (c) =>
          c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q),
      )
    : [];

  const filteredTools = q
    ? tools.filter((t) => t.name.toLowerCase().includes(q))
    : [];

  const hasResults =
    filteredProjects.length > 0 ||
    filteredCapabilities.length > 0 ||
    filteredTools.length > 0;

  return (
    <header className="sticky top-0 z-30 flex min-h-16 w-full items-center justify-between gap-2 border-b border-line bg-sidebar/85 px-3 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md sm:px-6 lg:px-8">
      {/* Mobile hamburger & Search bar */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {onOpenMobile ? (
          <button
            type="button"
            onClick={onOpenMobile}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line text-ink transition-colors hover:bg-tile lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" strokeWidth={1.8} />
          </button>
        ) : null}

        {/* Search Field */}
        <div ref={searchRef} className="relative w-full max-w-md">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 size-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search projects, tools..."
              enterKeyHint="search"
              autoComplete="off"
              className="h-11 w-full rounded-xl border border-line bg-tile/70 pl-9 pr-10 text-base text-ink placeholder:text-muted/70 focus:border-blue focus:bg-sidebar focus:outline-hidden transition-all duration-150 sm:h-10 sm:text-xs"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-1.5 flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted hover:text-ink"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute right-2.5 hidden h-5 items-center gap-0.5 rounded border border-line bg-card px-1.5 font-mono text-[10px] text-muted sm:flex">
                <Command className="size-2.5" />K
              </kbd>
            )}
          </div>

          {/* Search Dropdown / Live Results */}
          {searchFocused && q && (
            <div className="custom-scrollbar absolute left-0 top-full z-50 mt-2 max-h-[60dvh] w-full overflow-y-auto rounded-2xl border border-line bg-card p-3 shadow-xl backdrop-blur-md">
              {hasResults ? (
                <div className="space-y-3">
                  {filteredProjects.length > 0 && (
                    <div>
                      <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                        Projects
                      </p>
                      <ul className="mt-1 space-y-1">
                        {filteredProjects.map((p) => (
                          <li key={p.slug}>
                            <button
                              type="button"
                              onClick={() => {
                                setSearchFocused(false);
                                (document.activeElement as HTMLElement | null)?.blur?.();
                                router.push(`/projects?q=${encodeURIComponent(p.title)}`);
                              }}
                              className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-tile"
                            >
                              <span className="font-medium text-ink">
                                {p.title}
                              </span>
                              <span className="text-[11px] text-muted">
                                {p.year}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredCapabilities.length > 0 && (
                    <div>
                      <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                        Capabilities
                      </p>
                      <ul className="mt-1 space-y-1">
                        {filteredCapabilities.map((c) => (
                          <li key={c.title}>
                            <button
                              type="button"
                              onClick={() => {
                                setSearchFocused(false);
                                (document.activeElement as HTMLElement | null)?.blur?.();
                                router.push("/about");
                              }}
                              className="w-full cursor-pointer rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-tile"
                            >
                              <span className="font-semibold text-blue">
                                {c.title}
                              </span>{" "}
                              —{" "}
                              <span className="text-muted">{c.desc}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredTools.length > 0 && (
                    <div>
                      <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                        Tools
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                        {filteredTools.map((t) => (
                          <button
                            key={t.name}
                            type="button"
                            onClick={() => {
                              setSearchFocused(false);
                              (document.activeElement as HTMLElement | null)?.blur?.();
                              router.push(`/tools?q=${encodeURIComponent(t.name)}`);
                            }}
                            className="cursor-pointer rounded-md border border-line bg-tile px-2 py-0.5 text-[11px] text-ink transition-colors hover:border-blue"
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="p-3 text-center text-xs text-muted">
                  No matches found for &ldquo;{query}&rdquo;.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

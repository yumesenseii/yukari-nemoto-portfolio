"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Home,
  Mail,
  User,
  Wrench,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSidebar } from "@/components/app-shell";
import { onLoaderDone } from "@/lib/loader-ready";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import { bottomLinks, profile } from "@/lib/data";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
];

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useSidebar();
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleIconRef = useRef<HTMLSpanElement>(null);

  // Lock body scroll while the mobile drawer is open (app-like sheet behavior)
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  // Close drawer on Escape for keyboard / mobile users
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, onClose]);

  // Initial clean sidebar entrance, held paused until the loader lifts
  // so it isn't spent unseen behind the overlay.
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;
      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const entrance = gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          paused: true,
          clearProps: "all",
        },
      );
      return onLoaderDone(() => entrance.play());
    },
    { scope: sidebarRef },
  );

  // Sidebar width is driven purely by Tailwind classes + CSS transition
  // (see aside className). No JS width animation: the pre-hydration
  // html[data-sidebar] guard in globals.css agrees with these classes, so
  // there is a single source of truth and no inline-style fights.
  const onToggleEnter = () => {
    if (toggleIconRef.current) {
      // 2 to 3px horizontally toward its direction:
      // When expanded, chevron points left (ChevronLeft) -> move -2.5px left
      // When collapsed, chevron points right (ChevronRight) -> move +2.5px right
      const xOffset = collapsed ? 2.5 : -2.5;
      gsap.to(toggleIconRef.current, {
        x: xOffset,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const onToggleLeave = () => {
    if (toggleIconRef.current) {
      gsap.to(toggleIconRef.current, {
        x: 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        ref={sidebarRef}
        data-sidebar-panel
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-sidebar/90 backdrop-blur-md transition-[width,padding,translate,transform] duration-500 ease-in-out overflow-hidden",
          collapsed ? "lg:w-[72px] lg:px-2.5" : "lg:w-[260px] lg:px-5",
          "w-[min(260px,84vw)] px-5 py-6 safe-pb",
          "max-lg:rounded-r-3xl max-lg:shadow-2xl",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        {/* Mobile-only ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-blue/10 blur-3xl lg:hidden"
        />
        {/* Monogram and profile heading (drawer closes via backdrop, links, or Escape) */}
        <div className="flex items-center">
          <div
            className={cn(
              "flex items-center gap-3 transition-all duration-200",
              collapsed ? "lg:justify-center lg:w-full" : "",
            )}
          >
            <div
              className={cn(
                "flex shrink-0 items-center justify-center rounded-xl border border-line bg-tile font-display text-sm font-bold tracking-tight text-ink shadow-xs",
                collapsed ? "lg:size-10" : "size-11",
              )}
            >
              {profile.initials}
            </div>

            {/* Profile text - hidden on desktop when collapsed */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                collapsed ? "lg:hidden" : "block",
              )}
            >
              <p className="font-display text-xs font-bold uppercase tracking-wider text-ink truncate">
                YUKARI NEMOTO
              </p>
              <p className="mt-0.5 font-mono text-[10px] font-medium tracking-tight text-muted truncate">
                BSIT · DATA &amp; ANALYTICS
              </p>
            </div>
          </div>
        </div>

        {/* Mobile-only availability status */}
        <div className="relative mt-5 lg:hidden">
          <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-tile/60 px-3.5 py-2.5">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[11px] font-medium leading-snug text-muted">
              <span className="font-semibold text-ink">Open to work</span>
              {" · internships & freelance"}
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <p className="mb-2 mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/70 lg:hidden">
          Menu
        </p>
        <nav
          className="flex flex-1 flex-col gap-1.5 lg:mt-8"
          aria-label="Primary"
        >
          {nav.map((item, i) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex cursor-pointer items-center rounded-xl text-xs font-medium tracking-wide transition-all duration-150",
                  "max-lg:min-h-[52px] max-lg:rounded-2xl max-lg:px-4 max-lg:text-[13px] max-lg:font-semibold",
                  "max-lg:duration-300 max-lg:[transition-delay:var(--nav-d)]",
                  !mobileOpen && "max-lg:opacity-0 max-lg:-translate-x-4",
                  collapsed
                    ? "lg:size-10 lg:justify-center lg:p-0 lg:mx-auto"
                    : "min-h-[44px] gap-3 px-3.5 py-3",
                  active
                    ? "bg-[#ede5da] text-[#1a1612] font-semibold dark:bg-[#dfd4c4] dark:text-[#080b10] shadow-xs ring-1 ring-brown/20 dark:ring-white/10"
                    : "text-muted hover:bg-tile/70 hover:text-blue max-lg:border max-lg:border-line/70 max-lg:bg-card/70 max-lg:shadow-xs max-lg:hover:border-blue/40",
                )}
                style={
                  { "--nav-d": mobileOpen ? `${120 + i * 70}ms` : "0ms" } as CSSProperties
                }
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.8} />
                <span
                  className={cn(
                    "truncate transition-opacity duration-200",
                    collapsed ? "lg:hidden" : "inline",
                  )}
                >
                  {item.label}
                </span>
                <ChevronRight
                  className="ml-auto hidden size-4 shrink-0 text-muted/50 max-lg:block"
                  strokeWidth={2}
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom utility icons, theme toggle & collapse button */}
        <div
          className={cn(
            "border-t border-line/70 pt-4",
            "max-lg:duration-300 max-lg:[transition-delay:var(--foot-d)]",
            !mobileOpen && "max-lg:opacity-0 max-lg:translate-y-3",
          )}
          style={{ "--foot-d": mobileOpen ? "480ms" : "0ms" } as CSSProperties}
        >
          {/* Mobile-only contact CTA */}
          <Link
            href="/contact"
            onClick={onClose}
            className="mb-4 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-ink px-4 text-xs font-bold tracking-wide text-sidebar shadow-sm transition-all hover:opacity-95 active:scale-[0.98] lg:hidden dark:bg-[#f5f2eb] dark:text-[#0a0d12]"
          >
            <span>LET&apos;S WORK TOGETHER</span>
            <ArrowRight className="size-4" strokeWidth={2.25} />
          </Link>
          {/* Icons container */}
          <div
            className={cn(
              "flex items-center",
              collapsed
                ? "lg:flex-col lg:gap-2.5 lg:items-center"
                : "justify-between",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2",
                collapsed ? "lg:flex-col lg:gap-2" : "",
              )}
            >
              {bottomLinks.map((item) => {
                const Icon =
                  item.icon === "mail"
                    ? Mail
                    : item.icon === "linkedin"
                      ? LinkedinIcon
                      : GithubIcon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    title={collapsed ? item.label : undefined}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-blue hover:text-blue hover:bg-tile/80 lg:size-8"
                  >
                    <Icon className="size-3.5" strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>

            {/* Utility actions: ThemeToggle + Collapse Toggle */}
            <div
              className={cn(
                "flex items-center gap-1.5",
                collapsed ? "lg:flex-col lg:gap-2" : "",
              )}
            >
              <ThemeToggle className="size-10 lg:size-8" />

              {/* Desktop Collapse / Expand Icon-Only Button */}
              <button
                type="button"
                onClick={toggleCollapsed}
                onMouseEnter={onToggleEnter}
                onMouseLeave={onToggleLeave}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="hidden lg:flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line bg-tile/40 text-muted transition-colors duration-200 hover:border-blue hover:bg-tile hover:text-ink active:scale-95"
              >
                <span
                  ref={toggleIconRef}
                  className="inline-flex items-center justify-center pointer-events-none will-change-transform"
                >
                  {collapsed ? (
                    <ChevronRight className="size-4" strokeWidth={1.8} />
                  ) : (
                    <ChevronLeft className="size-4" strokeWidth={1.8} />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Copyright notice (hidden when collapsed) */}
          <p
            className={cn(
              "mt-3 text-[10px] tracking-tight text-muted truncate",
              collapsed ? "lg:hidden" : "block",
            )}
          >
            © 2026 {profile.name}.
          </p>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Home,
  Mail,
  User,
  Wrench,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSidebar } from "@/components/app-shell";
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
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const toggleIconRef = useRef<HTMLSpanElement>(null);

  // Initial clean sidebar entrance
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
      );
    },
    { scope: sidebarRef },
  );

  // Animate sidebar width with GSAP on desktop
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const targetWidth = collapsed ? 72 : 260;

    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        width: targetWidth,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    if (toggleIconRef.current) {
      gsap.set(toggleIconRef.current, { x: 0 });
    }
  }, [collapsed]);

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
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity duration-200 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-sidebar/90 backdrop-blur-md transition-transform duration-200 overflow-hidden",
          collapsed ? "lg:w-[72px] lg:px-2.5" : "lg:w-[260px] lg:px-5",
          "w-[260px] px-5 py-6",
          mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        {/* Monogram and profile heading */}
        <div className="flex items-center justify-between">
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

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-ink lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation list */}
        <nav
          className="mt-8 flex flex-1 flex-col gap-1.5"
          aria-label="Primary"
        >
          {nav.map((item) => {
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
                  collapsed
                    ? "lg:size-10 lg:justify-center lg:p-0 lg:mx-auto"
                    : "gap-3 px-3.5 py-2.5",
                  active
                    ? "bg-[#ede5da] text-[#1a1612] font-semibold dark:bg-[#dfd4c4] dark:text-[#080b10] shadow-xs ring-1 ring-brown/20 dark:ring-white/10"
                    : "text-muted hover:bg-tile/70 hover:text-blue",
                )}
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
              </Link>
            );
          })}
        </nav>

        {/* Bottom utility icons, theme toggle & collapse button */}
        <div className="border-t border-line/70 pt-4">
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
                    className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-blue hover:text-blue hover:bg-tile/80"
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
              <ThemeToggle />

              {/* Desktop Collapse / Expand Icon-Only Button */}
              <button
                ref={toggleBtnRef}
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

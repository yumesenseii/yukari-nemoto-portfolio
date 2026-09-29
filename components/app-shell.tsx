"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { CardShufflePreloader } from "@/components/card-shuffle-preloader";
import { CustomCursor } from "@/components/custom-cursor";
import { DotGridBackground } from "@/components/dot-grid-background";
import { PageTransition } from "@/components/page-transition";
import { PortfolioChatbot } from "@/components/portfolio-chatbot";
import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/site-footer";
import { TopBar } from "@/components/top-bar";
import { cn } from "@/lib/cn";

type SidebarContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // SSR-safe: server + hydration both render `false` so HTML matches.
  // The real preference is synced post-hydration from the pre-hydration
  // <script> (html[data-sidebar]) + localStorage. Visual flash is covered
  // by CSS in globals.css driven by html[data-sidebar].
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Post-hydration only: restore preference without hydration mismatch.
  useEffect(() => {
    let next = false;
    try {
      const attr = document.documentElement.getAttribute("data-sidebar");
      if (attr === "collapsed") next = true;
      else if (attr === "expanded") next = false;
      else next = localStorage.getItem("portfolio-sidebar-collapsed") === "true";
    } catch {
      next = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCollapsed(next);
    setMounted(true);
  }, []);

  // Persist every change (pure updater friendly, survives StrictMode double-invoke)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("portfolio-sidebar-collapsed", String(collapsed));
      document.documentElement.setAttribute(
        "data-sidebar",
        collapsed ? "collapsed" : "expanded",
      );
    } catch {
      // localStorage may be disabled in private mode
    }
  }, [collapsed, mounted]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  // Optional keyboard shortcut '[' for fast toggle without any UI label
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "[" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        toggleCollapsed();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleCollapsed]);

  // Notify width-dependent children (e.g. carousels) after the 500ms
  // CSS padding transition finishes so they can re-measure.
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 520);
    return () => clearTimeout(timer);
  }, [collapsed, mounted]);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      <div className="min-h-dvh bg-page text-ink antialiased relative">
        <CardShufflePreloader />
        <CustomCursor />
        {/* Subtle Interactive Grid Dot Lines Background - covers all backgrounds */}
        <DotGridBackground />

        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div
          data-main-wrapper
          className={cn(
            "relative flex min-h-dvh flex-col overflow-x-clip transition-[padding] duration-500 ease-in-out",
            collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]",
          )}
        >
          <TopBar onOpenMobile={() => setMobileOpen(true)} />
          <main
            className={cn(
              "safe-pb relative z-10 mx-auto w-full flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10 transition-all duration-300",
              collapsed ? "max-w-[1400px]" : "max-w-[1200px]",
            )}
          >
            <PageTransition key={pathname}>{children}</PageTransition>
            <SiteFooter />
          </main>
        </div>

        {/* Chibi Mascot & Chatbot Assistant — yields to the mobile drawer
            so the bubble/mascot never overlaps the open menu */}
        <div
          className={cn(
            "transition-opacity duration-200",
            mobileOpen && "max-lg:pointer-events-none max-lg:opacity-0",
          )}
        >
          <PortfolioChatbot />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

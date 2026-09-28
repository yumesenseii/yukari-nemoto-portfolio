"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
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
  const [isDesktop, setIsDesktop] = useState(false);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const initialAnimateRef = useRef(false);
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
    try {
      const mq = window.matchMedia("(min-width: 1024px)");
      setIsDesktop(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
      mq.addEventListener("change", onChange);
      setMounted(true);
      return () => mq.removeEventListener("change", onChange);
    } catch {
      setIsDesktop(false);
      setMounted(true);
    }
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

  // Animate main container padding-left when sidebar collapses on desktop.
  // First mount: set instantly (no flash animation) since CSS already shows
  // the correct width pre-hydration.
  useEffect(() => {
    if (!mounted || !isDesktop) return;
    const targetPl = collapsed ? 72 : 260;

    if (mainWrapperRef.current) {
      if (!initialAnimateRef.current) {
        gsap.set(mainWrapperRef.current, { paddingLeft: targetPl });
        initialAnimateRef.current = true;
        return;
      }
      gsap.to(mainWrapperRef.current, {
        paddingLeft: targetPl,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          // Notify child components (like carousel) to recalculate layout widths
          window.dispatchEvent(new Event("resize"));
        },
      });
    }
  }, [collapsed, mounted, isDesktop]);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      <div className="min-h-dvh bg-page text-ink antialiased relative">
        <CardShufflePreloader />
        <CustomCursor />
        {/* Subtle Interactive Grid Dot Lines Background - covers all backgrounds */}
        <DotGridBackground />

        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div
          ref={mainWrapperRef}
          data-main-wrapper
          className="relative flex min-h-dvh flex-col transition-none"
          style={{
            paddingLeft: mounted && isDesktop ? (collapsed ? 72 : 260) : undefined,
          }}
        >
          <TopBar onOpenMobile={() => setMobileOpen(true)} />
          <main
            className={cn(
              "relative z-10 mx-auto w-full flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10 transition-all duration-300",
              collapsed ? "max-w-[1400px]" : "max-w-[1200px]",
            )}
          >
            <PageTransition key={pathname}>{children}</PageTransition>
            <SiteFooter />
          </main>
        </div>

        {/* Chibi Mascot & Chatbot Assistant */}
        <PortfolioChatbot />
      </div>
    </SidebarContext.Provider>
  );
}

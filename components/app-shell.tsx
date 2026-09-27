"use client";

import {
  createContext,
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
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Hydration-safe initial check for persisted collapsed state
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("portfolio-sidebar-collapsed");
      if (saved === "true") {
        setCollapsed(true);
      }
    } catch {
      // localStorage may be disabled in private mode
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio-sidebar-collapsed", String(next));
      } catch {
        // localStorage error fallback
      }
      return next;
    });
  };

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
  }, []);

  // Animate main container padding-left when sidebar collapses on desktop
  useEffect(() => {
    if (!mounted || typeof window === "undefined" || window.innerWidth < 1024) return;
    const targetPl = collapsed ? 72 : 260;

    if (mainWrapperRef.current) {
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
          ref={mainWrapperRef}
          className="relative flex min-h-dvh flex-col transition-none"
          style={{
            paddingLeft:
              mounted && typeof window !== "undefined" && window.innerWidth >= 1024
                ? collapsed
                  ? 72
                  : 260
                : undefined,
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

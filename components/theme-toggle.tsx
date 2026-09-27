"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      suppressHydrationWarning
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-blue hover:text-ink",
        className,
      )}
    >
      {!ready ? (
        <Sun className="size-3.5" strokeWidth={1.75} />
      ) : theme === "dark" ? (
        <Sun className="size-3.5" strokeWidth={1.75} />
      ) : (
        <Moon className="size-3.5" strokeWidth={1.75} />
      )}
    </button>
  );
}

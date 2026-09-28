"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";

export const PORTRAIT_LIGHT_SRC = "/yukari-portrait-for-light-theme.jpg";
export const PORTRAIT_DARK_SRC = "/yukari-portrait-for-dark-theme.jpg";

type ThemedPortraitProps = {
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Extra classes applied to each <Image> (object-cover, group-hover:scale, etc.) */
  imgClassName?: string;
};

/**
 * Theme-aware portrait with smooth crossfade.
 * Both files are always rendered stacked so switching themes
 * fades out one and fades in the other instead of swapping src.
 * SSR-safe: server + hydration both start on `light`; the real theme
 * syncs post-hydration via ThemeProvider, which then triggers the fade.
 */
export function ThemedPortrait({
  alt,
  sizes,
  priority = false,
  imgClassName,
}: ThemedPortraitProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const base = cn(
    "absolute inset-0 h-full w-full object-cover object-top",
    "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
    imgClassName,
  );

  return (
    <>
      <Image
        src={PORTRAIT_LIGHT_SRC}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        aria-hidden={isDark}
        className={cn(base, isDark ? "opacity-0" : "opacity-100")}
      />
      <Image
        src={PORTRAIT_DARK_SRC}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        aria-hidden={!isDark}
        className={cn(base, isDark ? "opacity-100" : "opacity-0")}
      />
    </>
  );
}

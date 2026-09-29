"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to canvas
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    let isRunning = false;
    let idleCounter = 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);

    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      renderStatic();
    };

    const isDarkMode = () => {
      if (typeof document !== "undefined") {
        return document.documentElement.getAttribute("data-theme") === "dark";
      }
      return theme === "dark";
    };

    // Render a very faint dot field with no visible line grid
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();
      // Mobile (<640px): halve dot presence to keep the background subtle.
      const faint = width < 640 ? 0.45 : 1;
      const baseDotAlpha = (dark ? 0.05 : 0.04) * faint;
      const dotColor = dark ? "255, 255, 255" : "15, 23, 42";
      const illuminatedColor = dark ? "147, 197, 253" : "29, 78, 216";
      const spacing = 28;
      const baseRadius = 0.8;
      const maxRadius = 1.5;
      const interactionRadius = 130;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;

      const mouseActive = mouse.active && !isTouchDevice && !prefersReducedMotion;

      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          let alpha = baseDotAlpha;
          let radius = baseRadius;
          let activeColor = dotColor;

          if (mouseActive) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const distSq = dx * dx + dy * dy;

            if (distSq < interactionRadiusSq) {
              const distance = Math.sqrt(distSq);
              const factor = 1 - distance / interactionRadius;
              const eased = factor * factor;
              alpha = baseDotAlpha + eased * (dark ? 0.18 : 0.14);
              radius = baseRadius + eased * (maxRadius - baseRadius);
              activeColor = illuminatedColor;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${activeColor}, ${alpha})`;
          ctx.fill();
        }
      }

      const diffX = Math.abs(mouse.targetX - mouse.x);
      const diffY = Math.abs(mouse.targetY - mouse.y);

      if (!mouse.active && diffX < 0.5 && diffY < 0.5) {
        idleCounter++;
        if (idleCounter > 12) {
          isRunning = false;
          renderStatic();
          return;
        }
      } else {
        idleCounter = 0;
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDarkMode();
      // Mobile (<640px): halve dot presence to keep the background subtle.
      const faint = width < 640 ? 0.45 : 1;
      const baseDotAlpha = (dark ? 0.05 : 0.04) * faint;
      const dotColor = dark ? "255, 255, 255" : "15, 23, 42";
      const spacing = 28;
      const baseRadius = 0.8;

      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${baseDotAlpha})`;
          ctx.fill();
        }
      }
    };

    const startAnimation = () => {
      if (!isRunning && !isTouchDevice && !prefersReducedMotion) {
        isRunning = true;
        idleCounter = 0;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      startAnimation();
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    updateDimensions();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", updateDimensions);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-100 transition-opacity duration-500"
      />
    </div>
  );
}

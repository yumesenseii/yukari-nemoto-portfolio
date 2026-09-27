"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // max movement in pixels (5-8px)
}

export function Magnetic({
  children,
  className = "",
  strength = 6,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);

    // Limit magnetic displacement strictly to 5-8px
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

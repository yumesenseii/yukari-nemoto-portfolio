import Image from "next/image";
import { cn } from "@/lib/cn";
import { profile } from "@/lib/data";

export function Avatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "size-9 text-[13px]",
    md: "size-14 text-lg",
    lg: "size-[72px] text-2xl",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-pill font-display font-semibold text-pill-ink shadow-xs",
        sizes[size],
        className,
      )}
    >
      <Image
        src="/yukari-portrait.jpg"
        alt={profile.name}
        fill
        sizes="(max-width: 768px) 50px, 100px"
        className="object-cover object-top"
      />
    </div>
  );
}

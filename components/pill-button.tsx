import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "soft" | "ink";
  className?: string;
};

export function PillButton({
  href,
  children,
  variant = "soft",
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200",
        variant === "soft" &&
          "bg-pill text-pill-ink hover:bg-[#c5dceb] dark:hover:bg-[#c5dceb]",
        variant === "ink" && "bg-ink text-page hover:opacity-90",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5" strokeWidth={2} />
    </Link>
  );
}

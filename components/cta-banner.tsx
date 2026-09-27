import { PillButton } from "@/components/pill-button";

export function CtaBanner({ title }: { title: string }) {
  return (
    <section className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-pill px-7 py-7 text-pill-ink sm:flex-row sm:items-center sm:px-8">
      <p className="max-w-xl font-display text-xl font-semibold tracking-tight sm:text-[22px]">
        {title}
      </p>
      <PillButton href="/contact" variant="ink" className="shrink-0">
        Get in touch
      </PillButton>
    </section>
  );
}

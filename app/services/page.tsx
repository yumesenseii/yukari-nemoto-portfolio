import { ArrowUpRight, Camera, Clapperboard, Globe } from "lucide-react";
import { Card } from "@/components/card";
import { CtaBanner } from "@/components/cta-banner";
import { PillButton } from "@/components/pill-button";
import { profile, services } from "@/lib/data";

const icons = [Camera, Clapperboard, Globe];

export default function ServicesPage() {
  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-sm text-sm text-muted">{profile.role}</p>
        <PillButton href="/contact">Get in touch</PillButton>
      </div>

      <h1 className="mt-8 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        Services
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        Photography, editing, and small websites — the same finish, whether
        the file is a frame or a page.
      </p>

      <Card className="mt-12 p-2 sm:p-4">
        <ul>
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <li
                key={service.title}
                className="flex items-start justify-between gap-6 border-b border-line px-4 py-6 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-tile text-brown">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                      {service.blurb}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-muted"
                  strokeWidth={1.75}
                />
              </li>
            );
          })}
        </ul>
      </Card>

      <div className="mt-12">
        <CtaBanner title="Not sure if you need photos, edits, or a page first?" />
      </div>
    </div>
  );
}

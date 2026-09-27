import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
      <p>© 2026 {profile.name}. All rights reserved.</p>
      <div className="flex items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="cursor-pointer transition-colors duration-200 hover:text-ink"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}

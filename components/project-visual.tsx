import { cn } from "@/lib/cn";

type Kind = "school" | "desk" | "merch";

export function ProjectVisual({
  kind,
  className,
  uid,
}: {
  kind: Kind;
  className?: string;
  uid?: string;
}) {
  const skyId = `${kind}-sky${uid ? `-${uid}` : ""}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line",
        className,
      )}
    >
      <svg
        viewBox="0 0 320 200"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c5dceb" />
            <stop offset="55%" stopColor="#e7eef4" />
            <stop offset="100%" stopColor="#d8c4ae" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#${skyId})`} />
        {kind === "school" ? <SchoolArt /> : null}
        {kind === "desk" ? <DeskArt /> : null}
        {kind === "merch" ? <MerchArt /> : null}
      </svg>
    </div>
  );
}

function SchoolArt() {
  return (
    <g>
      <ellipse cx="250" cy="52" rx="28" ry="28" fill="#f4ecd4" opacity="0.9" />
      <rect y="138" width="320" height="62" fill="#b89a7a" />
      <rect y="132" width="320" height="8" fill="#c9b29a" />
      <rect x="48" y="78" width="150" height="70" fill="#f3eee8" />
      <rect x="48" y="70" width="150" height="10" fill="#6b4b32" />
      <rect x="198" y="94" width="58" height="54" fill="#efe6dc" />
      <rect x="198" y="88" width="58" height="8" fill="#8a6a4e" />
      <rect x="70" y="92" width="22" height="18" fill="#8bb8e8" opacity="0.85" />
      <rect x="102" y="92" width="22" height="18" fill="#8bb8e8" opacity="0.7" />
      <rect x="134" y="92" width="22" height="18" fill="#8bb8e8" opacity="0.85" />
      <rect x="108" y="118" width="22" height="30" fill="#6b4b32" />
      <rect x="214" y="104" width="16" height="16" fill="#8bb8e8" opacity="0.75" />
    </g>
  );
}

function DeskArt() {
  return (
    <g>
      <rect width="320" height="200" fill="#d2e3ef" />
      <rect y="118" width="320" height="82" fill="#cbb8a3" />
      <rect x="36" y="96" width="248" height="10" rx="2" fill="#6b4b32" />
      <rect x="52" y="106" width="10" height="48" fill="#8a6a4e" />
      <rect x="258" y="106" width="10" height="48" fill="#8a6a4e" />
      <rect x="92" y="52" width="112" height="70" rx="3" fill="#1c2430" />
      <rect x="100" y="60" width="96" height="54" fill="#9ec4dd" />
      <rect x="216" y="78" width="40" height="18" rx="2" fill="#f4f1ec" />
      <circle cx="268" cy="40" r="14" fill="#f4ecd4" opacity="0.8" />
    </g>
  );
}

function MerchArt() {
  return (
    <g>
      <rect width="320" height="200" fill="#e6d5c2" />
      <ellipse cx="160" cy="168" rx="90" ry="14" fill="#c4a484" opacity="0.55" />
      <path
        d="M118 72h26l12 20h28l12-20h26v82H118V72z"
        fill="#f7f3ee"
        stroke="#6b4b32"
        strokeWidth="2.5"
      />
      <path
        d="M144 72c2 16 32 16 34 0"
        stroke="#6b4b32"
        strokeWidth="2.5"
        fill="none"
      />
      <rect x="148" y="108" width="24" height="18" rx="2" fill="#d6e8f4" />
    </g>
  );
}

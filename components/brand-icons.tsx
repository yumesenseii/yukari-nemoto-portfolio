import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  strokeWidth?: number | string;
};

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3.2l.8-4H13V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.5 9H3.7v11h2.8V9zM5.1 4C4.2 4 3.5 4.7 3.5 5.6S4.2 7.2 5.1 7.2 6.7 6.5 6.7 5.6 6 4 5.1 4zM20.5 20h-2.8v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H11v-11h2.7v1.5h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V20z" />
    </svg>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.5 3c.3 2.2 1.7 3.8 3.9 4.1v2.3c-1.3 0-2.5-.4-3.6-1.1v6.4c0 3.2-2.5 5.3-5.5 5.3S3.8 17.9 3.8 14.7c0-3.1 2.4-5.2 5.4-5.2.4 0 .8 0 1.2.1v2.5c-.4-.2-.8-.3-1.2-.3-1.6 0-2.8 1.1-2.8 2.8 0 1.7 1.1 2.8 2.8 2.8s2.8-1.1 2.8-2.8V3h2.5z" />
    </svg>
  );
}

export function FigmaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M8.5 2a3.5 3.5 0 0 0 0 7H12V2H8.5zM12 9H8.5a3.5 3.5 0 0 0 0 7H12V9zM12 16H8.5a3.5 3.5 0 1 0 3.5 3.5V16zM12 9h3.5a3.5 3.5 0 1 0 0-7H12v7zM19 12.5A3.5 3.5 0 1 1 15.5 9H12v7h3.5A3.5 3.5 0 0 0 19 12.5z" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function VsCodeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .32 8.688l3.415 3.313L.32 15.312a1 1 0 0 0 .007 1.427l1.322 1.202a1 1 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zM18 16.586l-6.5-4.586L18 7.414v9.172z" />
    </svg>
  );
}

export function SupabaseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.614 13.916a.792.792 0 0 0 .616 1.284H12v8.958a.396.396 0 0 0 .716.233l10.67-13.753a.792.792 0 0 0-.616-1.284z" />
    </svg>
  );
}

export function VercelIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1L24 22H0L12 1z" />
    </svg>
  );
}

export function PythonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.753h5.81v.826H3.89S0 5.772 0 11.928c0 6.16 3.4 5.952 3.4 5.952h2.03v-2.846s-.11-3.4 3.344-3.4h5.772v-.888h.013V7.915s.51-5.953-5.918-5.953l3.273-1.962zm-3.17 1.874a.952.952 0 1 1 0 1.905.952.952 0 0 1 0-1.905zm3.342 22.126c6.094 0 5.714-2.656 5.714-2.656l-.006-2.753h-5.81v-.826h8.126s3.89.463 3.89-5.693c0-6.16-3.4-5.952-3.4-5.952h-2.03v2.846s.11 3.4-3.344 3.4h-5.772v.888h-.013v2.831s-.51 5.953 5.918 5.953l-3.273 1.962zm3.17-1.874a.952.952 0 1 1 0-1.905.952.952 0 0 1 0 1.905z" />
    </svg>
  );
}

export function PowerBiIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.5 2h-3a1.5 1.5 0 0 0-1.5 1.5v17a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 18.5 2zM12 7.5H9A1.5 1.5 0 0 0 7.5 9v11.5A1.5 1.5 0 0 0 9 22h3a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 12 7.5zM5.5 13H2.5A1.5 1.5 0 0 0 1 14.5V20.5A1.5 1.5 0 0 0 2.5 22h3a1.5 1.5 0 0 0 1.5-1.5V14.5A1.5 1.5 0 0 0 5.5 13z" />
    </svg>
  );
}

export function ExcelIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.17 3.25H7.83A1.83 1.83 0 0 0 6 5.08v2.67H2.83A1.83 1.83 0 0 0 1 9.58v7.84a1.83 1.83 0 0 0 1.83 1.83H6v2.67a1.83 1.83 0 0 0 1.83 1.83h13.34a1.83 1.83 0 0 0 1.83-1.83V5.08a1.83 1.83 0 0 0-1.83-1.83zM6 16.58H3.67v-6.16H6v6.16zm5.83 4.34H8.67V5.08h3.16v15.84zm7.5 0h-4.83V5.08h4.83v15.84z" />
    </svg>
  );
}

export function CanvaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 14.1c-1.3 1.1-2.9 1.4-4.5.9-1.8-.6-2.9-2.3-2.9-4.2 0-2.3 1.7-4.3 4-4.5 1.5-.1 2.9.5 3.8 1.6l-1.3 1.2c-.6-.7-1.5-1.1-2.4-1-1.3.1-2.4 1.1-2.4 2.5 0 1.2.7 2.2 1.8 2.5 1 .3 2.1 0 2.9-.6l.9 1.6z" />
    </svg>
  );
}

/* ==========================================================================
   OFFICIAL RECOGNIZABLE TOOL & TECH LOGOS (FOR TOOLS PAGE)
   ========================================================================== */

export function FigmaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 57"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  );
}

export function PhotoshopLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <rect width="36" height="36" rx="8" fill="#001E36" />
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="6.5"
        stroke="#31A8FF"
        strokeWidth="1.75"
      />
      {/* P */}
      <path
        d="M9.5 11H15.2C17.6 11 19.3 12.3 19.3 14.5C19.3 16.7 17.6 18 15.2 18H12.5V25H9.5V11ZM12.5 15.8H14.9C15.9 15.8 16.5 15.2 16.5 14.5C16.5 13.8 15.9 13.2 14.9 13.2H12.5V15.8Z"
        fill="#31A8FF"
      />
      {/* s */}
      <path
        d="M20.8 21.4C21.4 22.4 22.6 23.1 24.1 23.1C25.4 23.1 26.2 22.5 26.2 21.6C26.2 20.6 25.3 20.1 23.8 19.6C21.6 18.9 20.3 17.9 20.3 16.1C20.3 14.2 22 12.8 24.2 12.8C25.8 12.8 27.1 13.4 27.9 14.5L25.8 16C25.3 15.2 24.7 14.9 24 14.9C23.1 14.9 22.5 15.4 22.5 16C22.5 16.8 23.3 17.2 24.8 17.7C27.1 18.4 28.5 19.5 28.5 21.5C28.5 23.6 26.7 25.2 24.1 25.2C22.1 25.2 20.5 24.4 19.7 23L20.8 21.4Z"
        fill="#31A8FF"
      />
    </svg>
  );
}

export function LightroomLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <rect width="36" height="36" rx="8" fill="#001E36" />
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="6.5"
        stroke="#31A8FF"
        strokeWidth="1.75"
      />
      {/* L */}
      <path
        d="M10 11H13.2V22.2H18.5V25H10V11Z"
        fill="#31A8FF"
      />
      {/* r */}
      <path
        d="M20.5 15H23.4V16.9H23.6C24.1 15.7 25.1 14.8 26.6 14.8C27 14.8 27.4 14.9 27.7 15V17.9C27.2 17.7 26.7 17.6 26.1 17.6C24.6 17.6 23.6 18.8 23.6 20.6V25H20.5V15Z"
        fill="#31A8FF"
      />
    </svg>
  );
}

export function CanvaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="canva-grad"
          x1="0"
          y1="0"
          x2="36"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="50%" stopColor="#7D2AE8" />
          <stop offset="100%" stopColor="#2478E6" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="18" fill="url(#canva-grad)" />
      {/* Signature C mark */}
      <path
        d="M22.5 22.8C20.3 24.3 17.2 24.5 14.8 23.1C12.1 21.5 11 18.1 12.3 15.1C13.3 12.8 15.9 11.2 18.6 11.2C21 11.2 23 12.2 24.1 14L21.4 15.6C20.8 14.5 19.8 13.8 18.6 13.8C16.8 13.8 15.1 15 14.5 16.9C13.8 18.8 14.5 20.8 16.1 21.8C17.5 22.6 19.3 22.5 20.9 21.6L22.5 22.8Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CapCutLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <rect width="36" height="36" rx="8" fill="#12161F" />
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="6.5"
        stroke="#232C3D"
        strokeWidth="1.5"
      />
      {/* CapCut interlocking cutter mark */}
      <path
        d="M9 13.5L16 9V16.5L9 21V13.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M27 22.5L20 27V19.5L27 15V22.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M16 16.5L27 9.5V16L16 23V16.5Z"
        fill="#E2E8F0"
        fillOpacity="0.4"
      />
      <path
        d="M20 19.5L9 26.5V20L20 13V19.5Z"
        fill="#E2E8F0"
        fillOpacity="0.4"
      />
    </svg>
  );
}

export function VsCodeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M17.8 2.1L12.5 6.9L7.3 2.9C6.8 2.5 6 2.6 5.6 3.1L3.3 5.9C3 6.3 3 6.9 3.4 7.3L7.7 10.7L3.4 14.1C3 14.5 3 15.1 3.3 15.5L5.6 18.3C6 18.8 6.8 18.9 7.3 18.5L12.5 14.5L17.8 19.3C18.2 19.7 18.8 19.8 19.3 19.6L22.5 18.2C23.1 17.9 23.5 17.3 23.5 16.7V4.7C23.5 4.1 23.1 3.5 22.5 3.2L19.3 1.8C18.8 1.6 18.2 1.7 17.8 2.1Z"
        fill="#007ACC"
      />
      <path
        d="M17.8 2.1L12.5 6.9L17.8 11.8L22.5 4.7L19.3 1.8C18.8 1.6 18.2 1.7 17.8 2.1Z"
        fill="#1F8AD2"
        fillOpacity="0.75"
      />
      <path
        d="M12.5 14.5L17.8 19.3C18.2 19.7 18.8 19.8 19.3 19.6L22.5 18.2L17.8 11.8L12.5 14.5Z"
        fill="#0065A9"
      />
      <path
        d="M17.8 11.8L23.5 16.7V4.7L17.8 11.8Z"
        fill="#1F8AD2"
      />
    </svg>
  );
}

export function NextJsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <circle cx="16" cy="16" r="15" fill="#000000" stroke="#2B2B2B" strokeWidth="1" />
      <path
        d="M25.2 25.8L12.5 9.5H10.5V22.5H12.6V12.2L24.1 26.8C24.5 26.5 24.8 26.1 25.2 25.8Z"
        fill="#FFFFFF"
      />
      <rect x="19.8" y="9.5" width="2.2" height="13" fill="#FFFFFF" fillOpacity="0.8" />
    </svg>
  );
}

export function ReactLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-11.5 -10.23 23 20.46"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TypeScriptLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <rect width="36" height="36" rx="7" fill="#3178C6" />
      {/* T */}
      <path
        d="M8.5 13H19.5V16H15.6V26H12.4V16H8.5V13Z"
        fill="#FFFFFF"
      />
      {/* S */}
      <path
        d="M20.2 22.8C20.8 24.3 22.3 25.3 24.2 25.3C26 25.3 27.2 24.3 27.2 23C27.2 21.6 26.2 21 24.3 20.3C21.7 19.3 20 18.2 20 15.8C20 13.5 22.1 12 24.6 12C26.7 12 28.3 12.9 29.1 14.5L26.5 16C26 15.1 25.2 14.6 24.3 14.6C23.2 14.6 22.4 15.2 22.4 16C22.4 16.9 23.3 17.4 25.1 18.1C27.7 19.1 29.6 20.2 29.6 22.8C29.6 25.5 27.3 27 24.4 27C21.8 27 19.8 25.6 18.8 23.5L20.2 22.8Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TailwindLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M16 7.5C12 7.5 9.5 9.5 8.5 13.5C10 11.5 11.75 10.75 13.75 11.25C14.9 11.54 15.7 12.37 16.6 13.29C18.05 14.77 19.7 16.5 23.5 16.5C27.5 16.5 30 14.5 31 10.5C29.5 12.5 27.75 13.25 25.75 12.75C24.6 12.46 23.8 11.63 22.9 10.71C21.45 9.23 19.8 7.5 16 7.5ZM8.5 16.5C4.5 16.5 2 18.5 1 22.5C2.5 20.5 4.25 19.75 6.25 20.25C7.4 20.54 8.2 21.37 9.1 22.29C10.55 23.77 12.2 25.5 16 25.5C20 25.5 22.5 23.5 23.5 19.5C22 21.5 20.25 22.25 18.25 21.75C17.1 21.46 16.3 20.63 15.4 19.71C13.95 18.23 12.3 16.5 8.5 16.5Z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function MySqlLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      {/* Sakila dolphin mark */}
      <path
        d="M26.2 12.4C26.4 10.1 25.5 8.2 24.3 6.9C24.1 6.7 23.8 6.9 23.9 7.2C24.3 8.3 24.4 9.6 24.1 11.1C23.5 13.8 21.4 16.3 18.8 18.2C15.6 20.5 11.7 21.8 7.8 22.2C5.9 22.4 4.1 22.1 2.3 21.6C2 21.5 1.8 21.9 2 22.1C4.4 24.4 7.6 25.6 11 25.6C16.8 25.6 22.2 22.3 25.3 17.2C26.1 15.7 26.5 14 26.2 12.4Z"
        fill="#00758F"
      />
      <path
        d="M28.4 10.8C29.2 8.4 29 6.2 27.9 4.8C27.7 4.5 27.3 4.7 27.4 5.1C27.9 6.6 27.8 8.4 27.1 10.3C25.6 14.1 21.8 17.5 17.7 19.8C14.1 21.8 9.9 23 5.8 23.2C4.1 23.3 2.5 23 1 22.4C0.7 22.3 0.5 22.7 0.7 22.9C3.6 25.7 7.7 27.2 11.9 27.2C18.6 27.2 24.9 23.1 28.1 16.9C28.8 15 29 12.8 28.4 10.8Z"
        fill="#F29111"
      />
      <circle cx="21" cy="9" r="1.2" fill="#00758F" />
    </svg>
  );
}

export function VercelLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2L23 21H1L12 2Z" />
    </svg>
  );
}

export function SupabaseLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M13.35 2.18a.75.75 0 0 0-1.28.32L9.2 13.5h9.3a.75.75 0 0 1 .6 1.2l-8.45 9.12a.75.75 0 0 1-1.28-.32l2.87-11H2.94a.75.75 0 0 1-.6-1.2l8.45-9.12a.75.75 0 0 1 .56-.2z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function XamppLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#FB7A24" />
      <path
        d="M8.5 8.5L14 16L8.5 23.5H12L16 18.2L20 23.5H23.5L18 16L23.5 8.5H20L16 13.8L12 8.5H8.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PowerBiLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#201F1E" />
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="5.5"
        stroke="#F2C811"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      {/* Power BI signature 3-tier bar chart */}
      <rect x="7" y="16" width="4.5" height="9" rx="1.2" fill="#EAA300" />
      <rect x="13.75" y="11" width="4.5" height="14" rx="1.2" fill="#F2C811" />
      <rect x="20.5" y="7" width="4.5" height="18" rx="1.2" fill="#F9E06E" />
    </svg>
  );
}


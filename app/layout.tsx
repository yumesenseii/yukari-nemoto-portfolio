import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ed" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yukari Nemoto",
  },
  formatDetection: {
    telephone: false,
  },
  title: "Yukari Tenshi Nemoto — Portfolio",
  description:
    "4th year BSIT student at Bulacan State University. Systems, photography, and editing.",
};

const themeBoot = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

const sidebarBoot = `
(function () {
  try {
    var stored = localStorage.getItem("portfolio-sidebar-collapsed");
    var collapsed = stored === "true";
    document.documentElement.setAttribute(
      "data-sidebar",
      collapsed ? "collapsed" : "expanded"
    );
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBoot }}
        />
        <Script
          id="sidebar-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: sidebarBoot }}
        />
      </head>
      <body className="min-h-full font-sans">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

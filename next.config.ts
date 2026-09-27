import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: "/projects/nemoto-yukari-tenshi-resume.pdf",
        destination: "/projects/Nemoto-Yukari-Tenshi-Resume.pdf",
      },
      {
        source: "/nemoto-yukari-tenshi-resume.pdf",
        destination: "/projects/Nemoto-Yukari-Tenshi-Resume.pdf",
      },
    ];
  },
};

export default nextConfig;

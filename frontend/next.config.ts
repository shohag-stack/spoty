import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root (npm workspaces), so a stray lockfile higher up isn't picked as the root
  turbopack: { root: path.join(__dirname, "..") },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;

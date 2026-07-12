import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray package-lock.json under the
  // user's home dir otherwise makes Next infer the wrong root, which mislocates
  // the dev chunk paths (main-app.js 404s -> no client hydration).
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    // Cloudflare Workers has no Vercel image optimizer; serve images as-is.
    unoptimized: true,
  },
};

export default nextConfig;

// Makes Cloudflare bindings/context available during `next dev`.
initOpenNextCloudflareForDev();

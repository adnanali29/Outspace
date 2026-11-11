import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // The home folder has its own package.json and lockfile; keep the root here.
    root: __dirname,
  },
};

export default nextConfig;

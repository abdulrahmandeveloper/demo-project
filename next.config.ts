import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Disable Turbopack
  },
  images: {
    domains: [
      "image.tmdb.org",
      // other domains you might have...
    ],
  },
};

export default nextConfig;

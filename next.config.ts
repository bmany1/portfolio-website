import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Prevent bundling jsdom/isomorphic-dompurify - fixes Sanity Studio issue with jsdom v27
  // See: https://github.com/jsdom/jsdom/issues/3937
  serverExternalPackages: ["jsdom", "isomorphic-dompurify"],
};

export default nextConfig;

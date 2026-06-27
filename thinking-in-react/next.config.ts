import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "react.dev",
      },
    ],
  },
};

export default nextConfig;

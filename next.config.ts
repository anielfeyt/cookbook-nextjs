import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ionqgrbblxsnrjudfsgu.supabase.co",
      },
    ],
  },
  transpilePackages: ["react-daisyui"],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: false, // Prevents Spline buffer stream crash in dev mode
  transpilePackages: ['three'],
};


export default nextConfig;

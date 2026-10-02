import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile higher up the tree isn't picked instead.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

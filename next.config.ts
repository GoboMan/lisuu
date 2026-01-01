import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // これを追加：PrismaをTurbopackの最適化対象から外す（重要！）
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
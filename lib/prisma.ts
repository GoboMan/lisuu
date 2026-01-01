// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

// URLがない場合は安全に停止させる
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
    // ✅ ここが正しい書き方です
    datasources: {
      db: { // schema.prisma の "datasource db" の名前と一致させる
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
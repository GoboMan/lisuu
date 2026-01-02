import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

// 1. TypeScriptにglobalの型を教える
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. PrismaClientを初期化する関数を作成
const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5 // 必要に応じて調整（開発なら5で十分です）
  });
  
  return new PrismaClient({ adapter });
};

// 3. すでにglobalにインスタンスがあればそれを使い、なければ新しく作る
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// 4. 本番環境以外（開発環境）では、globalにインスタンスを保存する
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
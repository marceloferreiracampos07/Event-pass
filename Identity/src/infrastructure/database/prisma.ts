import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const logOptions = process.env.NODE_ENV === "production" 
  ? (["error"] as const) 
  : (["query", "error", "warn"] as const);

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: logOptions,
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

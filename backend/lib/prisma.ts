import { PrismaClient } from "@/generated/prisma";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;
if (!globalForPrisma.prisma) {
  prisma = new PrismaClient();
  globalForPrisma.prisma = prisma;
} else {
  prisma = globalForPrisma.prisma;
}
export { prisma };
// PrismaClient;
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

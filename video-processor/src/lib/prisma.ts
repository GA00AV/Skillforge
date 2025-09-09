import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;
if (!globalForPrisma.prisma) {
  prisma = new PrismaClient();
  globalForPrisma.prisma = prisma;
} else {
  prisma = globalForPrisma.prisma;
}
export { prisma };

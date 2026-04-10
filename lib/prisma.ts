import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Re-habilitamos el patrón Singleton correctamente para evitar agotar las conexiones.
// En desarrollo, Next.js recarga archivos constantemente, lo que creaba un nuevo cliente en cada cambio.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    errorFormat: 'pretty',
    log: [{ level: 'query', emit: 'event' }],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

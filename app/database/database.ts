import { prisma } from ".";

export const Database = {
  transaction: prisma.$transaction.bind(prisma),
  queryRaw: prisma.$queryRaw.bind(prisma),
  queryRawUnsafe: prisma.$queryRawUnsafe.bind(prisma),
  executeRaw: prisma.$executeRaw.bind(prisma),
  executeRawUnsafe: prisma.$executeRawUnsafe.bind(prisma),
};

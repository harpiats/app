/**
 *
 * This file serves as a placeholder for configuration when creating
 * a new project using create-harpia-app.
 *
 */

import { PrismaClient } from "./prisma/client";
import { Observer } from "./observer";

export const prisma = new PrismaClient();
export const observer = new Observer<typeof prisma>(prisma);

export const Database = {
  transaction: prisma.$transaction.bind(prisma),
  queryRaw: prisma.$queryRaw.bind(prisma),
  queryRawUnsafe: prisma.$queryRawUnsafe.bind(prisma),
  executeRaw: prisma.$executeRaw.bind(prisma),
  executeRawUnsafe: prisma.$executeRawUnsafe.bind(prisma),
};

export const {
} = prisma;

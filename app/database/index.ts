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

export const {
} = prisma;

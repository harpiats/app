import { PrismaClient } from "@prisma/client";
import { Observer } from "./observer";

const client = new PrismaClient();
export const observer = new Observer(client);

export const prisma = observer.prisma;
export const {
  // hello: Hello
} = prisma;

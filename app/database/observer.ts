import type { PrismaClient } from "app/database/prisma/client";
import type { ModelKeys, ObserverCallback, ObserversRegistry, PrismaOperation } from "app/types/observer";

export class Observer<Prisma extends PrismaClient> {
  public readonly prisma: Prisma;
  private observers: ObserversRegistry<ModelKeys<Prisma>> = {} as any;

  constructor(prisma: Prisma) {
    this.prisma = prisma.$extends({
      query: {
        $allModels: {
          $allOperations: ({ model, operation, args, query }: any) => {
            const cb = this.observers[model as keyof typeof this.observers]?.[operation as PrismaOperation];
            if (cb) cb({ model, operation: operation as PrismaOperation, data: args });
            return query(args);
          },
        },
      },
    }) as Prisma;
  }

  /**
   * Set an observer for a specific model and operation
   * @param model - The model name
   * @param operation - The Prisma operation
   * @param callback - The callback function to execute
   */
  public set<Model extends ModelKeys<Prisma>>(model: Model, operation: PrismaOperation, callback: ObserverCallback) {
    this.observers[model] ??= {};
    this.observers[model][operation] = callback;
  }
}

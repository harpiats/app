import type { ModelKeys, ObserverCallback, ObserversRegistry, PrismaOperation } from "app/types/observer";
import type { PrismaClient } from "prisma/generated/client";

export class Observer<Prisma extends PrismaClient> {
  private observers: ObserversRegistry<ModelKeys<Prisma>> = {} as any;
  public readonly prisma: Prisma;

  constructor(prisma: Prisma) {
    this.prisma = this.init(prisma);
  }

  private init(prisma: Prisma): Prisma {
    const observers = this.observers;

    return prisma.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const cb = observers[model as keyof typeof observers]?.[operation as PrismaOperation];
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

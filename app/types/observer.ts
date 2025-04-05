export type PrismaOperation =
  | "findUnique"
  | "findUniqueOrThrow"
  | "findFirst"
  | "findFirstOrThrow"
  | "findMany"
  | "create"
  | "createMany"
  | "createManyAndReturn"
  | "delete"
  | "update"
  | "deleteMany"
  | "updateMany"
  | "updateManyAndReturn"
  | "upsert"
  | "aggregate"
  | "groupBy"
  | "count";

export type ObserverCallback<T = any> = (params: { model: string; operation: PrismaOperation; data: T }) => void;

export type ModelKeys<T> = {
  [K in keyof T]: T[K] extends { findUnique: any } ? Capitalize<string & K> : never;
}[keyof T];

export type ObserversRegistry<ModelNames extends string> = Record<
  ModelNames,
  Partial<Record<PrismaOperation, ObserverCallback>>
>;

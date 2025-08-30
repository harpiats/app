import type { Faker } from "@faker-js/faker";

export type Attributes = Record<string, any>;

export type ModelDefinition<ModelType, AttributesType> = {
  create: (args: { data: AttributesType }) => Promise<ModelType>;
};

export type PickableObject<T> = T & {
  pick<K extends keyof T>(keys: K | K[]): Pick<T, K>;
  get<K extends keyof T>(keys: K | K[]): K extends keyof T ? T[K] : T[K][];
};

export type PickableArray<T> = Array<T> & {
  pick<K extends keyof T>(keys: K | K[]): Array<Pick<T, K>>;
  get<K extends keyof T>(keys: K | K[]): K extends keyof T ? T[K][] : T[K][][];
};

export type PickablePromise<T> = Promise<PickableObject<T>> & {
  pick<K extends keyof T>(keys: K | K[]): Promise<Pick<T, K>>;
  get<K extends keyof T>(keys: K | K[]): Promise<K extends keyof T ? T[K] : T[K][]>;
};

export type PickablePromiseArray<T> = Promise<PickableArray<T>> & {
  pick<K extends keyof T>(keys: K | K[]): Promise<Array<Pick<T, K>>>;
  get<K extends keyof T>(keys: K | K[]): Promise<K extends keyof T ? T[K][] : T[K][][]>;
};

export type FactoryType<ModelType extends object, AttributesType> = {
  merge: (attributes: Partial<AttributesType>) => FactoryType<ModelType, AttributesType>;
  create: () => PickablePromise<ModelType>;
  createMany: (count: number) => PickablePromiseArray<ModelType>;
  makeStubbed: () => Promise<AttributesType>;
  makeStubbedMany: (count: number) => Promise<AttributesType[]>;
};

export type DefineType = <ModelType extends object, AttributesType = Attributes>(
  model: ModelDefinition<ModelType, AttributesType>,
  attributes: (faker: Faker) => AttributesType,
) => FactoryType<ModelType, AttributesType>;

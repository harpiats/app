export type Attributes = Record<string, any>;

export type ModelDefinition<ModelType, AttributesType> = {
  create: (args: { data: AttributesType }) => Promise<ModelType>;
};

export type FactoryType<ModelType, AttributesType> = {
  merge: (attributes: Partial<AttributesType>) => FactoryType<ModelType, AttributesType>;
  create: () => Promise<ModelType>;
  createMany: (count: number) => Promise<ModelType[]>;
  makeStubbed: () => Promise<AttributesType>;
  makeStubbedMany: (count: number) => Promise<AttributesType[]>;
};

import { type Faker, faker } from "@faker-js/faker";

export type Attributes = Record<string, any>;

export type FactoryType = {
  merge: (attributes: Attributes) => FactoryType;
  create: () => Promise<any>;
  createMany: (count: number) => Promise<any[]>;
  makeStubbed: () => Promise<Attributes>;
  makeStubbedMany: (count: number) => Promise<Attributes[]>;
};

export class Factory {
  private $model: any;
  private $attributesFn: (faker: Faker) => Attributes = () => ({});
  private $mergedAttributes: Attributes = {};

  define(model: any, attributes: (faker: Faker) => Attributes): FactoryType {
    this.$model = model;
    this.$attributesFn = attributes;

    return this;
  }

  merge(attributes: Attributes): FactoryType {
    this.$mergedAttributes = { ...this.$mergedAttributes, ...attributes };

    return this;
  }

  async create(): Promise<any> {
    const data = { ...this.$attributesFn(faker), ...this.$mergedAttributes };
    const query = await this.$model.create({ data });

    return query;
  }

  async createMany(count: number): Promise<any[]> {
    const records: any[] = [];

    for (let i = 0; i < count; i++) {
      records.push(await this.create());
    }

    this.$mergedAttributes = {};

    return records;
  }

  async makeStubbed(): Promise<Attributes> {
    return { ...this.$attributesFn(faker), ...this.$mergedAttributes };
  }

  async makeStubbedMany(count: number): Promise<Attributes[]> {
    const stubs: Attributes[] = [];

    for (let i = 0; i < count; i++) {
      stubs.push(await this.makeStubbed());
    }

    return stubs;
  }
}

import { type Faker, faker } from "@faker-js/faker";
import type { Attributes, FactoryType, ModelDefinition } from "app/types/factory";

export class Factory {
  private $model: any;
  private $attributesFn: (faker: Faker) => any = () => ({});
  private $mergedAttributes: Attributes = {};

  public define<ModelType, AttributesType = Attributes>(
    model: ModelDefinition<ModelType, AttributesType>,
    attributes: (faker: Faker) => AttributesType,
  ): FactoryType<ModelType, AttributesType> {
    this.$model = model;
    this.$attributesFn = attributes;

    const self = this;

    return {
      merge(attributes: Partial<AttributesType>) {
        self.$mergedAttributes = { ...self.$mergedAttributes, ...attributes };
        return this;
      },

      async create(): Promise<ModelType> {
        const data = { ...self.$attributesFn(faker), ...self.$mergedAttributes };
        return self.$model.create({ data });
      },

      async createMany(count: number): Promise<ModelType[]> {
        const results: ModelType[] = [];
        for (let i = 0; i < count; i++) {
          results.push(await this.create());
        }
        self.$mergedAttributes = {};
        return results;
      },

      async makeStubbed(): Promise<AttributesType> {
        return { ...self.$attributesFn(faker), ...self.$mergedAttributes };
      },

      async makeStubbedMany(count: number): Promise<AttributesType[]> {
        const results: AttributesType[] = [];
        for (let i = 0; i < count; i++) {
          results.push(await this.makeStubbed());
        }
        return results;
      },
    };
  }
}

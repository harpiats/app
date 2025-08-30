import { type Faker, faker } from "@faker-js/faker";
import type {
  Attributes,
  FactoryType,
  ModelDefinition,
  PickableArray,
  PickableObject,
  PickablePromise,
  PickablePromiseArray,
} from "app/types/factory";

export class Factory {
  private $model: any;
  private $attributesFn: (faker: Faker) => any = () => ({});
  private $mergedAttributes: Attributes = {};

  private addPickToObject<T extends object>(obj: T): PickableObject<T> {
    const pickableObject = obj as PickableObject<T>;

    pickableObject.pick = <K extends keyof T>(keys: K | K[]): Pick<T, K> => {
      if (Array.isArray(keys)) {
        const result: Partial<T> = {};
        keys.forEach((key) => {
          result[key] = obj[key];
        });
        return result as Pick<T, K>;
      } else {
        return { [keys]: obj[keys] } as Pick<T, K>;
      }
    };

    pickableObject.get = <K extends keyof T>(keys: K | K[]): any => {
      if (Array.isArray(keys)) {
        return keys.map((key) => obj[key]);
      } else {
        return obj[keys];
      }
    };

    return pickableObject;
  }

  private addPickToArray<T extends object>(arr: T[]): PickableArray<T> {
    const pickableArray = arr as PickableArray<T>;

    pickableArray.pick = <K extends keyof T>(keys: K | K[]): Array<Pick<T, K>> =>
      arr.map((item) => {
        if (Array.isArray(keys)) {
          const result: Partial<T> = {};
          keys.forEach((key) => {
            result[key] = item[key];
          });
          return result as Pick<T, K>;
        } else {
          return { [keys]: item[keys] } as Pick<T, K>;
        }
      });

    pickableArray.get = <K extends keyof T>(keys: K | K[]): any => {
      if (Array.isArray(keys)) {
        return arr.map((item) => keys.map((key) => item[key]));
      } else {
        return arr.map((item) => item[keys]);
      }
    };

    return pickableArray;
  }

  private isPickableObject<T>(obj: any): obj is PickableObject<T> {
    return (
      obj &&
      typeof obj === "object" &&
      "pick" in obj &&
      typeof obj.pick === "function" &&
      "value" in obj &&
      typeof obj.value === "function"
    );
  }

  private isPickableArray<T>(arr: any): arr is PickableArray<T> {
    return (
      Array.isArray(arr) &&
      "pick" in arr &&
      "get" in arr &&
      typeof (arr as PickableArray<T>).pick === "function" &&
      typeof (arr as PickableArray<T>).get === "function"
    );
  }

  private addPickToPromise<T extends object>(promise: Promise<T>): PickablePromise<T> {
    const pickablePromise = promise as PickablePromise<T>;

    pickablePromise.pick = async <K extends keyof T>(keys: K | K[]): Promise<Pick<T, K>> => {
      const obj = await promise;

      if (this.isPickableObject<T>(obj)) {
        return obj.pick(keys);
      } else {
        const pickableObj = this.addPickToObject(obj);
        return pickableObj.pick(keys);
      }
    };

    pickablePromise.get = async <K extends keyof T>(keys: K | K[]): Promise<any> => {
      const obj = await promise;

      if (this.isPickableObject<T>(obj)) {
        return obj.get(keys);
      } else {
        const pickableObj = this.addPickToObject(obj);
        return pickableObj.get(keys);
      }
    };

    return pickablePromise;
  }

  private addPickToPromiseArray<T extends object>(promise: Promise<T[]>): PickablePromiseArray<T> {
    const pickablePromiseArray = promise as PickablePromiseArray<T>;

    pickablePromiseArray.pick = async <K extends keyof T>(keys: K | K[]): Promise<Array<Pick<T, K>>> => {
      const arr = await promise;

      if (this.isPickableArray<T>(arr)) {
        return arr.pick(keys);
      } else {
        const pickableArr = this.addPickToArray(arr);
        return pickableArr.pick(keys);
      }
    };

    pickablePromiseArray.get = async <K extends keyof T>(keys: K | K[]): Promise<any> => {
      const arr = await promise;

      if (this.isPickableArray<T>(arr)) {
        return arr.get(keys);
      } else {
        const pickableArr = this.addPickToArray(arr);
        return pickableArr.get(keys);
      }
    };

    return pickablePromiseArray;
  }

  public define<ModelType extends object, AttributesType = Attributes>(
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

      create(): PickablePromise<ModelType> {
        const promise = (async () => {
          const data = { ...self.$attributesFn(faker), ...self.$mergedAttributes };
          const model = await self.$model.create({ data });

          return self.addPickToObject(model);
        })();

        return self.addPickToPromise(promise);
      },

      createMany(count: number): PickablePromiseArray<ModelType> {
        const promise = (async () => {
          const results: ModelType[] = [];

          for (let i = 0; i < count; i++) {
            const data = { ...self.$attributesFn(faker), ...self.$mergedAttributes };
            const model = await self.$model.create({ data });
            results.push(model);
          }

          self.$mergedAttributes = {};
          return self.addPickToArray(results);
        })();

        return self.addPickToPromiseArray(promise);
      },

      async makeStubbed(): Promise<AttributesType> {
        return { ...self.$attributesFn(faker), ...self.$mergedAttributes };
      },

      async makeStubbedMany(count: number): Promise<AttributesType[]> {
        const results: AttributesType[] = [];

        for (let i = 0; i < count; i++) {
          results.push({ ...self.$attributesFn(faker), ...self.$mergedAttributes });
        }

        return results;
      },
    };
  }
}

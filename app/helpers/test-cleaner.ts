import type { ModelMap, RecordsToDelete } from "app/types/test-cleaner";

export class TestCleaner<T extends ModelMap> {
  private models: T;
  private recordsToDelete: RecordsToDelete = {};
  private modelKeys: Array<keyof T>;

  constructor(models: T) {
    this.models = models;
    this.modelKeys = Object.keys(models) as Array<keyof T>;
    this.setup(models);
  }

  private setup(models: T): void {
    this.recordsToDelete = {};

    Object.keys(models).forEach((key) => {
      this.recordsToDelete[key] = [];
    });
  }

  public register<K extends keyof T>(modelName: K, id: number): void {
    if (!this.models[modelName]) {
      throw new Error(`Model "${String(modelName)}" not found. Make sure it was provided in the constructor.`);
    }

    this.recordsToDelete[String(modelName)].push(id);
  }

  public registerMany<K extends keyof T>(modelName: K, ids: number[]): void {
    if (!this.models[modelName]) {
      throw new Error(`Model "${String(modelName)}" not found. Make sure it was provided in the constructor.`);
    }

    this.recordsToDelete[String(modelName)].push(...ids);
  }

  public async clean(): Promise<void> {
    for (const modelName of this.modelKeys) {
      const ids = this.recordsToDelete[String(modelName)];
      const model = this.models[modelName];

      if (!model || ids.length === 0) continue;

      for (const id of ids) {
        try {
          await model.delete({ where: { id } });
        } catch (error: any) {
          console.warn(`Failed to delete ${String(modelName)} with id ${id}: ${error.message}`);
        }
      }

      ids.length = 0;
    }
  }

  public reset(): void {
    Object.keys(this.recordsToDelete).forEach((key) => {
      this.recordsToDelete[key].length = 0;
    });
  }

  public getModels(): Array<keyof T> {
    return [...this.modelKeys];
  }

  public getPendingRecords(): RecordsToDelete {
    return { ...this.recordsToDelete };
  }
}

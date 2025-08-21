import _ from "lodash";

export class ObjectUtility {
  private static instance: ObjectUtility;

  private constructor() {}

  /**
   * Returns the singleton instance of ObjectUtility.
   */
  public static getInstance(): ObjectUtility {
    if (!ObjectUtility.instance) {
      ObjectUtility.instance = new ObjectUtility();
    }
    return ObjectUtility.instance;
  }

  /**
   * Merges two or more objects.
   */
  public merge<T>(...objects: T[]): T {
    return _.merge({}, ...objects);
  }

  /**
   * Picks specific properties from an object.
   */
  public pick<T>(obj: T, keys: string[]): Partial<T> {
    return _.pick(obj, keys);
  }

  /**
   * Omits specific properties from an object.
   */
  public omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return _.omit(obj, keys) as Omit<T, K>;
  }

  /**
   * Omits specific properties from each object in a list.
   */
  public omitFromList<T extends object, K extends keyof T>(list: T[], keys: K[]): Omit<T, K>[] {
    return list.map((obj) => this.omit(obj, keys));
  }

  /**
   * Checks if an object is empty.
   */
  public isEmpty(obj: object): boolean {
    return _.isEmpty(obj);
  }
}

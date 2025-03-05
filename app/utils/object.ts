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
  public omit<T extends object>(obj: T, keys: string[]): Partial<T> {
    return _.omit(obj, keys) as Partial<T>;
  }

  /**
   * Omits specific properties from each object in a list.
   */
  public omitFromList<T extends object>(list: T[], keys: string[]): Partial<T>[] {
    return list.map((obj) => this.omit(obj, keys));
  }

  /**
   * Checks if an object is empty.
   */
  public isEmpty(obj: object): boolean {
    return _.isEmpty(obj);
  }
}

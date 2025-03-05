import _ from "lodash";

export class ArrayUtility {
  private static instance: ArrayUtility;

  private constructor() {}

  /**
   * Returns the singleton instance of ArrayUtility.
   */
  public static getInstance(): ArrayUtility {
    if (!ArrayUtility.instance) {
      ArrayUtility.instance = new ArrayUtility();
    }
    return ArrayUtility.instance;
  }

  /**
   * Sorts an array by a specific property.
   */
  public sortBy<T>(array: T[], key: string): T[] {
    return _.sortBy(array, key);
  }

  /**
   * Filters an array based on a predicate function.
   */
  public filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
    return _.filter(array, predicate);
  }

  /**
   * Removes falsy values (false, null, 0, "", undefined, NaN) from an array.
   */
  public compact<T>(array: T[]): T[] {
    return _.compact(array);
  }

  /**
   * Returns unique values from an array.
   */
  public uniq<T>(array: T[]): T[] {
    return _.uniq(array);
  }

  /**
   * Returns the difference between two arrays.
   */
  public difference<T>(array1: T[], array2: T[]): T[] {
    return _.difference(array1, array2);
  }
}

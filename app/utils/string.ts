import inflection from "inflection";
import _ from "lodash";

export class StringUtility {
  private static instance: StringUtility;

  private constructor() {}

  /**
   * Returns the singleton instance of StringUtility.
   */
  public static getInstance(): StringUtility {
    if (!StringUtility.instance) {
      StringUtility.instance = new StringUtility();
    }
    return StringUtility.instance;
  }

  /**
   * Converts a word to plural.
   */
  public pluralize(word: string): string {
    return inflection.pluralize(word);
  }

  /**
   * Converts a word to singular.
   */
  public singularize(word: string): string {
    return inflection.singularize(word);
  }

  /**
   * Converts a string to camelCase.
   */
  public camelCase(str: string): string {
    return _.camelCase(str);
  }

  /**
   * Converts a string to PascalCase.
   */
  public pascalCase(str: string): string {
    return _.upperFirst(_.camelCase(str));
  }

  /**
   * Converts a string to snake_case.
   */
  public snakeCase(str: string): string {
    return _.snakeCase(str);
  }

  /**
   * Converts a string to kebab-case.
   */
  public kebabCase(str: string): string {
    return _.kebabCase(str);
  }

  /**
   * Capitalizes the first letter of a string.
   */
  public capitalize(str: string): string {
    return _.capitalize(str);
  }

  /**
   * Checks if a string contains a substring.
   */
  public contains(str: string, substring: string): boolean {
    return _.includes(str, substring);
  }

  /**
   * Removes whitespace from the beginning and end of a string.
   */
  public trim(str: string): string {
    return _.trim(str);
  }
}

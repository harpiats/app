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
   * Converts a word to its plural form.
   */
  public pluralize(word: string): string {
    return inflection.pluralize(word);
  }

  /**
   * Converts a word to its singular form.
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
   * Removes whitespace from both ends of a string.
   */
  public trim(str: string): string {
    return _.trim(str);
  }

  /**
   * Removes all non-numeric characters from a string.
   */
  public onlyNumbers(str: string): string {
    return _.replace(str, /[^\d]/g, "");
  }

  /**
   * Removes all non-letter characters (preserves spaces).
   */
  public onlyLetters(str: string): string {
    return _.replace(str, /[^a-zA-Z\s]/g, "");
  }

  /**
   * Converts string to URL-friendly slug format.
   */
  public toSlug(str: string): string {
    return _.kebabCase(_.deburr(str).toLowerCase());
  }

  /**
   * Truncates a string with ellipsis if it exceeds max length.
   * @example truncate("Long text here", 9) → "Long text..."
   */
  public truncate(str: string, maxLength: number): string {
    return _.truncate(str, { length: maxLength, omission: "..." });
  }

  /**
   * Removes special characters (keeps alphanumeric + spaces).
   */
  public alphanumeric(str: string): string {
    return _.replace(_.deburr(str), /[^\w\s]/gi, "");
  }

  /**
   * Removes HTML/XML tags from a string.
   * @example stripTags("<div>Hello</div>") → "Hello"
   */
  public stripTags(str: string): string {
    return _.replace(str, /<[^>]*>/g, "");
  }
}

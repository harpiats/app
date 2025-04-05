import type { FormatToken, Locale, Unit } from "app/types/date-utility";
import { Utils } from ".";

export class DateUtility {
  private date: Date;
  private locale: Locale;

  constructor(input?: Date | string | number, locale?: Locale) {
    this.date = this.parse(input);
    this.locale = locale || "en";
  }

  /**
   * Parse input to Date object
   */
  private parse(input?: Date | string | number): Date {
    if (!input) return new Date();

    if (input instanceof Date) return new Date(input.getTime());

    if (typeof input === "number") return new Date(input);

    if (typeof input === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
        const [year, month, day] = input.split("-").map(Number);

        return new Date(year, month - 1, day);
      }

      const parsedDate = new Date(input);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
      }

      throw new Error(`Formato de data não suportado: "${input}"`);
    }

    throw new Error("Tipo de entrada inválido para DateUtility");
  }

  /**
   * Get month name in current locale
   */
  public getMonthName(): string {
    const month = Utils.string.capitalize(new Intl.DateTimeFormat(this.locale, { month: "long" }).format(this.date));
    return month;
  }

  /**
   * Get day name in current locale
   */
  public getDayName(date?: Date): string {
    const targetDate = date || this.date;
    const day = Utils.string.capitalize(new Intl.DateTimeFormat(this.locale, { weekday: "long" }).format(targetDate));
    return day;
  }

  /**
   * Check if date is valid
   */
  public isValid(): boolean {
    return !Number.isNaN(this.date.getTime());
  }

  /**
   * Format date using Moment.js-like tokens
   * @param formatStr E.g.: 'YYYY-MM-DD HH:mm:ss'
   */
  public format(formatStr: string): string {
    const replacements = this.getReplacements();

    return formatStr.replace(
      /(YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a)/g,
      (match) => replacements[match as FormatToken] || match,
    );
  }

  /**
   * Format date in UTC using Moment.js-like tokens
   * @param formatStr E.g.: 'YYYY-MM-DD HH:mm:ss'
   */
  public formatUTC(formatStr: string): string {
    const replacements = this.getReplacements(true);

    return formatStr.replace(
      /(YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a)/g,
      (match) => replacements[match as FormatToken] || match,
    );
  }

  /**
   * Add time to the date
   * @param amount Quantity to add
   * @param unit Unit of time
   */
  public add(amount: number, unit: Unit): DateUtility {
    const newDate = new Date(this.date.getTime());
    const normalizedUnit = unit.replace(/s$/, "") as Exclude<Unit, `${string}s`>;

    if (normalizedUnit === "month") {
      const day = newDate.getDate();
      newDate.setMonth(newDate.getMonth() + amount);

      if (newDate.getDate() !== day) {
        newDate.setDate(0);
      }
    } else {
      const methods: Record<typeof normalizedUnit, () => void> = {
        year: () => newDate.setFullYear(newDate.getFullYear() + amount),
        day: () => newDate.setDate(newDate.getDate() + amount),
        hour: () => newDate.setHours(newDate.getHours() + amount),
        minute: () => newDate.setMinutes(newDate.getMinutes() + amount),
        second: () => newDate.setSeconds(newDate.getSeconds() + amount),
        millisecond: () => newDate.setMilliseconds(newDate.getMilliseconds() + amount),
      };

      methods[normalizedUnit]?.();
    }

    return new DateUtility(newDate);
  }

  /**
   * Subtract time from the date
   * @param amount Quantity to subtract
   * @param unit Unit of time
   */
  public subtract(amount: number, unit: Unit): DateUtility {
    return this.add(-amount, unit);
  }

  /**
   * Calculate difference between dates in specified unit
   * @param otherDate Date for comparison
   * @param unit Time unit for result
   */
  public difference(otherDate: DateUtility, unit: Unit): number {
    const thisTime = this.date.getTime();
    const otherTime = otherDate.date.getTime();
    const diff = otherTime - thisTime;

    const units: Record<Unit, number> = {
      millisecond: 1,
      second: 1000,
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      year: 1000 * 60 * 60 * 24 * 365,
      month: 1000 * 60 * 60 * 24 * 30,
      milliseconds: 1,
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
      years: 1000 * 60 * 60 * 24 * 365,
      months: 1000 * 60 * 60 * 24 * 30,
    };

    return Math.floor(diff / units[unit]);
  }

  /**
   * Get start of time unit (day, hour, minute, second)
   */
  public startOf(unit: Exclude<Unit, "year" | "years" | "month" | "months">): DateUtility {
    const newDate = new Date(this.date.getTime());
    const normalizedUnit = unit.replace(/s$/, "") as "day" | "hour" | "minute" | "second";

    const methods = {
      day: () => newDate.setHours(0, 0, 0, 0),
      hour: () => newDate.setMinutes(0, 0, 0),
      minute: () => newDate.setSeconds(0, 0),
      second: () => newDate.setMilliseconds(0),
    };

    methods[normalizedUnit]?.();
    return new DateUtility(newDate);
  }

  /**
   * Get end of time unit (day, hour, minute, second)
   */
  public endOf(unit: Exclude<Unit, "year" | "years" | "month" | "months">): DateUtility {
    const newDate = new Date(this.date.getTime());
    const normalizedUnit = unit.replace(/s$/, "") as "day" | "hour" | "minute" | "second";

    const methods = {
      day: () => newDate.setHours(23, 59, 59, 999),
      hour: () => newDate.setMinutes(59, 59, 999),
      minute: () => newDate.setSeconds(59, 999),
      second: () => newDate.setMilliseconds(999),
    };

    methods[normalizedUnit]?.();
    return new DateUtility(newDate);
  }

  /**
   * Check if date is before another date
   */
  public isBefore(otherDate: DateUtility): boolean {
    return this.date.getTime() < otherDate.date.getTime();
  }

  /**
   * Check if date is after another date
   */
  public isAfter(otherDate: DateUtility): boolean {
    return this.date.getTime() > otherDate.date.getTime();
  }

  /**
   * Check if dates are equal (optionally with precision)
   */
  public isSame(otherDate: DateUtility, unit?: Unit): boolean {
    const units = ["year", "month", "day", "hour", "minute", "second"];
    const precision = units.indexOf(unit?.replace(/s$/, "") || "millisecond");

    return this.toPrecision(precision) === otherDate.toPrecision(precision);
  }

  /**
   * Convert date to string with specified precision
   */
  private toPrecision(precision: number): string {
    return [
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
      this.date.getMilliseconds(),
    ]
      .slice(0, precision + 1)
      .join("-");
  }

  /**
   * Get replacement values for format tokens
   */
  private getReplacements(utc = false): Record<FormatToken, string> {
    const get = (method: string) => {
      const prefix = utc ? "getUTC" : "get";
      const methodName = `${prefix}${method}` as keyof Date;

      return (this.date[methodName] as () => number)();
    };

    const year = get("FullYear");
    const month = get("Month");
    const day = get("Date");
    const hours = get("Hours");
    const minutes = get("Minutes");
    const seconds = get("Seconds");
    const milliseconds = get("Milliseconds");

    return {
      YYYY: String(year),
      YY: String(year).slice(-2),
      MM: String(month + 1).padStart(2, "0"),
      M: String(month + 1),
      DD: String(day).padStart(2, "0"),
      D: String(day),
      HH: String(hours).padStart(2, "0"),
      H: String(hours),
      hh: String(hours % 12 || 12).padStart(2, "0"),
      h: String(hours % 12 || 12),
      mm: String(minutes).padStart(2, "0"),
      m: String(minutes),
      ss: String(seconds).padStart(2, "0"),
      s: String(seconds),
      SSS: String(milliseconds).padStart(3, "0"),
      A: hours < 12 ? "AM" : "PM",
      a: hours < 12 ? "am" : "pm",
    };
  }
}

export type Unit =
  | "year"
  | "years"
  | "month"
  | "months"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds"
  | "millisecond"
  | "milliseconds";

export type FormatToken =
  | "YYYY"
  | "YY"
  | "MM"
  | "M"
  | "DD"
  | "D"
  | "HH"
  | "H"
  | "hh"
  | "h"
  | "mm"
  | "m"
  | "ss"
  | "s"
  | "SSS"
  | "A"
  | "a";

export type Locale = "en" | "pt" | "es" | "fr" | "de" | "it" | "ja" | "zh" | "ru";

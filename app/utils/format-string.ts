/**
 * Capitalizes the first letter of a string
 */
export function fCapitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts string to title case
 */
export function fTitleCase(str: string): string {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .map(word => fCapitalize(word))
    .join(" ");
}

/**
 * Converts camelCase to kebab-case
 */
export function fCamelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Converts kebab-case to camelCase
 */
export function fKebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Converts camelCase to snake_case
 */
export function fCamelToSnake(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1_$2").toLowerCase();
}

/**
 * Converts snake_case to camelCase
 */
export function fSnakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Truncates string to specified length with ellipsis
 */
export function fTruncate(str: string, length: number, suffix = "..."): string {
  if (!str || str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Removes extra whitespace and trims
 */
export function fNormalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

/**
 * Formats a string as a slug (URL-friendly)
 */
export function fSlugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats currency amount
 */
export function fCurrency(amount: number | string, locale = "en-US"): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0";

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Formats date to localized string
 */
export function fDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  locale = "en-US"
): string {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Pads string with specified character to reach target length
 */
export function fPadString(
  str: string,
  length: number,
  padChar = " ",
  padStart = true
): string {
  if (str.length >= length) return str;
  const padding = padChar.repeat(length - str.length);
  return padStart ? padding + str : str + padding;
}

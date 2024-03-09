import { isDev } from "@builder.io/qwik/build";
import { validateLocale } from "qwik-speak";

import { config } from "~/speak.config";

/**
 * Generates a random number between min and max (inclusive).
 *
 * @param min - The minimum possible value.
 * @param max - The maximum possible value.
 * @returns A random number between min and max.
 */
export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

/**
 * Linearly interpolates between two numbers.
 *
 * @param start - The start value.
 * @param end - The end value.
 * @param amount - The amount to interpolate.
 * @returns The interpolated value.
 */
export const lerp = (start: number, end: number, amount: number) => {
  return (1 - amount) * start + amount * end;
};

/**
 * Clamp a value between a minimum and maximum.
 *
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Get the user's language.
 *
 * @param lang - The user's language.
 * @returns The user's language if it's supported, otherwise the default
 *   language.
 * @throws Will throw an error if no locale is found for the given language.
 */
export const getLang = (lang?: string) => {
  if (lang && validateLocale(lang)) {
    const userLang = config.supportedLocales.find(
      (value) => value.lang === lang,
    )?.lang;
    if (!userLang) throw new Error(`No locale found for lang: ${lang}`);
    return userLang;
  }

  return config.defaultLocale.lang;
};

/**
 * Get the asset path for a given path. If in dev, return the local dev path.
 * Otherwise, return the CDN path.
 *
 * @param path - The path to the asset.
 * @returns The asset path.
 */
export const getAssetPath = (path: string) => {
  if (isDev) return `/${path}`;
  return `${import.meta.env.PUBLIC_IMGIX_URL}/${path}`;
};

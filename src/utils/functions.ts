import { validateLocale } from "qwik-speak";

import { config } from "~/speak.config";

import { BLOG_POST_THUMBNAIL_LIST } from "./constants";

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
 * Generates a source set for a blog post thumbnail.
 *
 * @param slug - The slug of the blog post.
 * @param locale - The locale of the blog post.
 * @returns A string containing the source set for the blog post thumbnail.
 * @throws Will throw an error if no thumbnail is found for the given slug.
 */
export const getBlogPostThumbnailSoure = ({
  slug,
  locale,
}: {
  locale: string;
  slug: string;
}) => {
  const path = `/src/content/${locale}/${slug}/thumbnail.png`;

  const thumbnail = BLOG_POST_THUMBNAIL_LIST[path];

  if (!thumbnail) {
    throw new Error(`No thumbnail found for slug: ${slug}`);
  }

  const srcset = thumbnail
    .map((img) => {
      return `${img.src} ${img.width}w`;
    })
    .join(", ");

  return srcset;
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

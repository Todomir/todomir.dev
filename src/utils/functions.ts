/**
 * Generates a random number between min and max (inclusive).
 *
 * @param min - The minimum possible value.
 * @param max - The maximum possible value.
 * @returns A random number between min and max.
 */
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

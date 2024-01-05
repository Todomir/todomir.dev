/**
 * Generates a random number between min and max (inclusive).
 *
 * @param min - The minimum possible value.
 * @param max - The maximum possible value.
 * @returns A random number between min and max.
 */
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

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
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

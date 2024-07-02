import type { HTMLAttributes } from "@builder.io/qwik";

import {
  component$,
  Slot,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";

import { random } from "~/utils/functions";

import CSS from "./sparkles.styles.css?inline";

const DEFAULT_COLORS = ["#ffd465", "#e4ba48", "#ded17a"];

/**
 * Generates a single sparkle object with random properties.
 *
 * @param color - The color of the sparkle.
 * @returns Sparkle object with random id, creation timestamp, size, position,
 *   and provided color.
 */
const generateSparkle = (color: string) => ({
  id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
  createdAt: Date.now(),
  color,
  size: random(10, 20),
  style: {
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
  },
});

const useSparkleStore = (color: string) =>
  useStore({
    sparkles: Array.from({
      length: 3,
    }).map(() => generateSparkle(color)),
  });

export const Sparkle = component$(
  (props: {
    color: string;
    size: number;
    style: HTMLAttributes<HTMLSpanElement>["style"];
  }) => {
    const path =
      "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";
    return (
      <span class="sparkle__wrapper" style={props.style} aria-hidden>
        <svg
          aria-hidden
          class="sparkle__svg"
          width={props.size}
          height={props.size}
          viewBox="0 0 68 68"
          fill="none"
        >
          <title>Sparkle</title>
          <path d={path} fill={props.color} />
        </svg>
      </span>
    );
  },
);

export default component$<{ color?: string }>((props) => {
  const color =
    props.color ?? DEFAULT_COLORS[random(0, DEFAULT_COLORS.length - 1)];
  const store = useSparkleStore(color);
  // CSS styles
  useStyles$(CSS);

   
  useVisibleTask$(({ track, cleanup }) => {
    track(() => store.sparkles);

    const interval = setInterval(
      () => {
        store.sparkles = [
          generateSparkle(color),
          ...store.sparkles.slice(0, store.sparkles.length - 1),
        ];
      },
      random(50, 900),
    );

    cleanup(() => clearInterval(interval));
  });

  return (
    <span class="sparkle">
      {store.sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong>
        <Slot />
      </strong>
    </span>
  );
});

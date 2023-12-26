// Imports
import type { HTMLAttributes } from "@builder.io/qwik";
import { Slot, component$, useStore, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import CSS from "./sparkles.styles.css?inline";

const DEFAULT_COLOR = "#FFC700";

// Helper functions
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

// Generate a single sparkle
const generateSparkle = (color: string) => ({
  id: String(random(10000, 99999)),
  createdAt: Date.now(),
  color,
  size: random(10, 20),
  style: {
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
  },
});

// Sparkle store
const useSparkleStore = (color: string) =>
  useStore({
    sparkles: [...Array(3)].map(() => generateSparkle(color)),
    prefersReducedMotion: false,
  });

// Sparkle component
export const Sparkle = component$(
  (props: { size: number; color: string; style: HTMLAttributes<HTMLSpanElement>["style"] }) => {
    const path =
      "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";
    return (
      <span class="sparkle__wrapper" style={props.style} aria-hidden>
        <svg aria-hidden class="sparkle__svg" width={props.size} height={props.size} viewBox="0 0 68 68" fill="none">
          <title>Sparkle</title>
          <path d={path} fill={props.color} />
        </svg>
      </span>
    );
  },
);

// Main Sparkles component
export const Sparkles = component$((props: { color?: string }) => {
  const color = props.color || DEFAULT_COLOR;
  const store = useSparkleStore(color);
  // CSS styles
  useStyles$(CSS);

  // Generate one sparkle in random inxtervals, append to the sparkles array and delete the oldest one
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    track(() => store.sparkles);

    const interval = setInterval(
      () => {
        store.sparkles = [generateSparkle(color), ...store.sparkles.slice(0, store.sparkles.length - 1)];
      },
      random(50, 500),
    );

    cleanup(() => clearInterval(interval));
  });

  // Render
  return (
    <span class="sparkle">
      {store.sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
      ))}
      <strong>
        <Slot />
      </strong>
    </span>
  );
});

// Export default
export default Sparkles;

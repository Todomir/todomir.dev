import { component$ } from "@builder.io/qwik";

interface Props {
  /** The amount of blur in pixels */
  blur?: number;
  /** How many pixels beyond visible area the glass should consider when calculating blur */
  spread?: number;
  /** The color of the glass' background */
  bgClass?: string;
  /** Opacity of the background */
  bgOpacity?: number;
  /** Border radius */
  borderRadius?: string;
}

export default component$(
  ({ blur = 40, spread = 1.5, bgClass = "bg-zinc-50", bgOpacity = 0.25, borderRadius = "8px" }: Props) => {
    const lookAhead = blur * spread;

    return (
      <div aria-hidden class="absolute inset-0 -z-10 overflow-x-clip">
        <div
          style={{
            inset: `-${lookAhead}px`,
            padding: `${lookAhead}px`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            borderRadius: `calc(${borderRadius} + ${lookAhead}px)`,
            maskImage: "linear-gradient(to bottom, white 0%, white 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, white 0%, white 100%)",
            maskClip: "content-box",
            WebkitMaskClip: "content-box",
            "--tw-bg-opacity": bgOpacity,
          }}
          class={["glass__background absolute", bgClass]}
        />
        <div
          style={{
            inset: `-${lookAhead}px`,
            padding: `${lookAhead}px`,
            backdropFilter: `blur(${blur}px) saturate(180%) brightness(1.5)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            "--border-radius": borderRadius,
            "--border-width": "1px",
            "--inset": lookAhead,
            maskImage: "paint(inset-border)",
            WebkitMaskImage: "paint(inset-border)",
            maskClip: "content-box",
            WebkitMaskClip: "content-box",
          }}
          class="glass__border absolute bg-zinc-500/10"
        />
      </div>
    );
  },
);

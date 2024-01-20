import { component$, Fragment, useStylesScoped$ } from "@builder.io/qwik";

export default component$(
  ({ class: className }: { class?: string | string[] }) => {
    const TECH = [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Qwik",
      "HTML",
      "CSS",
      "Node.js",
    ];
    useStylesScoped$(`
    .marquee-container {
      -webkit-mask-image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 20%,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 100%
      );
      mask-image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 20%,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  `);

    return (
      <div
        class={[
          "marquee-container relative flex gap-8 overflow-x-hidden text-2xl text-zinc-50",
          className,
        ]}
      >
        <ul class="animate-marquee flex min-w-full shrink-0 justify-around gap-8 motion-safe:animate-scroll">
          {TECH.map((tech) => (
            <Fragment key={tech + "--marquee"}>
              <li class="leading-none opacity-70">{tech}</li>
              <span class="leading-none opacity-30" aria-hidden="true">
                &mdash;
              </span>
            </Fragment>
          ))}
        </ul>
        <ul
          aria-hidden="true"
          class="animate-marquee flex min-w-full shrink-0 justify-around gap-8 motion-safe:animate-scroll"
        >
          {TECH.map((tech) => (
            <Fragment key={tech + "--marquee"}>
              <li class="leading-none">{tech}</li>
              <span class="leading-none opacity-30" aria-hidden="true">
                &mdash;
              </span>
            </Fragment>
          ))}
        </ul>
      </div>
    );
  },
);

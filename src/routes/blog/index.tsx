import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="full-width relative w-full bg-zinc-950 py-24">
      <h1
        style={{ viewTransitionName: "blog-section-title" }}
        class="mt-10 text-center text-4xl leading-[53px] tracking-tighter md:mt-12 md:text-6xl md:leading-[73px]"
      >
        Blog
      </h1>
      <p style={{ viewTransitionName: "blog-section-description" }} class="mt-4 text-center text-base leading-6">
        My ramblings about random stuff
      </p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Blog - Abner Rodrigues | Creative Developer",
  scripts: [
    {
      script: `
        (async function () {
          if (!("paintWorklet" in CSS)) {
            await import("https://unpkg.com/css-paint-polyfill");
          }

          CSS.paintWorklet.addModule('/border.js');
        })();
      `,
    },
  ],
  meta: [
    {
      name: "description",
      content: "My personal blog. Helping build software for people and for the world.",
    },
  ],
};

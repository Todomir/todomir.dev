import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import About from "~/features/home/about";
import Blog from "~/features/home/blog";
import Hero from "~/features/home/hero";
import Projects from "~/features/home/projects";
import Quote from "~/features/home/quote";

export default component$(() => {
  return (
    <div class="full-width content-grid relative">
      <Hero />
      <Quote />
      <div class="full-width bg-zinc-950 px-5 md:px-20">
        <hr class="w-full border-zinc-700" />
      </div>
      <About />
      <Projects />
      <Blog />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Abner Rodrigues | Creative Developer",
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
      content: "Helping people build software for people, for the world.",
    },
  ],
};

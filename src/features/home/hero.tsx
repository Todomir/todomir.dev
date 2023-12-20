import { $, component$, useOnDocument } from "@builder.io/qwik";
import { animate, scroll, spring } from "motion";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

export default component$(() => {
  useOnDocument(
    "load",
    $(() => {
      const aside = document.querySelector<HTMLDivElement>("#hero aside");
      if (!aside) return;

      const images = aside.querySelectorAll("*");

      const springConfig = {
        mass: 5,
        stiffness: 200,
        damping: 150,
      };

      // biome-ignore lint/complexity/noForEach: The `target` option of the animate function only accepts single items
      images.forEach((image, i) => {
        animate(
          image,
          {
            x: i >= 2 ? ["100%", 0] : ["-100%", 0],
            opacity: [0, 1],
          },
          {
            delay: i * 0.2,
            easing: spring(springConfig),
          },
        );

        scroll(animate(image, { y: [null, `-${200 + i * 90}%`] }, { easing: spring(springConfig) }));
      });
    }),
  );
  return (
    <section id="hero" class="full-width relative flex h-fit flex-col bg-zinc-950 py-24">
      <aside class="full-width pointer-events-none absolute inset-0 mb-12 -translate-y-12 overflow-x-clip">
        <div
          data-direction="left"
          class="absolute -left-24 -top-12 aspect-video w-[clamp(238px,50%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />

        <div
          data-direction="left"
          class="absolute -bottom-4 -left-36 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />

        <div
          data-direction="right"
          class="absolute -bottom-8 -right-24 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />

        <div
          data-direction="right"
          class="absolute -right-24 -top-24 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />
      </aside>

      <h1 class="mt-10 max-w-full text-center text-4xl leading-[53px] tracking-tighter text-zinc-200 md:mt-12 md:text-7xl md:leading-[96px]">
        Abner Rodrigues <br />
        Creat<span class="italic">i</span>ve Developer
      </h1>

      <p class="mx-auto mt-10 max-w-[524px] text-center text-xl leading-7">
        Web Developer extraordinaire, crafting super cool solutions with style {"\u{1F60E}"}
      </p>

      <div
        aria-labelledby="scroll"
        class="group mx-auto mb-36 mt-20 flex h-fit w-fit gap-4 rounded-full bg-zinc-900/10 p-9 md:mb-64"
      >
        <IconArrowDown />
        <span id="scroll" class="sr-only text-zinc-200">
          Scroll to see more
        </span>
      </div>
    </section>
  );
});

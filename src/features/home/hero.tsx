import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { animate, scroll, spring } from "motion";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

export default component$(() => {
  // We want this to run only once it is visible, and eagerly, on the client. So we use `useVisibleTask$`.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const aside = document.querySelector<HTMLDivElement>("#hero aside");
    if (!aside) return;

    const images = aside.querySelectorAll("*");

    const springConfig = {
      mass: 5,
      stiffness: 200,
      damping: 150,
    };

    images.forEach((image, i) => {
      const speedMultiplier = Number((image as HTMLElement).dataset.speed) || 1;
      const speed = 350 * speedMultiplier;

      animate(
        image,
        { x: i >= 2 ? ["100%", 0] : ["-100%", 0], opacity: [0, 1] },
        { delay: i * 0.2, easing: spring(springConfig) },
      );
      const animationParams = { y: [null, `-${speed}%`] };
      scroll(
        animate(image, animationParams, {
          easing: spring({
            mass: 75,
            stiffness: 30,
            damping: 15,
          }),
          delay: 0,
        }),
      );
    });
  });

  return (
    <section id="hero" class="full-width relative flex h-fit flex-col bg-zinc-950 py-24 text-zinc-300">
      <aside class="full-width pointer-events-none absolute inset-0 mb-12 -translate-y-12 overflow-x-clip">
        {/* Top */}
        <div
          data-speed={2.5}
          class="absolute -left-24 -top-12 aspect-video w-[clamp(238px,50%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />
        <div
          data-speed={2.2}
          class="absolute -right-24 -top-4 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />

        {/* Bottom */}
        <div
          data-speed={1}
          class="absolute -bottom-8 -right-36 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />
        <div
          data-speed={1.2}
          class="absolute -bottom-4 -left-36 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />
      </aside>

      <div class="my-auto py-24 md:py-36">
        <span aria-hidden="true" class="block text-center text-2xl text-white">
          [••
        </span>
        <h1
          class="z-10 max-w-full text-center text-4xl leading-[53px] tracking-tighter text-zinc-200 md:mt-12 md:text-7xl md:leading-[96px]"
          dangerouslySetInnerHTML={$localize`Abner Rodrigues <br />Creat<span class="italic">i</span>ve Developer`}
        />

        <h2 class="mx-auto mt-10 max-w-[524px] text-center text-xl leading-7">
          {$localize`Web Developer extraordinaire, crafting super cool solutions with style \u{1F60E}`}
        </h2>

        <div
          aria-labelledby="scroll"
          class="group mx-auto mt-20 flex h-fit w-fit gap-4 rounded-full bg-zinc-900/10 p-9"
        >
          <IconArrowDown />
          <span id="scroll" class="sr-only text-zinc-200">
            {$localize`Scroll down to see more.`}
          </span>
        </div>
      </div>
    </section>
  );
});

import { $, component$, useOn } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import PageNotFoundImage from "~/media/images/404.svg?jsx";

const SPOTLIGHT_SIZE = 200;

export default component$(() => {
  const t = inlineTranslate();

  useOn(
    "mousemove",
    $((event) => {
      // Get the coordinates of the title
      const title =
        document.querySelector<HTMLHeadingElement>("#not-found-title");
      if (!title) return;

      const titleRect = title.getBoundingClientRect();

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const spotlightX = mouseX - SPOTLIGHT_SIZE / 2 - titleRect.left;
      const spotlightY = mouseY - SPOTLIGHT_SIZE / 2 - titleRect.top;

      // Set x and y position of spotlight
      title.style.backgroundPosition = spotlightX + "px " + spotlightY + "px";
    }),
  );

  return (
    <div class="content-grid full-width relative min-h-screen place-items-center">
      <div class="absolute top-0 -z-10 h-screen w-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,theme(colors.zinc.900),theme(colors.zinc.950))]"></div>
      <div class="max-w-xl text-balance text-center">
        <PageNotFoundImage aria-hidden="true" class="mx-auto mb-4" />
        <h1
          id="not-found-title"
          style={{ backgroundSize: `${SPOTLIGHT_SIZE}px ${SPOTLIGHT_SIZE}px` }}
          class="block bg-[radial-gradient(closest-side,theme(colors.zinc.100)_100%,transparent_0)]  bg-clip-text bg-[50%] bg-no-repeat text-6xl font-bold text-zinc-50/10"
        >
          {t("site.messages.404.title")}
        </h1>
        <p class="mt-4 block text-xl text-zinc-300">
          {t("site.messages.404.description")}
        </p>
        <a
          href="/"
          class="mt-16 inline-block max-w-xl items-center rounded-xl border-2 border-black bg-gradient-to-b from-zinc-950 to-black px-6 py-3 text-white shadow-[inset_0_1px_0] shadow-zinc-300/30 transition-all duration-200 ease-spring-2 hover:scale-105 hover:from-zinc-900 hover:to-zinc-950 hover:ease-out active:scale-95 active:ease-spring-4"
        >
          {t("site.messages.404.home_link")}
        </a>
      </div>
    </div>
  );
});

import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { animate, stagger } from "motion";
import { inlineTranslate } from "qwik-speak";

import NotFoundBackground from "~/components/not-found-background/not-found-background";

export default component$(() => {
  const t = inlineTranslate();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    animate(
      "#not-found *",
      {
        opacity: [0, 1],
        y: [20, 0],
      },
      {
        delay: stagger(0.1, { start: 0.3 }),
        duration: 1,
      },
    );
  });

  return (
    <div
      id="not-found"
      class="content-grid full-width relative isolate min-h-screen place-items-center bg-zinc-950"
    >
      <NotFoundBackground class="full-width absolute inset-0 h-full w-full" />
      <p
        id="not-found-title"
        class="absolute top-1/2 mt-4 block max-w-sm text-balance text-center text-lg text-zinc-50"
      >
        {t("site.messages.404.description")}
      </p>
      <a
        id="not-found-link"
        href="/"
        class="absolute bottom-[20%] mt-16 inline-block max-w-xl items-center rounded-xl border-2 border-black bg-gradient-to-b from-zinc-950 to-black px-6 py-3 text-white shadow-[inset_0_1px_0] shadow-zinc-300/30 transition-all duration-200 ease-spring-2 hover:scale-105 hover:from-zinc-900 hover:to-zinc-950 hover:ease-out active:scale-95 active:ease-spring-4"
      >
        {t("site.messages.404.home_link")}
      </a>
    </div>
  );
});

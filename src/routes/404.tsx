import { component$, useStyles$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import DvdScreensaver from "~/components/dvd-screensaver/dvd-screensaver";
import { useGetUserPreferences } from "~/context/user-preferences";

export default component$(() => {
  const t = inlineTranslate();
  const userPreferences = useGetUserPreferences();

  useStyles$(/* css */ `
    #navbar, #footer { display: none; }
  `);

  return (
    <div
      style={{ gridColumn: "full-width" }}
      id="not-found"
      class="bg-zinc-950 text-zinc-50"
    >
      <a
        id="not-found-link"
        href="/"
        class="group absolute inset-0 z-10 flex h-full w-full items-center justify-center"
      >
        <span class="w-fit max-w-xl rounded-xl border-2 border-zinc-50/20 bg-transparent px-3 py-2 text-zinc-50/40 bg-blend-difference transition-all group-focus-visible:border-emerald-500">
          {t("site.messages.404.home_link")}
        </span>
      </a>
      <DvdScreensaver
        speedMultiplier={userPreferences.reducedMotion ? 0.1 : 0.9}
        class="pointer-events-none inline-flex flex-col items-center text-center"
      >
        <h1 class="text-4xl font-black italic md:text-7xl" id="not-found-title">
          404
        </h1>
        <p
          id="not-found-description"
          class="mt-4 block max-w-sm text-base text-balance text-zinc-50 md:text-2xl"
        >
          {t("site.messages.404.description")}
        </p>
      </DvdScreensaver>
    </div>
  );
});

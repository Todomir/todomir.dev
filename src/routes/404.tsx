import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import PageNotFoundImage from "~/media/images/404.svg?jsx";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <div class="min-h-screen bg-zinc-950 content-grid full-width place-items-center">
      <div class="text-center max-w-xl text-balance">
        <PageNotFoundImage class="mx-auto mb-12" />
        <h1 class="text-6xl block font-bold text-zinc-100">
          {t("site.messages.404.title")}
        </h1>
        <p class="mt-4 block text-xl text-zinc-300">
          {t("site.messages.404.description")}
        </p>
        <a
          href="/"
          class="mt-12 block max-w-64 mx-auto px-4 py-2 font-semibold text-zinc-950 bg-zinc-500 rounded hover:bg-zinc-400"
        >
          {t("site.messages.404.home_link")}
        </a>
      </div>
    </div>
  );
});

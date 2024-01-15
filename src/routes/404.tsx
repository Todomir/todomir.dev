import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import PageNotFoundImage from "~/media/images/404.svg?jsx";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <div class="content-grid full-width min-h-screen place-items-center bg-zinc-950">
      <div class="max-w-xl text-balance text-center">
        <PageNotFoundImage class="mx-auto mb-12" />
        <h1 class="block text-6xl font-bold text-zinc-100">
          {t("site.messages.404.title")}
        </h1>
        <p class="mt-4 block text-xl text-zinc-300">
          {t("site.messages.404.description")}
        </p>
        <a
          href="/"
          class="mx-auto mt-12 block max-w-64 rounded bg-zinc-500 px-4 py-2 font-semibold text-zinc-950 hover:bg-zinc-400"
        >
          {t("site.messages.404.home_link")}
        </a>
      </div>
    </div>
  );
});

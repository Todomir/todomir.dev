import type { StaticGenerateHandler } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import ImgMe from "~/media/images/me.jpg?jsx";
import ImgMe2 from "~/media/images/me2.jpg?jsx";
import { config } from "~/speak.config";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <section class="full-width content-grid relative h-full w-full bg-zinc-950 pt-48 text-zinc-300">
      <div class="relative grid grid-cols-1 gap-8 pb-24 pt-10 md:grid-cols-2">
        <header class="col-span-2 grid grid-cols-subgrid">
          <div class="mb-16 md:col-start-1">
            <a
              class="inline-flex items-center gap-3 font-light tracking-tight text-white"
              href="/"
            >
              /home
            </a>
            <h1
              class="my-8 text-balance text-4xl font-medium tracking-tighter text-white lg:text-6xl"
              dangerouslySetInnerHTML={t("home.about.title")}
            />
            <h2 class="text-xl">{t("home.about.presentation")}</h2>
            <p class="mt-6 text-base leading-8 text-zinc-400">
              {t("home.about.description")}
            </p>
          </div>

          <ImgMe
            class="col-start-1 h-auto w-full object-cover md:col-start-2"
            alt={t("home.about.meImageAlt")}
          />
        </header>

        <hr class="col-span-2 mb-12 mt-8 border-b border-zinc-700" />

        <div class="bg-zinc-95 sticky top-0 col-span-2 mt-6 grid h-screen grid-cols-subgrid py-24 text-base leading-8 text-zinc-400">
          <div class="mb-64 mt-auto space-y-12 text-pretty">
            <p dangerouslySetInnerHTML={t("about.intro")} />
            <p dangerouslySetInnerHTML={t("about.tcc")} />
          </div>

          <ImgMe2
            class="col-start-1 h-full w-full object-cover md:col-start-2"
            alt={t("home.about.meImageAlt")}
          />
        </div>

        <div class="sticky top-0 col-span-2 mt-6 grid h-screen grid-cols-subgrid bg-zinc-950 py-24 text-base leading-8 text-zinc-400">
          <div class="my-auto space-y-12 text-pretty">
            <p dangerouslySetInnerHTML={t("about.jsp")} />
          </div>
        </div>

        <div class="sticky top-0 col-span-2 mt-6 grid h-screen grid-cols-subgrid bg-zinc-950 py-24 text-base leading-8 text-zinc-400">
          <div class="col-span-2 mx-auto mt-auto max-w-xl text-pretty text-center">
            <p
              class="mb-4 text-lg tracking-tighter"
              dangerouslySetInnerHTML={t("about.websites")}
            />
            <p
              class="mb-12 text-2xl font-medium tracking-tighter text-white"
              dangerouslySetInnerHTML={t("about.sendMyMessage")}
            />

            <a
              class="items-center rounded-xl border border-zinc-50/30 bg-black px-6 py-3 text-white transition-colors duration-200 ease-in-out hover:bg-zinc-50/10"
              href="mailto:abnerluis1001@gmail.com"
              dangerouslySetInnerHTML={t("about.contactMe")}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("site.og.blog.title"),
    meta: [
      {
        name: "description",
        content: t("site.og.blog.description"),
      },
      {
        name: "og:title",
        content: t("site.og.blog.title"),
      },
      {
        name: "og:description",
        content: t("site.og.blog.description"),
      },
      {
        name: "og:image",
        content: "/assets/og/og-blog.png",
      },
      {
        name: "og:url",
        content: "https://todomir.dev/about",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: "/assets/og/og-blog.png",
      },
      {
        name: "twitter:title",
        content: t("site.og.blog.title"),
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: config.supportedLocales.map((locale) => {
      return {
        lang: locale.lang === config.defaultLocale.lang ? "." : locale.lang,
      };
    }),
  };
};

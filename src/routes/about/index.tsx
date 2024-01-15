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
    <section class="full-width content-grid h-full w-full bg-zinc-950 pt-48 text-zinc-300">
      <div class="grid grid-cols-1 pt-10 md:grid-cols-2 md:gap-16">
        <header class="col-span-full grid grid-cols-subgrid grid-rows-[repeat(5,auto)]">
          <a
            class="inline-flex items-center gap-3 font-light tracking-tight text-white"
            href="/"
          >
            /home
          </a>
          <h1
            class="col-start-1 my-8 text-balance text-4xl font-medium tracking-tighter text-white lg:text-6xl"
            dangerouslySetInnerHTML={t("home.about.title")}
          />
          <h2 class="col-start-1 text-xl">{t("home.about.presentation")}</h2>
          <p class="col-start-1 mb-12 mt-6 text-base leading-8 text-zinc-400">
            {t("home.about.description")}
          </p>

          <ImgMe
            class="md:col-start-2 md:row-span-full"
            alt={t("home.about.meImageAlt")}
          />
        </header>

        <hr class="col-span-full mb-64 mt-8 border-b border-zinc-700" />

        <div class="col-span-full grid grid-cols-subgrid grid-rows-[repeat(5,auto)]">
          <ImgMe2
            class="mb-24 md:sticky md:top-64 md:col-start-2 md:row-span-full"
            alt={t("home.about.meImageAlt")}
          />

          <p
            class="col-start-1 mb-12 md:h-screen"
            dangerouslySetInnerHTML={t("about.intro")}
          />
          <p
            class="col-start-1 mb-12 md:h-[10vh]"
            dangerouslySetInnerHTML={t("about.tcc")}
          />

          <p
            class="col-start-1 mb-12 md:mb-24"
            dangerouslySetInnerHTML={t("about.jsp")}
          />
        </div>

        <div class="col-span-full flex h-screen flex-col items-center justify-center text-center">
          <p
            class="mb-4 max-w-md text-lg tracking-tighter"
            dangerouslySetInnerHTML={t("about.websites")}
          />
          <p
            class="mb-12 max-w-md text-2xl font-medium tracking-tighter text-white lg:max-w-xl"
            dangerouslySetInnerHTML={t("about.sendMyMessage")}
          />

          <a
            class="max-w-xl items-center rounded-xl border border-zinc-50/30 bg-black px-6 py-3 text-white transition-colors duration-200 ease-in-out hover:bg-zinc-50/10"
            href="mailto:abnerluis1001@gmail.com"
            dangerouslySetInnerHTML={t("about.contactMe")}
          />
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("site.og.about.title"),
    meta: [
      {
        name: "description",
        content: t("site.og.about.description"),
      },
      {
        name: "og:title",
        content: t("site.og.about.title"),
      },
      {
        name: "og:description",
        content: t("site.og.about.description"),
      },
      {
        name: "og:image",
        content: "/assets/og/og-home.png",
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
        content: "/assets/og/og-home.png",
      },
      {
        name: "twitter:title",
        content: t("site.og.about.title"),
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

import type { StaticGenerateHandler } from "@builder.io/qwik-city";

import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { animate, stagger } from "motion";
import { inlineTranslate } from "qwik-speak";
import SplitType from "split-type";

import ImgMe from "~/media/images/me.jpg?jsx";
import ImgMe2 from "~/media/images/me2.jpg?jsx";
import { config } from "~/speak.config";

export default component$(() => {
  const t = inlineTranslate();

  useVisibleTask$(() => {
    SplitType.create(".split", {
      types: "words",
      tagName: "span",
      wordClass: "split-target__word",
    });

    animate([
      ["#home-link", { opacity: 1, y: [-5, 0] }],
      ["#about-title", { opacity: 1 }, { at: "<" }],
      ["#about-presentation", { opacity: 1 }, { at: "<" }],
      ["#about-description", { opacity: 1 }, { at: "<" }],
      [
        "#about-title > *",
        {
          opacity: [0, 1],
          rotateX: [-50, 0],
          y: [20, 0],
        },
        { delay: stagger(0.02), at: "-0.5", type: "spring" },
      ],
      [
        "#about-presentation > *",
        {
          opacity: [0, 1],
          rotateX: [-50, 0],
          y: [20, 0],
        },
        { delay: stagger(0.03), at: "-2", type: "spring" },
      ],
      [
        "#about-description > *",
        {
          opacity: [0, 1],
          rotateX: [-50, 0],
          y: [10, 0],
        },
        { delay: stagger(0.02), at: "-1.5", type: "spring" },
      ],
      [
        "#about-image",
        {
          opacity: 1,
          scale: [0.95, 1],
          rotateX: [-5, 0],
        },
        { at: "-0.7", type: "spring" },
      ],
    ]);
  });

  return (
    <section
      id="main-content"
      class="full-width content-grid h-full w-full bg-zinc-950 pt-48 text-zinc-300"
    >
      <div class="fixed top-0 -z-1 h-screen w-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,theme(colors.zinc.900),theme(colors.zinc.950))]"></div>
      <div class="z-10 grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-12">
        <header
          style={{ perspective: "1000px" }}
          class="col-span-full grid grid-cols-subgrid grid-rows-[repeat(5,auto)]"
        >
          <a
            id="home-link"
            class="inline-flex items-center gap-3 font-light tracking-tight text-zinc-400 transition-colors duration-200 ease-in-out hover:text-zinc-200"
            href="/"
          >
            [ <span class="text-zinc-50">/home</span> ]
          </a>
          <h1
            id="about-title"
            class="split col-start-1 my-8 text-4xl font-medium tracking-tighter text-balance text-white opacity-0 lg:text-6xl [&>*]:leading-[1.1em]"
            dangerouslySetInnerHTML={t("home.about.title")}
          />
          <h2
            id="about-presentation"
            class="split col-start-1 text-xl text-balance opacity-0"
          >
            {t("home.about.presentation")}
          </h2>
          <div
            id="about-description"
            class="split col-start-1 mt-6 mb-12 text-base leading-8 text-balance text-zinc-400 opacity-0"
          >
            {t("home.about.description")}
          </div>

          <ImgMe
            id="about-image"
            class="opacity-0 md:col-start-2 md:row-span-full"
            alt={t("home.about.meImageAlt")}
          />
        </header>

        <hr class="col-span-full mt-8 mb-64 border-b border-zinc-700" />

        <div class="col-span-full grid grid-cols-subgrid grid-rows-[repeat(5,auto)] text-xl text-zinc-300">
          <ImgMe2
            class="mb-24 md:sticky md:top-64 md:col-start-2 md:row-span-full md:aspect-[4/5] md:object-cover"
            alt={t("home.about.meImageAlt2")}
          />

          <p
            class="col-start-1 mb-12 md:h-screen"
            dangerouslySetInnerHTML={t("about.intro")}
          />
          <p
            class="col-start-1 mb-12"
            dangerouslySetInnerHTML={t("about.tcc")}
          />

          <p
            class="col-start-1 mb-12 md:mb-24 md:h-[36rem]"
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
            class="ease-spring-2 active:ease-spring-4 max-w-xl items-center rounded-xl border-2 border-black bg-gradient-to-b from-zinc-950 to-black px-6 py-3 text-white shadow-[inset_0_1px_0] shadow-zinc-300/30 transition-all duration-200 hover:scale-105 hover:from-zinc-900 hover:to-zinc-950 hover:ease-out active:scale-95"
            href="mailto:abnerluis1001@gmail.com"
            dangerouslySetInnerHTML={t("about.contactMe")}
          />
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
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
        name: "og:url",
        content: "https://abn.ooo/about",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: t("site.og.about.title"),
      },
      {
        name: "twitter:description",
        content: t("site.og.about.description"),
      },
      {
        name: "twitter:site",
        content: "@todomir__",
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

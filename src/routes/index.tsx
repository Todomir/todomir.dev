import type { StaticGenerateHandler } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";

import { allPosts } from "content-collections";
import About from "~/features/home/about";
import Blog from "~/features/home/blog";
import Hero from "~/features/home/hero";
import Projects from "~/features/home/projects";
import Quote from "~/features/home/quote";
import { config } from "~/speak.config";

function getPostsByLang(lang: string) {
  return allPosts.filter((post) => post.lang === lang);
}

export default component$(() => {
  const locale = useSpeakLocale();
  const posts = getPostsByLang(locale.lang);

  return (
    <div class="full-width content-grid relative">
      <Hero />
      <Quote />
      <div class="full-width bg-zinc-950 px-5 md:px-20">
        <hr class="w-full border-zinc-700" />
      </div>
      <About />
      <Projects />
      <Blog posts={posts} />
    </div>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  return {
    title: t("site.og.main.title"),
    meta: [
      {
        name: "description",
        content: t("site.og.main.description"),
      },
      {
        name: "og:title",
        content: t("site.og.main.title"),
      },
      {
        name: "og:description",
        content: t("site.og.main.description"),
      },
      {
        name: "og:image",
        content: new URL("/assets/og/og-home.png", url.origin).toString(),
      },
      {
        name: "og:url",
        content: "https://abn.ooo",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:description",
        content: t("site.og.main.description"),
      },
      {
        name: "twitter:site",
        content: "@todomir__",
      },
      {
        name: "twitter:image",
        content: new URL("/assets/og/og-home.png", url.origin).toString(),
      },
      {
        name: "twitter:title",
        content: t("site.og.main.title"),
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

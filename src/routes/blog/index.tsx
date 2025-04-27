import type { StaticGenerateHandler } from "@builder.io/qwik-city";

import { component$, Fragment } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate, useSpeakLocale } from "qwik-speak";

import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import { config } from "~/speak.config";
import { allPosts } from "content-collections";

export default component$(() => {
  const t = inlineTranslate();
  const locale = useSpeakLocale();
  return (
    <section
      id="main-content"
      class="full-width content-grid relative w-full grid-rows-[auto_1fr] bg-zinc-950 pt-16 text-zinc-300 md:pt-36"
    >
      <header class="h-fit">
        <h1
          style={{
            viewTransitionName: "blog-section-title",
          }}
          class="mt-10 text-center text-4xl tracking-tighter text-zinc-200 md:mt-12 md:text-6xl md:leading-[73px]"
        >
          {t("site.links.blog.label")}
        </h1>
        <p
          style={{
            viewTransitionName: "blog-section-description",
          }}
          class="mt-4 text-center text-base leading-6"
        >
          {t("site.og.blog.description")}
        </p>
      </header>

      <ul class="full-width mt-20 space-y-10 rounded-2xl bg-zinc-50 pb-24">
        {allPosts
          .filter((post) => post.lang === locale.lang)
          .map((post) => (
            <Fragment key={post._meta.fileName}>
              <li>
                <BlogPostCard post={post} />
              </li>

              <li
                aria-hidden
                class="my-2 hidden h-[1px] w-full bg-zinc-300 leading-6 [&+&]:block"
              />
            </Fragment>
          ))}
      </ul>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
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
        content: new URL("/assets/og/og-blog.png", url.origin).toString(),
      },
      {
        name: "og:url",
        content: "https://abn.ooo/blog",
      },

      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:description",
        content: t("site.og.blog.description"),
      },
      {
        name: "twitter:site",
        content: "@todomir__",
      },
      {
        name: "twitter:image",
        content: new URL("/assets/og/og-blog.png", url.origin).toString(),
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

import type { Component } from "@builder.io/qwik";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";
import { useSpeakLocale } from "qwik-speak";

import { useBlogPost } from "~/content";
import { config } from "~/speak.config";
import { BLOG_POST_OG_IMAGE_LIST } from "~/utils/constants";

export const BLOG_POST_LIST = import.meta.glob("/src/content/**/**/index.tsx", {
  eager: !isDev,
  import: "default",
});

export default component$(() => {
  const Post = useSignal<Component>();
  const location = useLocation();

  const speakLocale = useSpeakLocale();
  const { locale: userLocale, slug } = location.params;
  const locale = userLocale ?? speakLocale.lang;

  const path = `/src/content/${locale}/${slug}/index.tsx`;

  useTask$(async () => {
    const mod = isDev ? await BLOG_POST_LIST[path]() : BLOG_POST_LIST[path];
    // This is fine because we are importing a Qwik component, which is serializable
    // eslint-disable-next-line qwik/valid-lexical-scope
    Post.value = mod as Component;
  });

  return <>{Post.value && <Post.value />}</>;
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const post = resolveValue(useBlogPost);
  const { permalink, slug, lang } = post;
  const ogImage = BLOG_POST_OG_IMAGE_LIST[
    `/src/content/${lang}/${slug}/og.png`
  ] as string;
  const ogPath = new URL(ogImage, url).toString();

  return {
    title: `Blog - ${post.title}`,
    meta: [
      {
        name: "og:image",
        content: ogPath,
      },
      {
        name: "og:title",
        content: `${post.title}`,
      },
      {
        name: "og:description",
        content: `${post.description}`,
      },
      {
        name: "og:url",
        content: `https://todomir.dev/${permalink}`,
      },
      {
        name: "twitter:image",
        content: ogPath,
      },

      {
        name: "twitter:title",
        content: `${post.title}`,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // Extract slug from BLOG_POST_LIST
  const params = Object.keys(BLOG_POST_LIST)
    .map((path) => path.replace("/src/content/", "").replace("/index.tsx", ""))
    .map((path) => path.split("/"))
    .map(([pathLang, slug]) => {
      /**
       * Consider this code: config.supportedLocales.map((locale) => { return {
       * lang: locale.lang === config.defaultLocale.lang ? "." : locale.lang,
       * slug: slug, }; });
       *
       * If pathLang exists in config.supportedLocales, then it will be
       * returned, otherwise, it should use the logic above to return the
       * correct lang.
       */
      const lang = pathLang ?? config.defaultLocale.lang;
      // Check if lang is supported
      if (!config.supportedLocales.some((locale) => locale.lang === lang)) {
        throw new Error(`Unsupported language: ${lang}`);
      }

      return { slug, lang: lang === config.defaultLocale.lang ? "." : lang };
    });

  return {
    params,
  };
};

export { useBlogPost } from "~/content";

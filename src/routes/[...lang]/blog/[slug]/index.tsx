import type { Component } from "@builder.io/qwik";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";
import { useSpeakLocale } from "qwik-speak";
import { collections } from "virtual:mdx-collection";

import { useBlogPost } from "~/content";
import { config } from "~/speak.config";

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

  const ogUrl = new URL("/og-image", url);
  ogUrl.searchParams.set("title", post.title);
  ogUrl.searchParams.set("description", post.description);
  ogUrl.searchParams.set("permalink", post.permalink);

  const ogPath = ogUrl.toString();

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
        content: `https://todomir.dev/${post.permalink}`,
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
  const params = collections.content.map((entry) => {
    const { slug } = entry;
    const { lang } = entry.data;

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

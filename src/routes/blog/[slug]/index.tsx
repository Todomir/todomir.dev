/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DocumentHead,
  RequestHandler,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";
import { translatePath, useSpeakLocale } from "qwik-speak";
import { collections } from "virtual:mdx-collection";

import { getCollectionEntry } from "~/content";
import { config } from "~/speak.config";

const modules: Record<string, any> = import.meta.glob("/src/content/**/*.mdx", {
  eager: !isDev,
  import: "default",
});

export const onRequest: RequestHandler = ({
  locale,
  error,
  redirect,
  params,
  pathname,
}) => {
  const { slug } = params;
  const getPath = translatePath();
  if (!locale()) throw error(404, "Page not found for requested locale");

  const path = `/src/content/${locale()}/${slug}.mdx`;
  const mod = modules[path];

  if (!mod) {
    // Try to find the post in other available locales
    for (const supportedLocale of config.supportedLocales) {
      if (supportedLocale.lang === locale()) continue;

      const newPath = `/src/content/${supportedLocale.lang}/${slug}.mdx`;
      if (modules[newPath]) {
         
        throw redirect(302, getPath(pathname, supportedLocale.lang));
      }
    }
  }
};

export default component$(() => {
  const PostContent = useSignal<any>();
  const { lang } = useSpeakLocale();
  const slug = useLocation().params.slug;
  const path = `/src/content/${lang}/${slug}.mdx`;

  useTask$(() => {
    const qrl = $(async () => {
      const mod = isDev ? await modules[path]() : modules[path];
      const postContent = mod();
      return postContent;
    });

    PostContent.value = qrl;
  });

  return <>{PostContent.value && <PostContent.value />}</>;
});

export const head: DocumentHead = ({ url, params }) => {
  const entry = getCollectionEntry(params.slug);
  if (!entry) throw new Error(`Post ${params.slug} not found`);

  const { data: post } = entry;

  const ogUrl = new URL("/og-image", url);
  ogUrl.searchParams.set("title", post.title);
  ogUrl.searchParams.set("description", post.description);
  ogUrl.searchParams.set("permalink", post.permalink);

  const ogPath = ogUrl.toString();
  const ogAssetPath = new URL(ogPath, url.origin).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [ogAssetPath],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Abner Rodrigues",
    },
    "description": post.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://todomir.dev/${post.permalink}`,
    },
  };

  return {
    title: `Blog - ${post.title}`,
    meta: [
      {
        name: "json-ld",
        content: JSON.stringify(jsonLd),
      },
      {
        name: "og:image",
        content: ogAssetPath,
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

      // Twitter
      {
        name: "twitter:image",
        content: ogAssetPath,
      },
      {
        name: "twitter:title",
        content: `${post.title}`,
      },
      {
        name: "twitter:description",
        content: `${post.description}`,
      },
      {
        name: "twitter:site",
        content: "@todomir__",
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

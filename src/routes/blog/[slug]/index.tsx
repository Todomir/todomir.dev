import type {
  DocumentHead,
  RequestHandler,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { $, component$, isDev, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Post } from "content-collections";
import { allPosts } from "content-collections";
import { translatePath } from "qwik-speak";
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

  const post = allPosts.find((p) => p._meta.fileName.includes(slug));
  if (!post) {
    for (const supportedLocale of config.supportedLocales) {
      if (supportedLocale.lang === locale()) continue;
      const newPost = allPosts.find(
        (p) =>
          p._meta.fileName.includes(slug) && p.lang === supportedLocale.lang,
      );
      if (newPost) {
        const redirectPath = getPath(pathname, supportedLocale.lang);
        console.log(redirectPath);
        throw redirect(302, redirectPath);
      }
    }
  }
};

export const usePost = routeLoader$<Post>(({ params, locale }) => {
  const slug = params.slug;
  const lang = locale();

  const post = allPosts.find(
    (p) => p._meta.fileName.replace(".mdx", "") === slug && p.lang === lang,
  );
  if (!post) throw new Error(`Post ${slug} not found`);

  return post;
});

export default component$(() => {
  const PostContent = useSignal<any>();
  const post = usePost();
  const path = `/src/content/${post.value._meta.filePath}`;

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

export const head: DocumentHead = ({ params }) => {
  const post = allPosts.find((post) =>
    post._meta.fileName.includes(params.slug),
  );
  if (!post) throw new Error(`Post ${params.slug} not found`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Abner Rodrigues",
    },
    description: post.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://abn.ooo/${post.permalink}`,
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
        name: "og:title",
        content: `${post.title}`,
      },
      {
        name: "og:description",
        content: `${post.description}`,
      },
      {
        name: "og:url",
        content: `https://abn.ooo/${post.permalink}`,
      },

      // Twitter

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
  const params = allPosts.map((post) => {
    const slug = post._meta.fileName;
    const { lang } = post;

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

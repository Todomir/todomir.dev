import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import About from "~/features/home/about";
import Blog from "~/features/home/blog";
import Hero from "~/features/home/hero";
import Projects from "~/features/home/projects";
import Quote from "~/features/home/quote";
import { config } from "~/speak.config";

import client from "../../tina/__generated__/client";

export const useTinaBlogPosts = routeLoader$(async ({ locale, error }) => {
  const userLocale = locale();
  const response = await client.queries.postConnection({
    filter: {
      lang: { eq: userLocale },
    },
  });

  const posts = (response.data.postConnection.edges || [])?.map((edge) => {
    if (!edge) throw error(404, "Post not found");
    const { node } = edge;
    if (!node) throw error(404, "Post not found");
    return node;
  });

  const parsedPosts = posts.map((post) => {
    const slug = post._sys.filename.replace(`-${post.lang}`, "");
    const permalink =
      config.defaultLocale.lang === post.lang ?
        `/blog/${slug}`
      : `/${post.lang}/blog/${slug}`;
    return {
      id: post.id,
      date: new Date(post.date),
      title: post.title,
      description: post.description,
      slug,
      tags: post.tags,
      lang: post.lang,
      permalink,
      thumbnail: {
        src: post.thumbnail,
        alt: post.thumbnailAlt,
      },
    };
  });

  return parsedPosts;
});

export default component$(() => {
  const posts = useTinaBlogPosts();

  return (
    <div class="full-width content-grid relative">
      <Hero />
      <Quote />
      <div class="full-width bg-zinc-950 px-5 md:px-20">
        <hr class="w-full border-zinc-700" />
      </div>
      <About />
      <Projects />
      <Blog posts={posts.value} />
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
        content: "https://todomir.dev",
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

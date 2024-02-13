import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { inlineTranslate, useFormatDate } from "qwik-speak";
import { collections } from "virtual:mdx-collection";

import Tag from "~/components/tag/tag";
import { useBlogPost } from "~/content";
import { config } from "~/speak.config";
import { getAssetPath } from "~/utils/functions";

export const useBlogPostContent = routeLoader$(
  async ({ locale, params, error }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const modules = import.meta.glob<Record<string, any>>(
        "/src/content/**/**/*.mdx",
        { eager: true },
      );
      const path = `/src/content/${locale()}/${params.slug}.mdx`;
      const content = modules[path]?.default().children.type();

      if (!content) throw error(404, "Blog post not found");

      return [content];
    } catch {
      throw error(500, "Failed to load blog post");
    }
  },
);

export default component$(() => {
  const postSig = useBlogPost();
  const { data: post } = postSig.value;

  const postContentSig = useBlogPostContent();

  const t = inlineTranslate();
  const fd = useFormatDate();
  const location = useLocation();

  return (
    <article id="main-content">
      <div class="content-grid mb-24 pb-12 pt-16 text-black md:pt-36">
        <header class="my-12">
          <a
            href=".."
            class="mb-12 flex gap-2 text-zinc-700 transition-all duration-300 ease-spring-1 hover:gap-4"
          >
            <span>←</span>
            <span>{t("site.messages.return_previous_page")}</span>
          </a>

          <ul class="flex flex-wrap gap-2 @container md:gap-3 ">
            {post.tags?.map((tag: string) => (
              <li style={{ viewTransitionName: `blog-${tag}` }} key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <h1 class="text-balance text-4xl leading-[53px] tracking-tighter md:my-6 md:text-6xl md:leading-[73px]">
            {post.title}
          </h1>

          <time class="block text-balance text-base leading-6 text-zinc-700">
            {t("site.messages.updated")}{" "}
            {fd(post.date, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div class="aspect-w-16 aspect-h-9 my-8 overflow-clip rounded-lg shadow-xl">
            {/* <Slot name="thumbnail" /> */}
            <Image
              width={1_200}
              height={820}
              decoding="sync"
              loading="eager"
              src={getAssetPath(post.thumbnail.src)}
              alt={post.thumbnail.alt}
              layout="constrained"
            />
          </div>
        </header>

        <p class="leading-1 mb-24 text-xl font-medium md:text-3xl">
          {post.description}
        </p>

        <div class="prose-img:breakout prose prose-zinc max-w-none text-pretty lg:prose-xl prose-code:rounded-md prose-code:border prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] prose-img:mb-24 prose-img:rounded-md prose-img:shadow-lg [&_pre_code]:border-transparent [&_pre_code]:bg-inherit [&_pre_code]:p-0">
          {postContentSig.value.map((c) => (
            <>{c}</>
          ))}
        </div>

        <div class="full-width my-24 bg-zinc-200 px-5 md:px-20">
          <hr class="w-full border-zinc-200" />
        </div>

        <div class="flex flex-col justify-between gap-3 md:flex-row">
          <h3 class="mb-1 text-2xl font-bold">{t("site.messages.share")}</h3>
          <div class="space-x-2">
            <a
              class="inline-block rounded-lg bg-black px-4 py-2 text-white"
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                post.title,
              )}&url=${location.url.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("site.messages.share_on")} 𝕏.com
            </a>
          </div>
        </div>
      </div>
    </article>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const { data: post } = resolveValue(useBlogPost);

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

export { useBlogPost } from "~/content";

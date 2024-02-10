import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";
import { inlineTranslate, useFormatDate } from "qwik-speak";

import Alert from "~/components/alert/alert";
import Tag from "~/components/tag/tag";
import { MarkdownComponent } from "~/lib/tina/mdx";
import { config } from "~/speak.config";

import client from "../../../../tina/__generated__/client";

export const BLOG_POST_LIST = import.meta.glob("/src/content/**/**/index.tsx", {
  eager: !isDev,
  import: "default",
});

const BLOG_COMPONENT_MAP = {
  Alert,
};

export const useTinaBlogPost = routeLoader$(async ({ locale, params }) => {
  const data = await client.queries.post({
    relativePath: `${params.slug}-${locale()}.mdx`,
  });

  return data;
});

export default component$(() => {
  const post = useTinaBlogPost();
  const t = inlineTranslate();
  const fd = useFormatDate();
  const location = useLocation();

  return (
    <div id="main-content">
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
            {post.value.data.post.tags.map((tag: string) => (
              <li style={{ viewTransitionName: `blog-${tag}` }} key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <h1 class="text-balance text-4xl leading-[53px] tracking-tighter md:my-6 md:text-6xl md:leading-[73px]">
            {post.value.data.post.title}
          </h1>

          <time class="block text-balance text-base leading-6 text-zinc-700">
            {t("site.messages.updated")}{" "}
            {fd(post.value.data.post.date, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div class="aspect-w-16 aspect-h-9 my-8 overflow-clip rounded-lg shadow-xl">
            <img
              src={post.value.data.post.thumbnail}
              alt={post.value.data.post.thumbnailAlt}
              decoding="sync"
              loading="eager"
            />
          </div>
        </header>

        <p class="leading-1 mb-24 text-xl font-medium md:text-3xl">
          {post.value.data.post.description}
        </p>

        <div class="prose-img:breakout prose prose-zinc max-w-none text-pretty lg:prose-xl prose-code:rounded-md prose-code:border prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] prose-img:mb-24 prose-img:rounded-md prose-img:shadow-lg [&_pre_code]:border-transparent [&_pre_code]:bg-inherit [&_pre_code]:p-0">
          <MarkdownComponent
            node={post.value.data.post.body}
            components={BLOG_COMPONENT_MAP}
          />
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
                post.value.data.post.title,
              )}&url=${location.url.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("site.messages.share_on")} 𝕏.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const { data } = resolveValue(useTinaBlogPost);
  const { post } = data;

  const slug = `${post._sys.filename}`
    .replace(`-${post?.lang}`, "")
    .replace(/\.mdx?$|\.md$|\.json$/u, "");

  const permalink = new URL(
    post.lang === config.defaultLocale.lang ?
      `/blog/${slug}`
    : `/${post.lang}/blog/${slug}`,
    import.meta.env.PUBLIC_WEBSITE_URL,
  ).toString();

  const ogUrl = new URL("/og-image", url);
  ogUrl.searchParams.set("title", post.title);
  ogUrl.searchParams.set("description", post.description);

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
      "@id": permalink,
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
        content: permalink,
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
  const postResponse = await client.queries.postConnection();
  const params = postResponse.data.postConnection.edges?.map((post) => {
    const slug = `${post?.node?._sys.filename}`
      .replace(`-${post?.node?.lang}`, "")
      .replace(/\.mdx?$|\.md$|\.json$/u, "");

    let lang = ".";
    if (post?.node?.lang && post?.node?.lang !== config.defaultLocale.lang) {
      lang = post.node.lang;
    }

    return {
      slug,
      lang,
    };
  });

  return {
    params,
  };
};

export { useBlogPost } from "~/content";

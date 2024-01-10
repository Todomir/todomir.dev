import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { inlineTranslate, useFormatDate } from "qwik-speak";
import Tag from "~/components/tag/tag";
import {
  BLOG_POST_OG_IMAGE_LIST,
  BLOG_POST_THUMBNAIL_LIST,
  usePost,
} from "~/content";

export { usePost };

export default component$(() => {
  const t = inlineTranslate();
  const fd = useFormatDate();

  const post = usePost();
  const { lang, slug } = post.value;
  const location = useLocation();

  const thumbnailSig = useSignal("");

  useTask$(async () => {
    const sizes = [200, 400, 600, 800, 1200];
    const path = `/src/content/${lang}/${slug}/thumbnail.png`;
    const thumbnail = BLOG_POST_THUMBNAIL_LIST[path] as string[];

    // thumbnail is a flat array of strings, each string is a URL to a different size of the image. The images are ordered in groups of 3, so we can use the sizes array to get the correct URL for each size.
    const srcset = sizes
      .map((size, i) => `${thumbnail[i * 3]} ${size}w`)
      .join(", ");
    thumbnailSig.value = srcset;
  });

  return (
    <div class="content-grid mb-24 pb-12 pt-36 text-black">
      <header class="my-12">
        <a
          href={t("site.links.blog.url")}
          class="flex transition-all ease-spring-1 duration-300 gap-2 hover:gap-4 text-zinc-700 mb-12"
        >
          <span>←</span>
          <span>{t("site.messages.return_previous_page")}</span>
        </a>

        <ul class="flex flex-wrap gap-2 md:gap-3 @container ">
          {post.value.frontmatter.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <h1 class="text-balance text-4xl leading-[53px] tracking-tighter md:my-6 md:text-6xl md:leading-[73px]">
          {post.value.frontmatter.title}
        </h1>

        <time class="block text-balance text-base leading-6 text-zinc-700">
          {t("site.messages.updated")}{" "}
          {fd(post.value.frontmatter.updatedAt, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <img
          class="mt-10 block h-auto w-full rounded-xl shadow-lg md:mt-24"
          srcset={thumbnailSig.value}
          loading="lazy"
          decoding="async"
          width={956}
          height={560}
          src={post.value.frontmatter.thumbnail.src}
          alt={post.value.frontmatter.thumbnail.alt}
        />
      </header>

      <p class="leading-1 mb-24 text-xl font-medium md:text-3xl">
        {post.value.frontmatter.description}
      </p>

      <div class="prose prose-zinc max-w-none text-pretty lg:prose-xl prose-code:rounded-md prose-code:border prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] [&_pre_code]:border-transparent [&_pre_code]:bg-inherit [&_pre_code]:p-0">
        {post.value.default}
      </div>

      <div class="full-width my-24 bg-zinc-200 px-5 md:px-20">
        <hr class="w-full border-zinc-200" />
      </div>

      <div class="flex justify-between gap-3">
        <h3 class="mb-1 text-2xl font-bold">{t("site.messages.share")}</h3>
        <div class="space-x-2">
          <a
            class="inline-block rounded-lg bg-black px-4 py-2 text-white"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              post.value.frontmatter.title,
            )}&url=${location.url.toString()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("site.messages.share_on")} 𝕏.com
          </a>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const post = resolveValue(usePost);
  const { slug, lang } = post;
  const ogImage = BLOG_POST_OG_IMAGE_LIST[
    `/src/content/${lang}/${slug}/og.png`
  ] as string;
  const ogPath = new URL(ogImage, url).toString();

  return {
    ...post.head,
    title: `Blog - ${post.head.title}`,
    meta: [
      ...(post.head.meta || []),
      { name: "og:image", content: ogPath },
      { name: "og:url", content: `https://todomir.dev/blog/${slug}` },
      { name: "twitter:image", content: ogPath },

      { name: "twitter:title", content: `${post.head.title}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
};

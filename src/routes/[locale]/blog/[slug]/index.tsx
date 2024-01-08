import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import {
  BLOG_POST_OG_IMAGE_LIST,
  BLOG_POST_THUMBNAIL_LIST,
  usePost,
} from "~/content";

export { usePost };

export default component$(() => {
  const post = usePost();
  const { locale, slug } = post.value;
  const location = useLocation();

  const thumbnailSig = useSignal("");

  useTask$(async () => {
    const sizes = [200, 400, 600, 800, 1200];
    const path = `/src/content/${locale}/${slug}/thumbnail.png`;
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
        <ul class="space-x-2">
          {post.value.frontmatter.tags.map((tag) => (
            <li
              class="inline-block w-fit max-w-none rounded-lg border border-zinc-400 px-2 py-1 text-sm md:text-base lg:px-3 lg:py-2"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>

        <h1 class="text-balance text-4xl leading-[53px] tracking-tighter md:my-6 md:text-6xl md:leading-[73px]">
          {post.value.frontmatter.title}
        </h1>

        <time class="block text-balance text-base leading-6 opacity-50">
          {$localize`Last updated at`}{" "}
          {post.value.frontmatter.updatedAt.toLocaleDateString(locale, {
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
        <h3 class="mb-1 text-2xl font-bold">Like this post?</h3>
        <div class="space-x-2">
          <a
            class="inline-block rounded-lg bg-black px-4 py-2 text-white"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              post.value.frontmatter.title,
            )}&url=${location.url.toString()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share it on 𝕏.com
          </a>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const post = resolveValue(usePost);
  const { locale, slug } = params;
  const ogImage = BLOG_POST_OG_IMAGE_LIST[
    `/src/content/${locale}/${slug}/og.png`
  ] as string;

  return {
    ...post.head,
    title: `Blog - ${post.head.title}`,
    meta: [
      ...(post.head.meta || []),
      { name: "og:image", content: ogImage },
      { name: "og:url", content: `https://todomir.dev/blog/${slug}` },
      { name: "twitter:image", content: ogImage },

      { name: "twitter:title", content: `${post.head.title}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
};

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { extractLang } from "../../i18n-utils";
import { getPostBySlug } from "~/content";
import { Image } from "@unpic/qwik";

export const usePost = routeLoader$(async ({ params, error, url }) => {
  const guessedLocale = extractLang(params.locale) as "en" | "pt-BR";
  try {
    const post = await getPostBySlug(params.slug, guessedLocale, url.origin);
    return post;
  } catch (e) {
    console.error(e);
    throw error(500, "Something went wrong while loading the post");
  }
});

export default component$(() => {
  const post = usePost();
  const location = useLocation();

  return (
    <div class="content-grid mb-24 pb-12 pt-36 text-black">
      <header class="my-12 md:space-y-4">
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

        <h1 class="text-balance text-4xl leading-[53px] tracking-tighter md:mt-12 md:text-6xl md:leading-[73px]">
          {post.value.frontmatter.title}
        </h1>

        <time class="mt-4 text-balance text-base leading-6 opacity-50">
          {$localize`Last updated at`} {post.value.frontmatter.updatedAt.toLocaleDateString()}
        </time>

        <Image
          class="mt-10 block h-auto w-full rounded-xl shadow-lg"
          layout="constrained"
          width={post.value.frontmatter.thumbnail.width || 956}
          height={post.value.frontmatter.thumbnail.height || 560}
          src={post.value.frontmatter.thumbnail.src}
          alt={post.value.frontmatter.thumbnail.alt}
        />
      </header>

      <p class="leading-1 mb-24 text-xl font-medium md:text-3xl">{post.value.frontmatter.description}</p>

      <div class="prose prose-zinc max-w-none text-pretty lg:prose-xl prose-code:rounded-md prose-code:border prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] [&_pre_code]:border-transparent [&_pre_code]:bg-inherit [&_pre_code]:p-0">
        {post.value.content}
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

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);

  return {
    ...post.head,
    title: `Blog - ${post.head.title}`,
    meta: [...(post.head.meta || []), { name: "twitter:title", content: `${post.head.title}` }],
  };
};

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { extractLang } from "../../i18n-utils";
import { getPostBySlug } from "~/content";

export const usePost = routeLoader$(async ({ params, error }) => {
  const guessedLocale = extractLang(params.locale) as "en" | "pt-BR";
  try {
    const post = await getPostBySlug(params.slug, guessedLocale);
    return post;
  } catch (e) {
    throw error(404, "Post not found");
  }
});

export default component$(() => {
  const post = usePost();

  return (
    <div class="content-grid mb-24 py-12 text-black">
      <header class="my-12 space-y-2 md:space-y-4">
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
      </header>

      <p class="leading-1 mb-24 text-xl font-medium md:text-3xl">{post.value.frontmatter.description}</p>

      <div class="prose max-w-none text-pretty lg:prose-xl">{post.value.content}</div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);
  const head = post.head as any;
  return {
    ...(head as any),
    scripts: [
      ...head.scripts,
      {
        type: "application/ld+json",
        script: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.frontmatter.title,
          description: post.frontmatter.description,
          datePublished: post.frontmatter.createdAt.toISOString(),
          dateModified: post.frontmatter.updatedAt.toISOString(),
        }),
      },
    ],
  };
};

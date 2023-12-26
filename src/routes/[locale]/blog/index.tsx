import { Fragment, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import BlogPostCard from "~/components/blog-post-card/blog-post-card";

import { getPostsByLocale } from "~/content";
import { extractLang } from "../i18n-utils";

export const usePosts = routeLoader$(async ({ params, error }) => {
  try {
    const guessedLocale = extractLang(params.locale);
    const posts = await getPostsByLocale(guessedLocale);

    return posts;
  } catch (e) {
    throw error(500, "Something went wrong while loading posts");
  }
});

export default component$(() => {
  const posts = usePosts();

  return (
    <section class="full-width content-grid relative w-full bg-zinc-950 py-24">
      <h1
        style={{ viewTransitionName: "blog-section-title" }}
        class="mt-10 text-center text-4xl leading-[53px] tracking-tighter md:mt-12 md:text-6xl md:leading-[73px]"
      >
        {$localize`Blog`}
      </h1>
      <p style={{ viewTransitionName: "blog-section-description" }} class="mt-4 text-center text-base leading-6">
        {$localize`My ramblings about random stuff. Updated every now and then.`}
      </p>

      <ul class="full-width mt-20 space-y-10 rounded-xl bg-zinc-50">
        {posts.value.map((post) => (
          <Fragment key={post.slug}>
            <li>
              <BlogPostCard
                slug={post.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
                date={post.frontmatter.updatedAt}
                tags={post.frontmatter.tags}
                thumbnail={post.frontmatter.thumbnail}
              />
            </li>

            <li aria-hidden class="my-2 hidden h-[1px] w-full bg-zinc-300 leading-6 [&+&]:block" />
          </Fragment>
        ))}
      </ul>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Blog - Abner Rodrigues | Creative Developer",
  meta: [
    {
      name: "description",
      content: "My personal blog. Helping build software for people and for the world.",
    },
  ],
};

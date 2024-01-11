import { component$, Fragment } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import { usePosts } from "~/content";

export { usePosts };

export default component$(() => {
  const posts = usePosts();
  const t = inlineTranslate();

  return (
    <section class="full-width content-grid grid-rows-[auto_1fr] relative w-full bg-zinc-950 pt-36 text-zinc-300">
      <header class="h-fit">
        <h1
          style={{ viewTransitionName: "blog-section-title" }}
          class="mt-10 text-center text-4xl tracking-tighter text-zinc-200 md:mt-12 md:text-6xl md:leading-[73px]"
        >
          {t("site.links.blog.label")}
        </h1>
        <p
          style={{ viewTransitionName: "blog-section-description" }}
          class="mt-4 text-center text-base leading-6"
        >
          {t("site.og.blog.description")}
        </p>
      </header>

      <ul class="full-width mt-20 space-y-10 rounded-2xl bg-zinc-50">
        {posts.value.map((post) => (
          <Fragment key={post.slug}>
            <li>
              <BlogPostCard
                slug={post.slug}
                lang={post.lang}
                frontmatter={post.frontmatter}
              />
            </li>

            <li
              aria-hidden
              class="my-2 hidden h-[1px] w-full bg-zinc-300 leading-6 [&+&]:block"
            />
          </Fragment>
        ))}
      </ul>
    </section>
  );
});

export const head: DocumentHead = () => {
  const t = inlineTranslate();

  return {
    title: t("site.og.blog.title"),
    meta: [
      {
        name: "description",
        content: t("site.og.blog.description"),
      },
      {
        name: "og:title",
        content: t("site.og.blog.title"),
      },
      {
        name: "og:description",
        content: t("site.og.blog.description"),
      },
      {
        name: "og:image",
        content: "/assets/og/og-blog.png",
      },
      {
        name: "og:url",
        content: "https://todomir.dev/blog",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: "/assets/og/og-blog.png",
      },
      {
        name: "twitter:title",
        content: t("site.og.blog.title"),
      },
    ],
  };
};

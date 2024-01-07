import { Fragment, component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import { usePosts } from "~/content";

export { usePosts };

export default component$(() => {
  const posts = usePosts();

  return (
    <section class="full-width content-grid relative h-full w-full bg-zinc-950 pb-64 pt-36 text-zinc-300">
      <h1
        style={{ viewTransitionName: "blog-section-title" }}
        class="mt-10 text-center text-4xl leading-[53px] tracking-tighter text-zinc-200 md:mt-12 md:text-6xl md:leading-[73px]"
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
              <BlogPostCard slug={post.slug} locale={post.locale} frontmatter={post.frontmatter} />
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
      content: $localize`My ramblings about random stuff. Updated every now and then.`,
    },
    {
      name: "og:title",
      content: $localize`Abner Rodrigues - Creative Developer`,
    },
    {
      name: "og:description",
      content: $localize`My ramblings about random stuff. Updated every now and then.`,
    },
    {
      name: "og:image",
      content: "/assets/og/og-blog.png",
    },
    {
      name: "og:url",
      content: "https://todomir.dev",
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
      content: $localize`Abner Rodrigues - Creative Developer`,
    },
  ],
};

import { Fragment, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import BlogPostCard from "~/components/blog-post-card/blog-post-card";

const MOCK_BLOG_POSTS = [
  {
    id: "1",
    slug: "/blog/really-qwik-site",
    title: "A really Qwik website",
    description: "The adventures on how I built my personal website using Qwik, an exciting new web framework",
    tags: [
      { id: "1_tag", name: "Qwik" },
      { id: "2_tag", name: "Front-end" },
    ],
    thumbnail: {
      srcset: "sample-srcset",
      alt: "Sample Alt",
      width: 100,
      height: 100,
    },
  },
];

export default component$(() => {
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
        {MOCK_BLOG_POSTS.map((post) => (
          <Fragment key={post.id}>
            <li>
              <BlogPostCard
                id={post.id}
                slug={post.slug}
                title={post.title}
                description={post.description}
                tags={post.tags}
                thumbnail={post.thumbnail}
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
  scripts: [
    {
      script: `
        (async function () {
          if (!("paintWorklet" in CSS)) {
            await import("https://unpkg.com/css-paint-polyfill");
          }

          CSS.paintWorklet.addModule('/border.js');
        })();
      `,
    },
  ],
  meta: [
    {
      name: "description",
      content: "My personal blog. Helping build software for people and for the world.",
    },
  ],
};

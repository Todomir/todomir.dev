import { Fragment, component$ } from "@builder.io/qwik";
import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

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
    <section class="full-width flex flex-col rounded-none bg-white px-6 py-12 max-md:px-5 md:py-32">
      <h2 class="mt-10 text-center text-4xl leading-[53px] tracking-tighter text-gray-900  md:mt-12 md:text-6xl md:leading-[73px]">
        Blog
      </h2>
      <p class="mt-4 self-stretch text-center text-base leading-6 text-gray-900 max-md:max-w-full">
        My ramblings about random stuff
      </p>

      <section>
        <ul class="mt-20 grid grid-cols-1 gap-10">
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

      <a
        href="/blog"
        class="pointer-events-auto mb-10 mt-16 flex grow cursor-pointer items-stretch justify-end gap-2 self-end whitespace-nowrap text-xl leading-7 tracking-tight text-zinc-950 max-md:mt-10"
      >
        Ver blog
        <IconArrowTopRight />
      </a>
    </section>
  );
});

import type { BlogPostCollectionEntry } from "~/content";

import { component$, Fragment } from "@builder.io/qwik";
import { inlineTranslate, translatePath, useSpeakLocale } from "qwik-speak";

import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

type Props = {
  posts: BlogPostCollectionEntry[];
};

export default component$(({ posts }: Props) => {
  const t = inlineTranslate();
  const locale = useSpeakLocale();
  const getPath = translatePath();

  return (
    <section
      id="blog"
      class="full-width flex flex-col rounded-none bg-white px-5 py-12 text-gray-900 md:px-6 md:py-32"
    >
      <header class="flex flex-col gap-3">
        <h2 class="mt-10 text-center text-4xl tracking-tighter md:mt-12 md:text-6xl">
          {t("site.links.blog.label")}
        </h2>
        <p class="mt-4 text-center text-base leading-6">
          {t("site.og.blog.description")}
        </p>
      </header>
      <section>
        <ul class="mt-20 grid grid-cols-1 gap-10">
          {posts.map((post) => (
            <Fragment key={post.slug}>
              <li>
                <BlogPostCard post={post} />
              </li>

              <li
                aria-hidden
                class="my-2 hidden h-[1px] w-full bg-zinc-300 leading-6 [&+&]:block"
              />
            </Fragment>
          ))}
        </ul>
      </section>

      <a
        href={`/${getPath("blog", locale.lang)}`}
        class="pointer-events-auto mb-10 mt-10 flex grow cursor-pointer items-stretch justify-end gap-2 self-end whitespace-nowrap text-xl leading-7 tracking-tight text-zinc-950 md:mt-16"
      >
        {t("home.blog.seeAllPosts")}
        <IconArrowTopRight />
      </a>
    </section>
  );
});

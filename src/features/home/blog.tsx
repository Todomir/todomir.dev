import { Fragment, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import type { Frontmatter } from "~/content";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

interface Props {
  posts: {
    slug: string;
    frontmatter: Frontmatter;
  }[];
}

export default component$(({ posts }: Props) => {
  return (
    <section class="full-width flex flex-col rounded-none bg-white px-6 py-12 text-gray-900 max-md:px-5 md:py-32">
      <h2 class="mt-10 text-center text-4xl leading-[53px] tracking-tighter md:mt-12 md:text-6xl md:leading-[73px]">
        {$localize`Blog`}
      </h2>
      <p class="mt-4 text-center text-base leading-6">
        {$localize`My ramblings about random stuff. Updated every now and then.`}
      </p>
      <section>
        <ul class="mt-20 grid grid-cols-1 gap-10">
          {posts.map((post) => (
            <Fragment key={post.slug}>
              <li>
                <BlogPostCard
                  slug={`blog/${post.slug}`}
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

      <Link
        href="/blog"
        class="pointer-events-auto mb-10 mt-16 flex grow cursor-pointer items-stretch justify-end gap-2 self-end whitespace-nowrap text-xl leading-7 tracking-tight text-zinc-950 max-md:mt-10"
      >
        {$localize`See all blog posts`}
        <IconArrowTopRight />
      </Link>
    </section>
  );
});

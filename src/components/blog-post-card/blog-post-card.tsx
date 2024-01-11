import type { PostFrontmatter } from "~/content";

import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { inlineTranslate, useFormatDate } from "qwik-speak";

import { BLOG_POST_THUMBNAIL_LIST } from "~/content";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

import Card from "../card/card";
import Tag from "../tag/tag";

type Props = { slug: string; lang: string; frontmatter: PostFrontmatter };

export default component$(({ slug, lang, frontmatter }: Props) => {
  const { title, description, updatedAt, tags } = frontmatter;

  const t = inlineTranslate();
  const fd = useFormatDate();
  const thumbnailSig = useSignal("");

  useTask$(async () => {
    const sizes = [200, 400, 600, 800, 1200];
    const path = `/src/content/${lang}/${slug}/thumbnail.png`;
    const thumbnail = BLOG_POST_THUMBNAIL_LIST[path] as string[];

    // thumbnail is a flat array of strings, each string is a URL to a different size of the image. The images are ordered in groups of 3, so we can use the sizes array to get the correct URL for each size.
    const srcset = sizes
      .map((size, i) => `${thumbnail[i * 3]} ${size}w`)
      .join(", ");
    thumbnailSig.value = srcset;
  });

  return (
    <Card class="mt-20 text-zinc-800">
      <div q:slot="title" class="@md:space-y-3 space-y-1">
        <h3 class="@md:text-3xl @md:space-x-3 grow space-x-2 text-2xl font-medium tracking-tighter">
          <a href={`/${lang}/blog/${slug}`}>{title}</a>
          <IconArrowTopRight class="inline-block" />
        </h3>
        <time
          class="@md:text-md leading-2 block text-sm opacity-80"
          dateTime={updatedAt.toISOString()}
        >
          {t("site.messages.updated")}{" "}
          {fd(updatedAt, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <p
        q:slot="description"
        class="mt-4 overflow-hidden text-ellipsis text-pretty text-base leading-6"
      >
        {description}
      </p>
      <img
        decoding="async"
        loading="lazy"
        width={544}
        height={320}
        srcset={thumbnailSig.value}
        alt={frontmatter.thumbnail.alt}
        q:slot="aside"
        class="aspect-[5/3] w-full overflow-hidden rounded-lg object-cover shadow-md"
      />

      <ul
        q:slot="superheader"
        class="@md:gap-2 flex flex-wrap items-start gap-1"
      >
        {tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </Card>
  );
});

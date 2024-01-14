import type { PostFrontmatter } from "~/content";

import { component$ } from "@builder.io/qwik";
import { inlineTranslate, useFormatDate } from "qwik-speak";

import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

import Card from "../card/card";
import Tag from "../tag/tag";

type Props = {
  frontmatter: PostFrontmatter;
  lang: string;
  slug: string;
  thumbnail: OutputMetadata[];
};

export default component$(({ slug, lang, frontmatter, thumbnail }: Props) => {
  const { title, description, updatedAt, tags } = frontmatter;

  const t = inlineTranslate();
  const fd = useFormatDate();
  const srcset = thumbnail
    .map((img) => {
      return `${img.src} ${img.width}w`;
    })
    .join(", ");

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
        class="mt-4 overflow-hidden text-ellipsis text-pretty text-base leading-6 tracking-normal"
      >
        {description}
      </p>
      <img
        q:slot="aside"
        decoding="async"
        loading="lazy"
        width={544}
        height={320}
        class="aspect-[5/3] w-full overflow-hidden rounded-lg object-cover shadow-md"
        alt={frontmatter.thumbnail.alt}
        srcset={srcset}
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

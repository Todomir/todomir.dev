import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { inlineTranslate, useFormatDate, useSpeakConfig } from "qwik-speak";

import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";
import { getAssetPath } from "~/utils/functions";

import type { Post } from "content-collections";
import Card from "../card/card";
import Tag from "../tag/tag";

type Props = {
  post: Post;
};

export default component$(({ post }: Props) => {
  const { title, description, date, tags, lang, thumbnail } = post;
  const { _meta } = post;
  const config = useSpeakConfig();

  const href =
    lang === config.defaultLocale.lang
      ? `/blog/${_meta.fileName.replace(".mdx", "")}`
      : `/${lang}/blog/${_meta.fileName.replace(".mdx", "")}`;

  const t = inlineTranslate();
  const fd = useFormatDate();

  return (
    <Card class="mt-20 text-zinc-800">
      <div q:slot="title" class="space-y-1 @md:space-y-3">
        <h3 class="grow space-x-2 text-2xl font-medium tracking-tighter @md:space-x-3 @md:text-3xl">
          <a href={href}>{title}</a>
          <IconArrowTopRight class="inline-block" />
        </h3>
        <time
          class="@md:text-md block text-sm leading-2 opacity-80"
          dateTime={new Date(date).toISOString()}
        >
          {t("site.messages.updated")}{" "}
          {fd(date, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <p
        q:slot="description"
        class="mt-4 overflow-hidden text-base leading-6 tracking-normal text-pretty text-ellipsis"
      >
        {description}
      </p>

      <Image
        q:slot="aside"
        width={544}
        height={320}
        layout="constrained"
        class="aspect-[5/3] w-full overflow-hidden rounded-lg object-cover shadow-md"
        background="auto"
        src={getAssetPath(thumbnail.src)}
        alt={thumbnail.alt}
      />

      {tags && tags.length > 0 && (
        <ul
          q:slot="superheader"
          class="flex flex-wrap items-start gap-1 @md:gap-2"
        >
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
});

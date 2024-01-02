import { component$ } from "@builder.io/qwik";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";
import Card from "../card/card";
import { Image } from "@unpic/qwik";
import type { PostFromSlug } from "~/content";

interface Props {
  slug: PostFromSlug["slug"];
  title: PostFromSlug["frontmatter"]["title"];
  description: PostFromSlug["frontmatter"]["description"];
  date: PostFromSlug["frontmatter"]["updatedAt"];
  tags: PostFromSlug["frontmatter"]["tags"];
  thumbnail: PostFromSlug["frontmatter"]["thumbnail"];
}

export default component$(({ slug, title, description, date, tags, thumbnail }: Props) => {
  return (
    <Card class="mt-20 text-zinc-800">
      <div q:slot="title" class="space-y-1">
        <h3 class="grow space-x-3 text-3xl font-medium leading-10 tracking-tighter">
          <a href={slug}>{title}</a>
          <IconArrowTopRight class="inline-block" />
        </h3>
        <time class="block text-sm leading-6 opacity-70" dateTime={date.toISOString()}>
          {$localize`Last updated at`} {date.toLocaleDateString()}
        </time>
      </div>
      <p q:slot="description" class="mt-7 overflow-hidden text-ellipsis text-pretty text-base leading-6">
        {description}
      </p>
      <Image
        layout="constrained"
        width={thumbnail.width || 544}
        height={thumbnail.height || 320}
        src={thumbnail.src}
        alt={thumbnail.alt}
        q:slot="aside"
        class="aspect-[1.54] w-full overflow-hidden rounded-lg object-contain object-center"
      />
      <ul q:slot="superheader" class="flex items-start gap-4">
        {tags.map((tag) => (
          <li key={tag} class="rounded-md border border-zinc-200 bg-zinc-50 p-2 leading-6 text-zinc-950">
            {tag}
          </li>
        ))}
      </ul>
    </Card>
  );
});

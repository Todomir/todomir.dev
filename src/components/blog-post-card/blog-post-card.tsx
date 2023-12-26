import { component$ } from "@builder.io/qwik";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";
import Card from "../card/card";

interface Props {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  thumbnail: string;
}

export default component$(({ slug, title, description, date, tags, thumbnail }: Props) => {
  return (
    <Card class="mt-20 text-zinc-800">
      <div q:slot="title" class="space-y-1">
        <h4 class="grow space-x-3 text-3xl font-medium leading-10 tracking-tighter">
          <a href={slug}>{title}</a>
          <IconArrowTopRight class="inline-block" />
        </h4>
        <time class="block text-sm leading-6 opacity-50" dateTime={date.toISOString()}>
          {$localize`Last updated at`} {date.toLocaleDateString()}
        </time>
      </div>
      <p q:slot="description" class="text-pretty mt-7 overflow-hidden text-ellipsis text-base leading-6">
        {description}
      </p>
      <img
        width={600}
        height={390}
        srcset={thumbnail}
        q:slot="aside"
        loading="lazy"
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

import { component$ } from "@builder.io/qwik";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";
import Card from "../card/card";

interface Props {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: {
    id: string;
    name: string;
  }[];
  thumbnail: {
    srcset: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default component$((props: Props) => {
  return (
    <Card class="mt-20 text-zinc-800">
      <h4 q:slot="title" class="grow space-x-3 text-3xl font-medium leading-10 tracking-tighter">
        <a href={props.slug}>{props.title}</a>
        <IconArrowTopRight class="inline-block" />
      </h4>
      <p q:slot="description" class="text-pretty mt-7 overflow-hidden text-ellipsis text-base leading-6">
        {props.description}
      </p>
      <img
        q:slot="aside"
        srcSet={props.thumbnail.srcset}
        alt={props.thumbnail.alt}
        width={props.thumbnail.width}
        height={props.thumbnail.height}
        loading="lazy"
        class="aspect-[1.54] w-full overflow-hidden rounded-lg object-contain object-center"
      />
      <ul q:slot="subheader" class="flex items-start gap-4">
        {props.tags.map((tag) => (
          <li key={tag.id} class="rounded-md border border-zinc-200 bg-zinc-50 p-2 leading-6 text-zinc-950">
            {tag.name}
          </li>
        ))}
      </ul>
    </Card>
  );
});

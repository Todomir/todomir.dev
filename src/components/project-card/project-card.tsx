import { Fragment, component$ } from "@builder.io/qwik";
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
    <Card class="mt-20 bg-zinc-950">
      <h4 q:slot="title" class="grow space-x-2 text-3xl font-medium leading-10 tracking-tighter">
        <a href={props.slug}>{props.title}</a>
        {props.slug !== "" && <IconArrowTopRight class="inline-block" />}
      </h4>
      <p q:slot="description" class="text-balance overflow-hidden text-ellipsis text-base leading-6 text-zinc-300">
        {props.description}
      </p>
      <img
        q:slot="aside"
        srcset={props.thumbnail.srcset}
        alt={props.thumbnail.alt}
        width={props.thumbnail.width}
        height={props.thumbnail.height}
        loading="lazy"
        class="aspect-[1.54] w-full overflow-hidden rounded-lg object-contain object-center"
      />
      <ul q:slot="superheader" class="flex items-start gap-4">
        {props.tags.map((tag, index) => (
          <Fragment key={tag.id}>
            <li class="leading-6 text-zinc-500 ">{tag.name}</li>
            {index < props.tags.length - 1 && (
              <li class="leading-6 text-zinc-500" aria-hidden="true">
                |
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </Card>
  );
});

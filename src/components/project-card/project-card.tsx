import { component$, Fragment } from "@builder.io/qwik";

import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

import Card from "../card/card";

type Props = {
  description: string;
  id: string;
  slug?: string;
  tags: string[];
  thumbnail: {
    alt: string;
    height: number;
    srcset: string;
    width: number;
  };
  title: string;
};

export default component$((props: Props) => {
  return (
    <Card class="bg-zinc-900/20 p-5 sm:p-12">
      <span
        q:slot="title"
        class="grow space-x-2 text-3xl font-medium leading-10 tracking-tighter"
      >
        {props.slug ?
          <a href={props.slug}>{props.title}</a>
        : props.title}
        {props.slug && <IconArrowTopRight class="inline-block" />}
      </span>
      <p
        q:slot="description"
        class="overflow-hidden text-ellipsis text-balance text-base leading-6 tracking-normal text-zinc-300"
      >
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
      <ul q:slot="superheader" class="flex flex-wrap items-start gap-x-3">
        {props.tags.map((tag, index) => (
          <Fragment key={props.id + tag}>
            <li class="leading-6 text-zinc-600">{tag}</li>
            {index < props.tags.length - 1 && (
              <li class="text-zinc-800" aria-hidden="true">
                |
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </Card>
  );
});

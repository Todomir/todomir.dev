import { Fragment, component$ } from "@builder.io/qwik";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";
import Card from "../card/card";

interface Props {
  id: string;
  slug?: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: {
    srcset: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default component$((props: Props) => {
  return (
    <Card class="bg-zinc-900/20 p-5 sm:p-12">
      <h4
        q:slot="title"
        class="grow space-x-2 text-3xl font-medium leading-10 tracking-tighter"
      >
        <a href={props.slug}>{props.title}</a>
        {props.slug && <IconArrowTopRight class="inline-block" />}
      </h4>
      <p
        q:slot="description"
        class="overflow-hidden text-ellipsis text-balance text-base leading-6 text-zinc-300"
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

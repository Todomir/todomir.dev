import { component$, Fragment } from "@builder.io/qwik";

import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

import Card from "../card/card";
import Sparkles from "../sparkles/sparkles";
import { inlineTranslate } from "qwik-speak";

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
  isCurrent?: boolean;
};

export default component$((props: Props) => {
  const t = inlineTranslate();

  return (
    <Card class="bg-zinc-900/20 p-5 sm:p-12">
      <header q:slot="title" class="grow flex gap-3 items-center">
        <h2 class="text-3xl font-medium leading-10 tracking-tighter">
          {props.slug ?
            <a href={props.slug}>{props.title}</a>
          : props.title}
          {props.slug && <IconArrowTopRight class="inline-block" />}
        </h2>
        {props.isCurrent && (
          <Sparkles>
            <div class="py-1 px-2 rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-500 text-xs font-bold">
              {t("app.badges.current")}
            </div>
          </Sparkles>
        )}
      </header>

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

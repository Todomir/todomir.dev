import { component$, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { inlineTranslate, useFormatDate } from "qwik-speak";

import Tag from "~/components/tag/tag";
import { useBlogPost } from "~/content";
import { getAssetPath } from "~/utils/functions";

export default component$(() => {
  const postSig = useBlogPost();
  const { data: post } = postSig.value;

  const t = inlineTranslate();
  const fd = useFormatDate();
  const location = useLocation();

  return (
    <article id="main-content">
      <div class="content-grid mb-24 pb-12 pt-16 text-black md:pt-36">
        <header class="my-12">
          <a
            href=".."
            class="mb-12 flex gap-2 text-zinc-700 transition-all duration-300 ease-spring-1 hover:gap-4"
          >
            <span>←</span>
            <span>{t("site.messages.return_previous_page")}</span>
          </a>

          <ul class="flex flex-wrap gap-2 @container md:gap-3 ">
            {post.tags?.map((tag: string) => (
              <li style={{ viewTransitionName: `blog-${tag}` }} key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <h1 class="text-balance text-4xl leading-[53px] tracking-tighter md:my-6 md:text-6xl md:leading-[73px]">
            {post.title}
          </h1>

          <time class="block text-balance text-base leading-6 text-zinc-700">
            {t("site.messages.updated")}{" "}
            {fd(post.date, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div class="aspect-w-16 aspect-h-9 my-8 overflow-clip rounded-lg shadow-xl">
            {/* <Slot name="thumbnail" /> */}
            <Image
              width={1_200}
              height={820}
              decoding="sync"
              loading="eager"
              src={getAssetPath(post.thumbnail.src)}
              alt={post.thumbnail.alt}
              layout="constrained"
              background="auto"
            />
          </div>
        </header>

        <p class="leading-1 mb-24 text-xl font-medium md:text-3xl">
          {post.description}
        </p>

        <div class="prose-img:breakout prose prose-zinc max-w-none text-pretty lg:prose-xl prose-code:rounded-md prose-code:border prose-code:border-zinc-300 prose-code:bg-zinc-100 prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] prose-img:mb-24 prose-img:rounded-md prose-img:shadow-lg [&_pre_code]:border-transparent [&_pre_code]:bg-inherit [&_pre_code]:p-0">
          <Slot />
        </div>

        <div class="full-width my-24 bg-zinc-200 px-5 md:px-20">
          <hr class="w-full border-zinc-200" />
        </div>

        <div class="flex flex-col justify-between gap-3 md:flex-row">
          <h3 class="mb-1 text-2xl font-bold">{t("site.messages.share")}</h3>
          <div class="space-x-2">
            <a
              class="inline-block rounded-lg bg-black px-4 py-2 text-white"
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                post.title,
              )}&url=${location.url.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("site.messages.share_on")} 𝕏.com
            </a>
          </div>
        </div>
      </div>
    </article>
  );
});

export { useBlogPost } from "~/content";

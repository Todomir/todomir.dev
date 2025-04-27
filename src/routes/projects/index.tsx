import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { animate, stagger } from "motion";
import { inlineTranslate } from "qwik-speak";

import { config } from "~/speak.config";
import { getProjects } from "~/utils/projects";
import Sparkles from "~/components/sparkles/sparkles";

export default component$(() => {
  const t = inlineTranslate();

  useVisibleTask$(() => {
    const projectList = document.querySelectorAll("#project-list > li");

    animate(
      projectList,
      {
        opacity: [0, 1],
        y: [20, 0],
      },
      {
        delay: stagger(0.2),
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 2.5,
      },
    );
  });

  return (
    <section
      id="main-content"
      class="full-width auto-rows-min bg-zinc-950 pt-48"
    >
      <h1 class="mt-10 text-center text-4xl leading-[54px] font-medium tracking-tighter text-zinc-50 md:mt-12 md:text-7xl md:leading-[91px]">
        {t("site.links.projects.label")}
      </h1>
      <h2
        class="mt-4 text-center text-xl leading-7 text-zinc-500"
        dangerouslySetInnerHTML={t("home.projects.description")}
      />

      <ul
        id="project-list"
        class="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2"
      >
        {getProjects().map((post) => (
          <li class="opacity-0" key={post.id + "--project"}>
            <article class="bg-darker ease-spring-4 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pt-80 pb-8 transition-all duration-500 focus-within:shadow-[0_0_0_0.4rem_theme(colors.sky.400)] sm:pt-48 lg:pt-80">
              <img
                srcset={post.thumbnail.srcset}
                width={post.thumbnail.width}
                height={post.thumbnail.height}
                alt={post.thumbnail.alt}
                class="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <header class="flex items-center gap-3">
                <h3 class="w-fit rounded-sm bg-zinc-950/80 p-2 text-xl leading-6 font-bold text-white">
                  {post.title}
                </h3>
                {post.isCurrent && (
                  <Sparkles>
                    <div class="rounded-full bg-gradient-to-b from-emerald-500 to-emerald-400 px-2 py-1 text-xs font-bold text-emerald-50 shadow-sm">
                      {t("app.badges.current")}
                    </div>
                  </Sparkles>
                )}
              </header>
              <p class="mt-2 w-fit rounded-sm bg-zinc-950/80 p-2 text-lg leading-6 text-zinc-50">
                {post.description}
              </p>
              <span class="block after:absolute after:inset-0 after:block after:h-full after:w-full focus:shadow-none">
                <span class="sr-only">{t("site.messages.read_more")}</span>
              </span>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
  const t = inlineTranslate();
  const ogUrl = new URL("/og-image", url);
  ogUrl.searchParams.set("title", t("site.og.projects.title"));
  ogUrl.searchParams.set("description", t("site.og.projects.description"));
  ogUrl.searchParams.set("permalink", "https://abn.ooo/projects");

  return {
    title: t("site.og.projects.title"),
    meta: [
      {
        name: "description",
        content: t("site.og.projects.description"),
      },
      {
        name: "og:title",
        content: t("site.og.projects.title"),
      },
      {
        name: "og:description",
        content: t("site.og.projects.description"),
      },
      {
        name: "og:image",
        content: ogUrl.toString(),
      },
      {
        name: "og:url",
        content: "https://abn.ooo/projects",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: ogUrl.toString(),
      },
      {
        name: "twitter:title",
        content: t("site.og.projects.title"),
      },
      {
        name: "twitter:description",
        content: t("site.og.projects.description"),
      },
      {
        name: "twitter:site",
        content: "@todomir__",
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: config.supportedLocales.map((locale) => {
      return {
        lang: locale.lang === config.defaultLocale.lang ? "." : locale.lang,
      };
    }),
  };
};

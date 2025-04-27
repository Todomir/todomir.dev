import { component$, useSignal } from "@builder.io/qwik";
import { inlineTranslate, translatePath, useSpeakLocale } from "qwik-speak";

import ChangeLocale from "../change-locale/change-locale";

export default component$(() => {
  const t = inlineTranslate();

  const isExpandedSig = useSignal(false);

  const locale = useSpeakLocale();
  const getPath = translatePath();

  const NAV_LINKS = [
    {
      url: t("site.links.home.url"),
      label: t("site.links.home.label"),
    },
    {
      url: t("site.links.about.url"),
      label: t("site.links.about.label"),
    },
    {
      url: t("site.links.projects.url"),
      label: t("site.links.projects.label"),
    },
    {
      url: t("site.links.blog.url"),
      label: t("site.links.blog.label"),
    },
  ];

  return (
    <header
      id="navbar"
      class={[
        "header fixed top-1 right-0 z-20 ml-auto items-center px-5 pt-12 text-zinc-50 md:right-1/2 md:translate-x-1/2 md:px-20",
      ]}
    >
      <button
        style={{ viewTransitionName: "navbar-button" }}
        type="button"
        aria-expanded={isExpandedSig.value}
        aria-controls="navbar-menu"
        aria-label={
          isExpandedSig.value ? t("app.header.close") : t("app.header.open")
        }
        class={[
          "ease-spring-4 ml-auto block rounded-md border border-zinc-50/60 bg-zinc-950 p-2 leading-none text-zinc-50 transition-all hover:bg-zinc-900 md:hidden",
        ]}
        onClick$={() => {
          const next = !isExpandedSig.value;

          if (!document.startViewTransition) {
            isExpandedSig.value = next;
            return;
          }

          document.startViewTransition(() => {
            isExpandedSig.value = next;
          });
        }}
      >
        <svg
          aria-hidden="true"
          class="h-6 w-6 text-zinc-200 transition-transform duration-500 ease-in-out"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <line
            class={[
              "origin-center transition-transform duration-500 ease-in-out",
              {
                "-translate-x-1 translate-y-1 rotate-45": isExpandedSig.value,
              },
            ]}
            stroke-linecap="round"
            stroke-linejoin="round"
            x1="4"
            y1="6"
            x2="20"
            y2="6"
          />
          <line
            class={[
              "transition-transform duration-500 ease-in-out",
              {
                "translate-x-1 opacity-0": isExpandedSig.value,
              },
              {
                "translate-x-0 opacity-100": !isExpandedSig.value,
              },
            ]}
            stroke-linecap="round"
            stroke-linejoin="round"
            x1="4"
            y1="12"
            x2="20"
            y2="12"
          />
          <line
            class={[
              "origin-center transition-transform duration-500 ease-in-out",
              {
                "-translate-x-1 -translate-y-1 -rotate-45": isExpandedSig.value,
              },
            ]}
            stroke-linecap="round"
            stroke-linejoin="round"
            x1="4"
            y1="18"
            x2="20"
            y2="18"
          />
        </svg>
      </button>
      <nav
        style={{ viewTransitionName: "navbar" }}
        class={[
          "relative mt-2.5 max-w-[353px] flex-col items-center justify-between gap-4 rounded-xl border border-zinc-50/20 bg-zinc-950 px-6 py-4 text-right md:text-left md:opacity-100",
          { "opacity-0": !isExpandedSig.value },
        ]}
      >
        <ul
          id="navbar-menu"
          class={[
            "ease-spring-3 flex flex-col justify-end text-zinc-500 transition-all md:mt-0 md:flex-row md:justify-around",
          ]}
        >
          {NAV_LINKS.map((link) => (
            <li
              class="py-2 md:px-4 md:py-1"
              key={`nav-link-${link.label}-${link.url}`}
            >
              <a
                href={getPath(link.url, locale.lang)}
                class="cursor-pointer text-base leading-5 font-medium tracking-normal whitespace-nowrap text-zinc-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div class="block md:hidden">
          <ChangeLocale />
        </div>
      </nav>
    </header>
  );
});

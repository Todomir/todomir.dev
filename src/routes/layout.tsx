/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { RequestHandler } from "@builder.io/qwik-city";

import { $, component$, Slot, useOnWindow, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate, translatePath, useSpeakLocale } from "qwik-speak";

import ChangeLocale from "~/components/change-locale/change-locale";
import Logo from "~/components/logo/logo";
import { ONE_DAY_IN_SECONDS, ONE_MINUTE_IN_SECONDS } from "~/utils/constants";

declare global {
  interface Document {
    startViewTransition?: (
      updateCallback: () => Promise<void> | void,
    ) => ViewTransition;
  }

  interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    skipTransition: () => void;
    updateCallbackDone: Promise<void>;
  }

  interface CSSStyleDeclaration {
    viewTransitionName: string;
  }
}

export const SOCIAL_LINKS = [
  {
    url: "https://github.com/Todomir",
    label: "GitHub",
  },
  {
    url: "https://x.com/todomir__",
    label: "X.com",
  },
  {
    url: "https://www.linkedin.com/in/todomir/",
    label: "LinkedIn",
  },
  {
    url: "https://read.cv/todomir/",
    label: "Read.cv",
  },
  {
    url: "https://peerlist.io/abno_/",
    label: "Peerlist",
  },
];

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: ONE_DAY_IN_SECONDS,
    maxAge: ONE_MINUTE_IN_SECONDS,
  });

  cacheControl(
    {
      staleWhileRevalidate: ONE_DAY_IN_SECONDS,
      maxAge: ONE_MINUTE_IN_SECONDS,
    },
    "Cloudflare-CDN-Cache-Control",
  );
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

const Header = component$(() => {
  const t = inlineTranslate();

  const isMobileSig = useSignal(false);
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

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      isMobileSig.value = mediaQuery.matches;

      const listener = (e: MediaQueryListEvent) => {
        isMobileSig.value = e.matches;
      };

      mediaQuery.addEventListener("change", listener);
    }),
  );

  return (
    <header
      id="navbar"
      class="header fixed right-0 top-1 z-20 ml-auto items-center px-5 pt-12 text-zinc-50 md:right-1/2 md:translate-x-1/2 md/footer:px-20"
    >
      <button
        style={{
          viewTransitionName: "navbar-button",
        }}
        type="button"
        aria-expanded={isExpandedSig.value}
        disabled={!isMobileSig.value}
        aria-controls="navbar-menu"
        aria-label={
          isExpandedSig.value ? t("app.header.close") : t("app.header.open")
        }
        class={[
          "leading-0 ml-auto block rounded-md border border-zinc-50/60 bg-zinc-950 p-2 text-zinc-50 transition-all ease-spring-4 hover:bg-zinc-900",
          {
            hidden: !isMobileSig.value,
          },
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
        style={{
          viewTransitionName: "navbar",
        }}
        class={[
          "relative mt-2.5 max-w-[353px] flex-col items-center justify-between gap-4 rounded-xl border border-zinc-50/20 bg-zinc-950 px-6 py-4 text-right md:text-left md:opacity-100 ",
          {
            "opacity-0": !isMobileSig.value || !isExpandedSig.value,
          },
        ]}
      >
        <ul
          id="navbar-menu"
          class={[
            "flex flex-col justify-end text-zinc-500 transition-all ease-spring-3 md:mt-0 md:flex-row md:justify-around",
            {
              hidden: !isExpandedSig.value && isMobileSig.value,
            },
          ]}
        >
          {NAV_LINKS.map((link) => (
            <li
              class="py-2 md:px-4 md:py-1"
              key={`nav-link-${link.label}-${link.url}`}
            >
              <a
                href={getPath(link.url, locale.lang)}
                class="cursor-pointer whitespace-nowrap text-base font-medium leading-5 tracking-normal text-zinc-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {isMobileSig.value && <ChangeLocale />}
      </nav>
    </header>
  );
});

const Footer = component$(() => {
  const t = inlineTranslate();
  return (
    <footer class="content-grid footer @md/footer/footer:px-20 flex w-full flex-col bg-zinc-950 px-5 py-12 text-zinc-300  @container/footer">
      <div class="breakout">
        <Logo />
        <div class="mt-8 flex max-w-full flex-wrap items-stretch justify-between gap-3 self-stretch">
          <p class="max-w-2xl shrink grow basis-auto text-balance text-sm leading-5 tracking-normal text-zinc-500">
            {t("app.footer.quote")}
          </p>
          <a
            href="mailto:abnerluis1001@gmail.com"
            target="_blank"
            rel="noreferrer"
            class="my-auto shrink grow basis-auto text-left text-xl leading-7 tracking-tight text-zinc-500 @2xl/footer:text-right"
          >
            abnerluis1001@gmail.com
          </a>
        </div>
        <hr class="mt-10 h-px max-w-full shrink-0 self-stretch border-zinc-900" />
        <ul class="mb-3 mt-8 flex max-w-full flex-wrap justify-center gap-5 @md/footer:justify-start">
          {SOCIAL_LINKS.map((link) => (
            <li key={`social-link-${link.label}-${link.url}`}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                class="text-sm leading-5 tracking-normal text-zinc-500 underline underline-offset-2 transition-all ease-spring-2 hover:font-semibold hover:text-zinc-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <hr class="mt-10 h-px max-w-full shrink-0 self-stretch border-zinc-900" />
        <ChangeLocale />
      </div>
    </footer>
  );
});

export default component$(() => {
  return (
    <>
      <a
        class="absolute left-0 z-50 m-3 -translate-y-16 bg-emerald-900 px-3 py-1 text-emerald-50 transition focus:translate-y-0"
        href="#main-content"
      >
        Skip Navigation
      </a>
      <Header />
      <main class="content-grid min-h-dvh">
        <Slot />
      </main>
      <Footer />
    </>
  );
});

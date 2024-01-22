/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { RequestHandler } from "@builder.io/qwik-city";

import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";

import ChangeLocale from "~/components/change-locale/change-locale";
import Logo from "~/components/logo/logo";
import Navbar from "~/components/navbar/navbar";
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
      <Navbar />
      <main class="content-grid min-h-dvh">
        <Slot />
      </main>
      <Footer />
    </>
  );
});

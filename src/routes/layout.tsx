/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { RequestHandler } from "@builder.io/qwik-city";

import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import Footer from "~/components/footer/footer";
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
      <main id="main-content" class="content-grid min-h-dvh">
        <Slot />
      </main>
      <Footer />
    </>
  );
});

/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser,
 * this entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - Npm run start
 * - Npm run preview
 * - Npm run build
 */
import type {
  RenderOptions,
  RenderToStreamOptions,
} from "@builder.io/qwik/server";

import { isDev } from "@builder.io/qwik/build";
import { renderToStream } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";

import Root from "./root";
import { config } from "./speak.config";

/**
 * Determine the base URL to use for loading the chunks in the browser. The
 * value set through Qwik 'locale()' in 'plugin.ts' is saved by Qwik in
 * 'serverData.locale' directly. Make sure the locale is among the
 * 'supportedLocales'
 */
export function extractBase({ serverData }: RenderOptions): string {
  if (!isDev && serverData?.locale) {
    return "/build/" + serverData.locale;
  } else {
    return "/build";
  }
}

export default async function (options: RenderToStreamOptions) {
  return await renderToStream(<Root />, {
    manifest,
    ...options,
    // Determine the base URL for the client code
    base: extractBase,
    // Use container attributes to set attributes on the html tag
    containerAttributes: {
      lang: options.serverData?.locale || config.defaultLocale.lang,
      dir:
        config.supportedLocales.find(
          (x) => x.lang === options.serverData?.locale,
        )?.dir ||
        config.defaultLocale.dir ||
        "auto",
      ...options.containerAttributes,
    },
  });
}

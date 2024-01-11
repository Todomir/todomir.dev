import type { RenderOptions } from "@builder.io/qwik";

import { render } from "@builder.io/qwik";

import Root from "./root";

/*
 * WHAT IS THIS FILE?
 *
 * Development entry point using only client-side modules:
 * - Do not use this mode in production!
 * - No SSR
 * - No portion of the application is pre-rendered on the server.
 * - All of the application is running eagerly in the browser.
 * - More code is transferred to the browser than in SSR mode.
 * - Optimizer/Serialization/Deserialization code is not exercised!
 */

export default async function (options: RenderOptions) {
  return await render(document, <Root />, options);
}

import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { useQwikSpeak } from "qwik-speak";

import { RouterHead } from "./components/router-head/router-head";
import { config } from "./speak.config";
import { translationFn as translationFunction } from "./speak.functions";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider>
   * component, immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  /** Init Qwik Speak */
  useQwikSpeak({
    config,
    translationFn: translationFunction,
    langs: ["en", "pt-BR"],
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <RouterOutlet />
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "ba6f3dbc516b421da0fabd5aec8bbecf"}'
        />
        {/* End Cloudflare Web Analytics */}
      </body>
    </QwikCityProvider>
  );
});

import type { RequestHandler } from "@builder.io/qwik-city";

import { validateLocale } from "qwik-speak";

import { config } from "../speak.config";

export const onRequest: RequestHandler = ({
  params,
  locale,
  error,
  request,
}) => {
  const acceptLanguage = request.headers.get("accept-language");
  let userLang = acceptLanguage?.split(";")[0]?.split(",")[0];
  // Remove -US from en-US
  userLang = userLang === "en-US" ? "en" : userLang;

  const langParameter =
    params.lang && validateLocale(params.lang) ? params.lang : undefined;
  const langUser = userLang && validateLocale(userLang) ? userLang : undefined;

  const lang = langParameter ?? langUser ?? config.defaultLocale.lang;

  // Check supported locales
  const isSupportedLocale = config.supportedLocales.some(
    (value) => value.lang === lang,
  );

  // 404 error page
  if (!isSupportedLocale) {
    throw error(404, "Page not found");
  }

  // Set Qwik locale
  locale(lang);
};

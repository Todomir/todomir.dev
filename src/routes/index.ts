import type { RequestHandler } from "@builder.io/qwik-city";
import { extractLang } from "./[locale]/i18n-utils";

export const onGet: RequestHandler = async ({ redirect, url, params }) => {
  const guessedLocale = extractLang(params.locale);
  console.log(`  ➜  GET / - Redirecting to /${guessedLocale}...`);
  throw redirect(301, `/${guessedLocale}/${url.search}`);
};

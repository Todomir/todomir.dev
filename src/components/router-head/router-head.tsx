import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { useSpeakConfig } from "qwik-speak";

/** The RouterHead component is placed inside of the document `<head>` element. */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  const speakConfig = useSpeakConfig();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {speakConfig.supportedLocales.map((locale) => {
        return (
          <link
            key={locale.lang + "__alternate"}
            rel="alternate"
            hreflang={locale.lang}
            href={`${loc.url.origin}${locale.lang === speakConfig.defaultLocale.lang ? "/" : `/${locale.lang}/`}`}
          />
        );
      })}

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} />
      ))}

      {head.scripts.map((s) => (
        <script key={s.key} {...s.props} />
      ))}
    </>
  );
});

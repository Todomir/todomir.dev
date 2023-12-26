import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={`(async function () {
          if (!("paintWorklet" in CSS)) {
            await import("https://unpkg.com/css-paint-polyfill");
          }

          CSS.paintWorklet.addModule('/border.js');
        })();`}
      />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is guaranteed to come from Qwik, so there is no problem of using it
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      {head.scripts.map((s) => (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is guaranteed to come from Qwik, so there is no problem of using it
        <script key={s.key} {...s.props} dangerouslySetInnerHTML={s.script} />
      ))}
    </>
  );
});

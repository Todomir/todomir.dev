import type {
  BundledLanguage,
  SpecialLanguage,
  StringLiteralUnion,
} from "shikiji/index.mjs";

import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { codeToHtml } from "shikiji/index.mjs";

type Props = {
  content: string;
  lang?: StringLiteralUnion<BundledLanguage | SpecialLanguage, string>;
};
export default component$<Props>(({ content, lang }) => {
  const html = useSignal("");

  useTask$(async () => {
    const parsed = await codeToHtml(content, {
      lang: lang || "plaintext",
      theme: "vitesse-dark",
    });

    html.value = parsed;
  });

  if (html.value) {
    return <div dangerouslySetInnerHTML={html.value} />;
  }

  return null;
});

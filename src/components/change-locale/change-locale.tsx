import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  inlineTranslate,
  localizePath,
  useDisplayName,
  useSpeakConfig,
  useSpeakLocale,
} from "qwik-speak";

export default component$(() => {
  const t = inlineTranslate();

  const pathname = useLocation().url.pathname;

  const locale = useSpeakLocale();
  const config = useSpeakConfig();
  const dn = useDisplayName();

  const getPath = localizePath();

  return (
    <>
      <h2 class="font-bold pt-6">{t("site.messages.change_locale")}</h2>

      {config.supportedLocales.map((value) => (
        <a
          key={value.lang}
          class={[
            "text-sm block leading-5 tracking-normal text-zinc-500 underline underline-offset-2 transition-all ease-spring-2 hover:font-semibold hover:text-zinc-100",
            { "font-bold text-zinc-300": value.lang == locale.lang },
          ]}
          href={getPath(pathname, value.lang)}
        >
          {dn(value.lang, { type: "language" })}
        </a>
      ))}
    </>
  );
});

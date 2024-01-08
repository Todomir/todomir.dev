import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import CharacterButton from "~/components/character-button/character-button";
import Sparkles from "~/components/sparkles/sparkles";
import { EMOJIS } from "~/utils/constants";

export default component$(() => {
  const t = inlineTranslate();
  return (
    <div class="full-width mx-auto h-[50dvh] w-full bg-zinc-950 px-16 py-10 pl-5 pr-8 text-center text-xl md:pb-32 md:pt-52 md:text-3xl lg:pb-60">
      <p class="m-auto h-fit w-full text-balance text-zinc-500">
        <span dangerouslySetInnerHTML={t("home.quote.description")} />{" "}
        <span class="text-zinc-200">
          <Sparkles>{t("home.quote.visuallyStunning")}</Sparkles>{" "}
          <CharacterButton characters={EMOJIS}>
            {t("home.quote.interactive")}
          </CharacterButton>
        </span>{" "}
        {t("home.quote.webExperiences")}{" "}
        <span dangerouslySetInnerHTML={t("home.quote.specializing")} />
      </p>
    </div>
  );
});

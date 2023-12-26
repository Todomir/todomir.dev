import { component$ } from "@builder.io/qwik";

import CharacterButton from "~/components/character-button/character-button";
import Sparkles from "~/components/sparkles/sparkles";
import { EMOJIS } from "~/utils/constants";

export default component$(() => {
  return (
    <div class="full-width mx-auto w-full bg-zinc-950 px-16 py-10 pl-5 pr-8 text-xl md:pb-32 md:pt-52 md:text-3xl lg:pb-60">
      <h3 class="text-pretty w-full text-zinc-500">
        <span
          dangerouslySetInnerHTML={$localize`A <span class="text-zinc-200">creative front-end engineer</span> with a passion for crafting`}
        />{" "}
        <span class="text-zinc-200">
          <Sparkles>{$localize`visually stunning`}</Sparkles>{" "}
          <CharacterButton characters={EMOJIS}>{$localize`interactive web experiences.`}</CharacterButton>
        </span>{" "}
        <span
          dangerouslySetInnerHTML={$localize`Specializing in <span class="text-zinc-200"> translating design concepts into efficient and <em class="font-serif italic">elegant</em> user interfaces,</span> with a keen <span class="text-zinc-200">eye for detail</span> and a focus on <span class="text-zinc-200">user-centric design principle</span>.`}
        />
      </h3>
    </div>
  );
});

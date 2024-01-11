// Imports
import type { HTMLAttributes } from "@builder.io/qwik";

import {
  $,
  component$,
  Slot,
  useStore,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";

import { random } from "~/utils/functions";

import CSS from "./character-button.styles.css?inline";

type Props = {
  character: string;
  size: number;
  style: HTMLAttributes<HTMLSpanElement>["style"];
};

/**
 * GenerateCharacter generates a new character object with random properties. It
 * takes in a character string, and returns an object with that character, a
 * random id, the current timestamp, a random size, and a random style with top
 * and left values.
 */
const generateCharacter = (character: string) => ({
  id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
  createdAt: Date.now(),
  character,
  size: random(10, 20),
  style: {
    top: `${random(0, 10)}%`,
    left: `${random(0, 100)}%`,
  },
});

const useCharacterStore = () =>
  useStore({
    characters: [] as Array<{
      character: string;
      createdAt: number;
      id: string;
      size: number;
      style: HTMLAttributes<HTMLSpanElement>["style"];
    }>,
    prefersReducedMotion: false,
  });

export const Character = component$((props: Props) => {
  return (
    <span class="character-button__wrapper" style={props.style} aria-hidden>
      <span aria-hidden class="character-button__char">
        {props.character}
      </span>
    </span>
  );
});

const CharacterButton = component$(
  (props: { characters: string[]; class?: string }) => {
    const store = useCharacterStore();
    useStyles$(CSS);

    /**
     * HandleClick handles the click event for the CharacterButton component. It
     * generates a new random character from the props.characters array,
     * ensuring it is different than the last generated character. It adds the
     * new character to the component's store.
     */
    const handleClick = $(() => {
      let char = props.characters[random(0, props.characters.length - 1)];
      while (
        store.characters.length > 0 &&
        char === store.characters[store.characters.length - 1].character
      ) {
        char = props.characters[random(0, props.characters.length - 1)];
      }

      store.characters = [...store.characters, generateCharacter(char)];
    });

    useTask$(({ track, cleanup }) => {
      track(() => store.characters);
      const timeout = setTimeout(() => {
        // Delete the oldest one
        store.characters = store.characters.slice(1);
      }, 700);
      cleanup(() => clearTimeout(timeout));
    });

    // Render
    return (
      <button
        onClick$={handleClick}
        type="button"
        class={[
          "character-button cursor-pointer rounded-lg bg-gradient-to-b from-emerald-300 to-emerald-400 px-2 py-1 text-emerald-600 shadow-[0_4px_0] shadow-emerald-600 border border-emerald-500/5 transition-all hover:-translate-y-[1px] hover:shadow-[0_6px_0] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_2px_0] active:brightness-90 motion-reduce:transform-none motion-reduce:transition-none",
          props.class,
        ]}
      >
        <span class="text-emerald-950 font-black lg:font-bold">
          {store.characters.map((character) => (
            <Character
              key={character.id}
              character={character.character}
              size={character.size}
              style={character.style}
            />
          ))}
          <Slot />
        </span>
      </button>
    );
  },
);

// Export default
export default CharacterButton;

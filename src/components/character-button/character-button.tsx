// Imports
import type { HTMLAttributes } from "@builder.io/qwik";
import {
	$,
	Slot,
	component$,
	useStore,
	useStyles$,
	useVisibleTask$,
} from "@builder.io/qwik";
import CSS from "./character-button.styles.css?inline";

// Helper functions
const random = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min)) + min;

// Generate a single sparkle
const generateCharacter = (character: string) => ({
	id: String(random(10000, 99999)),
	createdAt: Date.now(),
	character,
	size: random(10, 20),
	style: {
		top: `${random(0, 10)}%`,
		left: `${random(0, 100)}%`,
	},
});

// Sparkle store
const useCharacterStore = () =>
	useStore({
		characters: [] as {
			id: string;
			createdAt: number;
			character: string;
			size: number;
			style: HTMLAttributes<HTMLSpanElement>["style"];
		}[],
		prefersReducedMotion: false,
	});

// Sparkle component
export const Character = component$(
	(props: {
		size: number;
		character: string;
		style: HTMLAttributes<HTMLSpanElement>["style"];
	}) => {
		return (
			<span class="character-button__wrapper" style={props.style} aria-hidden>
				<span aria-hidden class="character-button__char">
					{props.character}
				</span>
			</span>
		);
	},
);

const CharacterButton = component$((props: { characters: string[] }) => {
	const store = useCharacterStore();
	// CSS styles
	useStyles$(CSS);

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

	useVisibleTask$(({ track, cleanup }) => {
		track(() => store.characters);
		const timeout = setTimeout(() => {
			// Delete the oldest one
			store.characters = store.characters.slice(1);
		}, 600);
		cleanup(() => clearTimeout(timeout));
	});

	// Render
	return (
		<button onClick$={handleClick} type="button" class="character-button">
			{store.characters.map((character) => (
				<Character
					key={character.id}
					character={character.character}
					size={character.size}
					style={character.style}
				/>
			))}
			<Slot />
		</button>
	);
});

// Export default
export default CharacterButton;
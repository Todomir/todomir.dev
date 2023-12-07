import { component$ } from "@builder.io/qwik";

import CharacterButton from "~/components/character-button/character-button";
import Sparkles from "~/components/sparkles/sparkles";

const EMOJIS = [
	"\u{1F4BB}", // Laptop
	"\u{1F4F1}", // Mobile phone
	"\u{1F4A1}", // Light bulb (representing ideas)
	"\u{1F680}", // Rocket (often used for startups or launches)
	"\u{1F4BE}", // Floppy disk (nostalgic tech)
	"\u{2328}", // Keyboard
	"\u{1F50C}", // Power plug
	"\u{1F4BD}", // Computer disk
	"\u{1F4C8}", // Chart increasing (representing analytics or growth)
	"\u{260E}", // Telephone (old style)
];

export default component$(() => {
	return (
		<div class="full-width w-full text-xl md:text-3xl mx-auto bg-zinc-900 md:pt-52 md:pb-32 lg:pb-60 px-16 pl-5 pr-8 py-10 ">
			<h3 class="text-pretty w-full text-zinc-500 z-20">
				A <span class="text-zinc-200">creative front-end engineer</span> with a
				passion for crafting{" "}
				<span class="text-zinc-200">
					{" "}
					<Sparkles>visually stunning</Sparkles>{" "}
					<CharacterButton characters={EMOJIS}>interactive</CharacterButton> web
					experiences{" "}
				</span>
				. Specializing in{" "}
				<span class="text-zinc-200">
					translating design concepts into efficient and{" "}
					<em class="font-serif italic">elegant</em> user interfaces
				</span>
				, with a keen <span class="text-zinc-200">eye for detail</span> and a
				focus on{" "}
				<span class="text-zinc-200">user-centric design principle</span>.
			</h3>
		</div>
	);
});

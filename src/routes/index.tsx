import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import About from "~/features/home/about";
import Hero from "~/features/home/hero";
import Quote from "~/features/home/quote";

export default component$(() => {
	return (
		<>
			<Hero />
			<Quote />
			<div class="px-5 md:px-20">
				<hr class="w-full border-zinc-700" />
			</div>
			<About />
		</>
	);
});

export const head: DocumentHead = {
	title: "Abner Rodrigues | Creative Developer",
	meta: [
		{
			name: "description",
			content: "Helping people build software for people, for the world.",
		},
	],
};

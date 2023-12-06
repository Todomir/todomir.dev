import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import About from "~/features/home/about";
import Blog from "~/features/home/blog";
import Hero from "~/features/home/hero";
import Projects from "~/features/home/projects";
import Quote from "~/features/home/quote";

export default component$(() => {
	return (
		<div class="mb-[420px]">
			<Hero />
			<Quote />
			<div class="bg-zinc-900 px-5 md:px-20">
				<hr class="w-full border-zinc-700" />
			</div>
			<About />
			<Projects />
			<Blog />
		</div>
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

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
	return <h1>hello from qwik</h1>;
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

import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { animate, spring, stagger } from "motion";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

export default component$(() => {
	useVisibleTask$(() => {
		const aside = document.querySelector<HTMLDivElement>("#hero aside");
		if (!aside) return;

		const leftImages = aside.querySelectorAll<HTMLDivElement>(
			"[data-direction=left]",
		);
		const rightImages = aside.querySelectorAll<HTMLDivElement>(
			"[data-direction=right]",
		);

		if (!leftImages.length || !rightImages.length) return;

		const springConfig = {
			mass: 5,
			stiffness: 200,
			damping: 150,
		};

		animate(
			leftImages,
			{
				x: ["-80%", 0],
				opacity: [0, 1],
			},
			{
				delay: stagger(0.1),
				easing: spring(springConfig),
			},
		);

		animate(
			rightImages,
			{
				x: ["50%", 0],
				opacity: [0, 1],
			},
			{
				delay: stagger(0.4),
				easing: spring(springConfig),
			},
		);
	});
	return (
		<section
			id="hero"
			class="full-width bg-zinc-950 h-fit flex flex-col py-24 relative"
		>
			<aside class="overflow-x-clip absolute full-width -translate-y-12 pointer-events-none inset-0 mb-12">
				<div
					data-direction="left"
					class="absolute -top-12 -left-24 aspect-video w-[min(60%,463px)] bg-zinc-900 rounded-3xl shadow-2xl opacity-0"
				/>

				<div
					data-direction="left"
					class="absolute -bottom-4 -left-36 aspect-video w-[min(60%,463px)] bg-zinc-900 rounded-3xl shadow-2xl opacity-0"
				/>

				<div
					data-direction="right"
					class="absolute -bottom-8 -right-24 aspect-video w-[min(60%,463px)] bg-zinc-900 rounded-3xl shadow-2xl opacity-0"
				/>

				<div
					data-direction="right"
					class="absolute -top-24 -right-24 aspect-video w-[min(60%,318px)] bg-zinc-900 rounded-3xl shadow-2xl opacity-0"
				/>
			</aside>

			<h1 class="text-zinc-200 text-center md:text-7xl md:leading-[96px] tracking-tighter md:mt-12 max-w-full text-4xl leading-[53px] mt-10">
				Abner Rodrigues <br />
				Creat<span class="italic">i</span>ve Developer
			</h1>

			<p class="text-center text-xl mx-auto leading-7 max-w-[524px] mt-10">
				Web Developer extraordinaire, crafting super cool solutions with style{" "}
				{"\u{1F60E}"}
			</p>

			<div
				aria-labelledby="scroll"
				class="w-fit h-fit mx-auto bg-zinc-900/10 flex gap-4 mt-20 mb-40 md:mb-64 p-9 rounded-[108px] group"
			>
				<IconArrowDown />
				<span id="scroll" class="text-zinc-200 sr-only">
					Scroll to see more
				</span>
			</div>
		</section>
	);
});

import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { animate, spring } from "motion";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

function getAnimationConfig(index: number) {
	return {
		duration: 0.5,
		delay: index * 0.1,
		easing: spring(),
	};
}

export default component$(() => {
	useVisibleTask$(() => {
		const images = document.querySelectorAll("[data-hero-image]");
		// biome-ignore lint/complexity/noForEach: To avoid having multiple animates, we use forEach to have access to the index and do the stagger this way
		images.forEach((image, index) => {
			switch (image.id) {
				case "img-top-left":
					animate(
						image,
						{ opacity: 1, x: ["-100%", "-80%"], y: ["-60%", "-35%"] },
						getAnimationConfig(index),
					);
					break;
				case "img-bottom-left":
					animate(
						image,
						{ opacity: 1, x: ["-100%", "-70%"], y: "-100%" },
						getAnimationConfig(index),
					);
					break;
				case "img-bottom-right":
					animate(
						image,
						{ opacity: 1, x: ["0%", "-40%"], y: ["-100%", "-110%"] },
						getAnimationConfig(index),
					);
					break;
				case "img-top-right":
					animate(
						image,
						{ opacity: 1, x: ["-10%", "-20%"], y: ["-60%", "-20%"] },
						getAnimationConfig(index),
					);
					break;
			}
		});
	});

	return (
		<section class="full-width bg-zinc-950 flex flex-col py-24 relative">
			<aside class="absolute full-width -translate-y-12 pointer-events-none inset-0 w-full overflow-x-clip z-10 mb-12">
				<div
					aria-hidden
					data-hero-image
					id="img-top-left"
					class="absolute opacity-0 top-0 left-0 -translate-x-[90%] sm:-translate-x-[70%] -translate-y-1/4 -md:translate-y-3/4 aspect-video min-h-[313px] md:min-h-[387px] bg-black border border-zinc-500 rounded-xl"
				/>
				<div
					aria-hidden
					data-hero-image
					id="img-bottom-left"
					class="absolute opacity-0 top-full left-0 -translate-x-[90%] sm:-translate-x-3/4 -translate-y-[100%] aspect-video min-h-[242px] md:min-h-[381px] bg-black border border-zinc-500 rounded-xl"
				/>

				<div
					aria-hidden
					data-hero-image
					id="img-bottom-right"
					class="absolute opacity-0 top-full left-full -translate-y-[110%] -translate-x-[40%] md:-translate-x-[70%] aspect-[9/16] min-h-[242px] md:min-h-[381px] bg-black border border-zinc-500 rounded-xl"
				/>
				<div
					aria-hidden
					data-hero-image
					id="img-top-right"
					class="absolute opacity-0 top-0 left-full -translate-x-[10%] sm:-translate-x-[20%] -translate-y-1/4 -md:translate-y-1/2 aspect-video min-h-[242px] md:min-h-[381px] bg-black border border-zinc-500 rounded-xl"
				/>
			</aside>

			<h1 class="text-zinc-200 text-center md:text-7xl md:leading-[96px] tracking-tighter md:mt-12 max-w-full text-4xl leading-[53px] mt-10 z-20">
				Abner Rodrigues <br />
				Creat<span class="italic">i</span>ve Developer
			</h1>

			<p class="text-center text-xl mx-auto leading-7 max-w-[524px] mt-10 z-20">
				Web Developer extraordinaire, crafting super cool solutions with style{" "}
				{"\u{1F60E}"}
			</p>

			<div
				aria-labelledby="scroll"
				data-hero-scroll-indicator
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

import { component$ } from "@builder.io/qwik";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

export default component$(() => {
	return (
		<section class="full-width bg-zinc-900 flex flex-col py-24 relative">
			<aside class="absolute full-width -translate-y-12 pointer-events-none inset-0 w-full overflow-x-clip z-10 mb-12">
				<div
					aria-hidden
					id="img-top-left"
					class="absolute top-0 left-0 -translate-x-[90%] sm:-translate-x-[70%] -translate-y-1/4 -md:translate-y-3/4 aspect-video min-h-[313px] md:min-h-[387px] bg-black border border-zinc-500 rounded-xl"
				/>
				<div
					aria-hidden
					id="img-bottom-left"
					class="absolute top-full left-0 -translate-x-[90%] sm:-translate-x-3/4 -translate-y-[100%] aspect-video min-h-[242px] md:min-h-[381px] bg-black border border-zinc-500 rounded-xl"
				/>

				<div
					aria-hidden
					id="img-bottom-right"
					class="absolute top-full left-full -translate-y-[110%] -translate-x-[40%] md:-translate-x-[70%] aspect-[9/16] min-h-[242px] md:min-h-[381px] bg-black border border-zinc-500 rounded-xl"
				/>
				<div
					aria-hidden
					id="img-top-right"
					class="absolute top-0 left-full -translate-x-[10%] sm:-translate-x-[20%] -translate-y-1/4 -md:translate-y-1/2 aspect-video min-h-[242px] md:min-h-[381px] bg-black border border-zinc-500 rounded-xl"
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

			<div class="w-fit h-fit mx-auto bg-zinc-800/20 flex gap-4 mt-20 mb-40 md:mb-64 p-9 rounded-[108px]">
				<IconArrowDown />
			</div>
		</section>
	);
});

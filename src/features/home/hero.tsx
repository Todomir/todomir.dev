import { component$ } from "@builder.io/qwik";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

export default component$(() => {
	return (
		<section class="full-width bg-zinc-900 flex flex-col py-12 px-5 md:px-20">
			<h1 class="text-zinc-200 text-center text-7xl leading-[96px] tracking-tighter mt-12 max-md:max-w-full max-md:text-4xl max-md:leading-[53px] max-md:mt-10">
				Abner Rodrigues <br />
				Creat<span class="italic">i</span>ve Developer
			</h1>

			<p class="text-center text-xl mx-auto leading-7 max-w-[524px] mt-10 max-md:max-w-full">
				Web Developer extraordinaire, crafting super cool solutions with style{" "}
				{"\u{1F60E}"}
			</p>

			<div class="w-fit h-fit mx-auto bg-zinc-800/20 flex gap-4 mt-20 mb-20 p-9 rounded-[108px] my-10">
				<IconArrowDown />
			</div>
		</section>
	);
});

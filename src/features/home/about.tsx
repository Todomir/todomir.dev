import { component$ } from "@builder.io/qwik";

import ImgMe from "~/media/images/me.jpg?jsx";

export default component$(() => {
	return (
		<section
			id="about"
			class="full-width bg-zinc-950 flex flex-col px-16 py-20 md:py-60 max-md:px-5"
		>
			<div class="flex flex-col lg:flex-row md:gap-20">
				<ImgMe class="ml-0 object-cover rounded-lg object-center w-full overflow-hidden grow max-h-[600px] mt-10" />
				<div class="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
					<h2 class="text-gray-100 text-5xl font-medium leading-[59px] tracking-tighter max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
						I believe in empowering <span class="font-serif">people</span>
					</h2>
					<h3 class="text-zinc-500 text-2xl leading-8 tracking-tight mt-6 max-md:max-w-full">
						<span class="font-serif">People</span> are at the heart of any
						business. I develop software that brings{" "}
						<span class="font-serif">people</span> together and empowers them,
						all while bringing a smile to their faces.
					</h3>
					<p class="text-gray-100 text-base leading-6 tracking-normal mt-12 max-md:max-w-full mb-6">
						I'm Abner 👋, an innovative and passionate Web Developer with a
						flair for creating elegant solutions in the least amount of time.
					</p>
					<p>
						With over 5 years of experience, I have crafted an array of dynamic
						and visually appealing web applications for diverse industries.
						Specialized in front-end development with extensive experience in
						creating high-impact, user-focused digital experiences
					</p>
					<a
						href="mailto:abnerluis1001@gmail.com"
						target="_blank"
						rel="noreferrer"
						class="text-zinc-500 text-2xl leading-8 tracking-tight whitespace-nowrap underline cursor-pointer mt-12 max-md:max-w-full"
					>
						abnerluis1001@gmail.com
					</a>
				</div>
			</div>
		</section>
	);
});

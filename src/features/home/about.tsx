import { component$ } from "@builder.io/qwik";

import ImgMe from "~/media/images/me.jpg?jsx";

export default component$(() => {
	return (
		<section
			id="about"
			class="full-width bg-zinc-950 md:px-16 py-20 md:py-60 px-5"
		>
			<div class="flex flex-col lg:flex-row md:gap-20">
				<ImgMe class="ml-0 object-cover rounded-lg object-center w-full overflow-hidden grow max-h-[600px] mt-10" />
				<div class="flex flex-col my-auto max-w-full mt-10">
					<h2 class="text-gray-100 md:text-5xl font-medium md:leading-[59px] tracking-tighter max-w-full text-4xl leading-[54px]">
						I believe in empowering <em class="font-serif italic">people</em>
					</h2>
					<h3 class="text-zinc-500 text-2xl leading-8 tracking-tight mt-6 max-w-full">
						<span class="font-serif italic">People</span> are at the heart of
						any business. I develop software that brings{" "}
						<span class="font-serif italic">people</span> together and empowers
						them, all while bringing a smile to their faces.
					</h3>
					<p class="text-gray-100 text-base leading-6 tracking-normal mt-12 max-w-full mb-6">
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
						class="text-zinc-500 text-2xl leading-8 tracking-tight whitespace-nowrap underline cursor-pointer mt-12 max-w-full"
					>
						abnerluis1001@gmail.com
					</a>
				</div>
			</div>
		</section>
	);
});

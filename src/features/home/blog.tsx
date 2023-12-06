import { Fragment, component$ } from "@builder.io/qwik";
import BlogPostCard from "~/components/blog-post-card/blog-post-card";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";

const MOCK_BLOG_POSTS = [
	{
		id: "1",
		slug: "/blog/really-qwik-site",
		title: "A really Qwik website",
		description:
			"The adventures on how I built my personal website using Qwik, an exciting new web framework",
		tags: [
			{ id: "1_tag", name: "Qwik" },
			{ id: "2_tag", name: "Front-end" },
		],
		thumbnail: {
			srcset: "sample-srcset",
			alt: "Sample Alt",
			width: 100,
			height: 100,
		},
	},
];

export default component$(() => {
	return (
		<section class="full-width bg-white flex flex-col px-6 py-12 md:py-32 rounded-none max-md:px-5">
			<h2 class="text-gray-900 text-center md:text-6xl md:leading-[73px] tracking-tighter md:mt-12  text-4xl leading-[53px] mt-10">
				Blog
			</h2>
			<p class="self-stretch text-gray-900 text-center text-base leading-6 mt-4 max-md:max-w-full">
				My ramblings about random stuff
			</p>

			<section>
				<ul class="grid grid-cols-1 gap-10 mt-20">
					{MOCK_BLOG_POSTS.map((post) => (
						<Fragment key={post.id}>
							<li>
								<BlogPostCard
									id={post.id}
									slug={post.slug}
									title={post.title}
									description={post.description}
									tags={post.tags}
									thumbnail={post.thumbnail}
								/>
							</li>

							<li
								aria-hidden
								class="hidden h-[1px] w-full my-2 bg-zinc-300 leading-6 [&+&]:block"
							/>
						</Fragment>
					))}
				</ul>
			</section>

			<a
				href="/blog"
				class="justify-end items-stretch flex gap-2 cursor-pointer pointer-events-auto mt-16 mb-10 self-end max-md:mt-10 text-zinc-900 text-xl leading-7 tracking-tight grow whitespace-nowrap"
			>
				Ver blog
				<IconArrowTopRight />
			</a>
		</section>
	);
});

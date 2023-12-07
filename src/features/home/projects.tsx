import { component$ } from "@builder.io/qwik";
import ProjectCard from "~/components/project-card/project-card";

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
		<section
			id="projects"
			class="full-width bg-zinc-950 flex flex-col md:px-16 py-12 rounded-b-xl px-5"
		>
			<h2 class="md:text-7xl font-medium md:leading-[91px] tracking-tighter mt-12  text-4xl leading-[54px] max-md:mt-10">
				Projects
			</h2>
			<h3 class="text-zinc-500 text-xl leading-7 mt-4 ">
				Projects I've been working on lately <small>(and not so lately)</small>
			</h3>
			<section>
				<ul class="grid grid-cols-1 gap-10 mt-20">
					{MOCK_BLOG_POSTS.map((post) => (
						<li key={post.id}>
							<ProjectCard
								id={post.id}
								slug={post.slug}
								title={post.title}
								description={post.description}
								tags={post.tags}
								thumbnail={post.thumbnail}
							/>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
});

import { Fragment, component$ } from "@builder.io/qwik";
import IconArrowTopRight from "~/media/icons/arrow/top-right.svg?jsx";
import Card from "../card/card";

interface Props {
	id: string;
	slug: string;
	title: string;
	description: string;
	tags: {
		id: string;
		name: string;
	}[];
	thumbnail: {
		srcset: string;
		alt: string;
		width: number;
		height: number;
	};
}

export default component$((props: Props) => {
	return (
		<Card class="bg-zinc-950 mt-20">
			<h4
				q:slot="title"
				class="text-3xl font-medium leading-10 tracking-tighter grow space-x-3"
			>
				<a href={props.slug}>{props.title}</a>
				<IconArrowTopRight class="inline-block" />
			</h4>
			<p
				q:slot="description"
				class="text-pretty overflow-hidden text-zinc-300 text-ellipsis text-base leading-6 mt-7"
			>
				{props.description}
			</p>
			<img
				q:slot="aside"
				srcSet={props.thumbnail.srcset}
				alt={props.thumbnail.alt}
				width={props.thumbnail.width}
				height={props.thumbnail.height}
				loading="lazy"
				class="aspect-[1.54] rounded-lg object-contain object-center w-full overflow-hidden"
			/>
			<ul q:slot="subheader" class="flex gap-4 items-start">
				{props.tags.map((tag, index) => (
					<Fragment key={tag.id}>
						<li class="text-zinc-500 leading-6 ">{tag.name}</li>
						{index < props.tags.length - 1 && (
							<li class="text-zinc-500 leading-6" aria-hidden="true">
								|
							</li>
						)}
					</Fragment>
				))}
			</ul>
		</Card>
	);
});

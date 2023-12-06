import { Slot, component$ } from "@builder.io/qwik";

interface Props {
	class: string;
}

export default component$((props: Props) => {
	return (
		<article class={["p-8 md:p-10 rounded-xl", props.class]}>
			<div class="gap-10 md:gap-12 flex flex-col md:flex-row">
				<div class="w-full flex flex-col">
					<Slot name="aside" />
				</div>
				<div class="flex flex-col gap-3 w-full my-auto pb-6">
					<Slot name="subheader" />
					<div class="w-full flex justify-between gap-4">
						<Slot name="title" />
					</div>
					<Slot name="description" />
				</div>
			</div>
		</article>
	);
});

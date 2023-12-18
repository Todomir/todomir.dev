import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Glass from "~/components/glass/glass";
import { NAV_LINKS, SOCIAL_LINKS } from "~/constants/links";

export const onGet: RequestHandler = async ({ cacheControl }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.builder.io/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	});
};

export const useServerTimeLoader = routeLoader$(() => {
	return {
		date: new Date().toISOString(),
	};
});

const Header = component$(() => {
	return (
		<header class="sticky top-1 z-20 text-zinc-100 header items-center md:px-20 pt-12 px-5">
			<nav class="relative max-w-[353px] justify-between items-center mx-auto flex-col mt-2.5  py-4 px-6">
				<ul class="flex justify-around gap-">
					{NAV_LINKS.map((link) => (
						<li key={`nav-link-${link.label}-${link.url}`}>
							<a
								href={link.url}
								class="text-base font-medium leading-5 tracking-normal whitespace-nowrap cursor-pointer px-4 py-2"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>

				<Glass spread={3} bgClass="bg-zinc-950" bgOpacity={0.35} />
			</nav>
		</header>
	);
});

const Footer = component$(() => {
	return (
		<footer class="full-width w-full bg-zinc-950 footer flex flex-col px-20 py-12 max-md:px-5">
			<header class="text-zinc-200 text-xl font-bold leading-6 tracking-tighter whitespace-nowrap justify-center items-stretch bg-zinc-700 bg-opacity-20 mt-8 px-3.5 py-3.5 border-[0.62px] border-solid border-zinc-700 self-start">
				LOGO
			</header>
			<div class="items-stretch self-stretch flex justify-between gap-3 mt-8 max-md:max-w-full max-md:flex-wrap">
				<p class="text-zinc-500 text-pretty max-w-[70ch] text-sm leading-5 tracking-normal grow shrink basis-auto">
					Be the change you wish to see in the world. Let your actions speak
					louder than your words. Strive for progress every day.
				</p>
				<a
					href="mailto:abnerluis1001@gmail.com"
					target="_blank"
					rel="noreferrer"
					class="text-zinc-500 text-left md:text-right text-xl leading-7 tracking-tight grow shrink basis-auto my-auto"
				>
					abnerluis1001@gmail.com
				</a>
			</div>
			<hr class="border-zinc-800 self-stretch shrink-0 h-px mt-10 max-md:max-w-full" />
			<ul class="flex justify-between md:justify-start gap-5 mt-8 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
				{SOCIAL_LINKS.map((link) => (
					<li key={`social-link-${link.label}-${link.url}`}>
						<a
							href={link.url}
							target="_blank"
							rel="noreferrer"
							class="text-zinc-200 text-sm leading-5 tracking-normal whitespace-nowrap"
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
			<div class="text-zinc-500 text-center md:text-right text-sm leading-5 tracking-normal grow shrink basis-auto">
				© Abner Rodrigues. 2023.
			</div>
		</footer>
	);
});

export default component$(() => {
	return (
		<>
			<Header />
			<main class="content-grid bg-white">
				<Slot />
			</main>
			<Footer />
		</>
	);
});

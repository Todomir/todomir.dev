import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
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

export default component$(() => {
	return (
		<main class="bg-white text-zinc-100">
			<header class="bg-zinc-900 header items-center flex flex-col px-20 pt-12 max-md:px-5">
				<nav class="justify-center items-center flex flex-col mt-2.5 px-16 py-3 max-md:max-w-full max-md:px-5">
					<ul class="flex w-[353px] max-w-full items-stretch justify-between gap-5 max-md:justify-center">
						{NAV_LINKS.map((link) => (
							<li
								style={{
									viewTransitionName: `${link.label.toLowerCase()}-nav`,
								}}
								key={`nav-link-${link.label}-${link.url}`}
							>
								<a
									href={link.url}
									class="text-base font-medium leading-5 tracking-normal whitespace-nowrap cursor-pointer"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</header>

			<Slot />

			<footer class="fixed -z-10 bottom-0 w-full bg-zinc-900 footer flex flex-col px-20 py-12 max-md:px-5">
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
		</main>
	);
});

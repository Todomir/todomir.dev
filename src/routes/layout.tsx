import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { NAV_LINKS } from "~/constants/links";

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
		<main class="bg-zinc-900 text-zinc-100">
			<header class="header items-center flex flex-col px-20 pt-12 max-md:px-5">
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
		</main>
	);
});

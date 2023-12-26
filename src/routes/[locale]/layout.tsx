import { Slot, component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Glass from "~/components/glass/glass";

import { extractLang, useI18n } from "~/routes/[locale]/i18n-utils";

export const SOCIAL_LINKS = [
  {
    url: "https://github.com/Todomir",
    label: "GitHub",
  },
  {
    url: "https://x.com/todomir__",
    label: "X.com",
  },
  {
    url: "https://www.linkedin.com/in/todomir/",
    label: "LinkedIn",
  },
];

export const onGet: RequestHandler = async ({ cacheControl, locale, params }) => {
  locale(extractLang(params.locale));
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
  const NAV_LINKS = [
    {
      url: $localize`:@@links.about:/__/#about`,
      label: $localize`About`,
    },
    {
      url: $localize`:@@links.projects:/__/#projects`,
      label: $localize`Projects`,
    },
    {
      url: $localize`:@@links.blog:/__/blog`,
      label: $localize`Blog`,
    },
  ];

  return (
    <header class="header sticky top-1 z-20 items-center px-5 pt-12 text-zinc-100 md:px-20">
      <nav class="relative mx-auto mt-2.5 max-w-[353px] flex-col items-center justify-between  px-6 py-4">
        <ul class="gap- flex justify-around">
          {NAV_LINKS.map((link) => (
            <li key={`nav-link-${link.label}-${link.url}`}>
              <Link
                href={link.url}
                class="cursor-pointer whitespace-nowrap px-4 py-2 text-base font-medium leading-5 tracking-normal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Glass spread={3} bgClass="bg-zinc-950" bgOpacity={0.58} />
      </nav>
    </header>
  );
});

const Footer = component$(() => {
  return (
    <footer class="full-width footer flex w-full flex-col bg-zinc-950 px-20 py-12 max-md:px-5">
      <header class="mt-8 items-stretch justify-center self-start whitespace-nowrap border-[0.62px] border-solid border-zinc-700 bg-zinc-700 bg-opacity-20 px-3.5 py-3.5 text-xl font-bold leading-6 tracking-tighter text-zinc-200">
        LOGO
      </header>
      <div class="mt-8 flex items-stretch justify-between gap-3 self-stretch max-md:max-w-full max-md:flex-wrap">
        <p class="text-pretty max-w-[70ch] shrink grow basis-auto text-sm leading-5 tracking-normal text-zinc-500">
          {$localize`Be the change you wish to see in the world. Let your actions speak louder than your words. Strive for progress every day.`}
        </p>
        <a
          href="mailto:abnerluis1001@gmail.com"
          target="_blank"
          rel="noreferrer"
          class="my-auto shrink grow basis-auto text-left text-xl leading-7 tracking-tight text-zinc-500 md:text-right"
        >
          abnerluis1001@gmail.com
        </a>
      </div>
      <hr class="mt-10 h-px shrink-0 self-stretch border-zinc-800 max-md:max-w-full" />
      <ul class="mt-8 flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center md:justify-start">
        {SOCIAL_LINKS.map((link) => (
          <li key={`social-link-${link.label}-${link.url}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              class="whitespace-nowrap text-sm leading-5 tracking-normal text-zinc-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div class="shrink grow basis-auto text-center text-sm leading-5 tracking-normal text-zinc-500 md:text-right">
        © Abner Rodrigues. 2023.
      </div>
    </footer>
  );
});

export default component$(() => {
  useI18n();
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

import {
  $,
  Slot,
  component$,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { animate } from "motion";
import { inlineTranslate } from "qwik-speak";
import Logo from "~/components/logo/logo";
import { ONE_DAY_IN_SECONDS, ONE_WEEK_IN_SECONDS } from "~/utils/constants";

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
  {
    url: "https://read.cv/todomir/",
    label: "Read.cv",
  },
  {
    url: "https://peerlist.io/abno_/",
    label: "Peerlist",
  },
];

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: ONE_WEEK_IN_SECONDS,
    maxAge: ONE_DAY_IN_SECONDS,
  });

  cacheControl(
    {
      staleWhileRevalidate: ONE_WEEK_IN_SECONDS,
      maxAge: ONE_DAY_IN_SECONDS,
    },
    "Cloudflare-CDN-Cache-Control",
  );
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

const Header = component$(() => {
  const t = inlineTranslate();

  const isMobileSig = useSignal(false);
  const isExpandedSig = useSignal(false);

  const NAV_LINKS = [
    {
      url: t("site.links.home.url"),
      label: t("site.links.home.label"),
    },
    {
      url: t("site.links.about.url"),
      label: t("site.links.about.label"),
    },
    {
      url: t("site.links.projects.url"),
      label: t("site.links.projects.label"),
    },
    {
      url: t("site.links.blog.url"),
      label: t("site.links.blog.label"),
    },
  ];

  // Animate the header when it becomes visible
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    animate(
      "#navbar",
      {
        opacity: [0, 1],
        y: [-20, 0],
      },
      {
        delay: 0.5,
        duration: 0.5,
      },
    );
  });

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      isMobileSig.value = mediaQuery.matches;

      const listener = (e: MediaQueryListEvent) => {
        isMobileSig.value = e.matches;
      };

      mediaQuery.addEventListener("change", listener);
    }),
  );

  return (
    <header class="header fixed ml-auto right-0 md:right-1/2 md:translate-x-1/2 top-1 z-20 items-center px-5 pt-12 text-zinc-50 md/footer:px-20">
      <nav
        style={{ viewTransitionName: "navbar" }}
        id="navbar"
        class="relative opacity-0 mt-2.5 max-w-[353px] flex-col gap-4 items-center justify-between px-6 py-4 bg-zinc-950 rounded-xl border border-zinc-50/20"
      >
        <button
          style={{ viewTransitionName: "navbar-button" }}
          type="button"
          aria-expanded={isExpandedSig.value}
          disabled={!isMobileSig.value}
          aria-controls="navbar-menu"
          class={["ml-auto block", { hidden: !isMobileSig.value }]}
          onClick$={() => {
            const next = !isExpandedSig.value;
            // Hack to avoid TypeScript error since `startViewTransition` is not
            // defined in the type definition.
            if (!(document as any).startViewTransition) {
              isExpandedSig.value = next;
              return;
            }

            (document as any).startViewTransition(() => {
              isExpandedSig.value = next;
            });
          }}
        >
          <svg
            class="w-6 h-6 text-zinc-500 transition-transform duration-500 ease-in-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <line
              class={[
                "transition-transform origin-center duration-500 ease-in-out",
                {
                  "rotate-45 -translate-x-1 translate-y-1": isExpandedSig.value,
                },
              ]}
              stroke-linecap="round"
              stroke-linejoin="round"
              x1="4"
              y1="6"
              x2="20"
              y2="6"
            />
            <line
              class={[
                "transition-transform duration-500 ease-in-out",
                { "opacity-0 translate-x-1": isExpandedSig.value },
                { "opacity-100 translate-x-0": !isExpandedSig.value },
              ]}
              stroke-linecap="round"
              stroke-linejoin="round"
              x1="4"
              y1="12"
              x2="20"
              y2="12"
            />
            <line
              class={[
                "transition-transform origin-center duration-500 ease-in-out",
                {
                  "-rotate-45 -translate-x-1 -translate-y-1":
                    isExpandedSig.value,
                },
              ]}
              stroke-linecap="round"
              stroke-linejoin="round"
              x1="4"
              y1="18"
              x2="20"
              y2="18"
            />
          </svg>
        </button>
        <ul
          id="navbar-menu"
          class={[
            "flex justify-end flex-col md:flex-row md:justify-around text-right md:text-left text-zinc-500 transition-all ease-spring-3 mt-4 md:mt-0",
            { hidden: !isExpandedSig.value && isMobileSig.value },
          ]}
        >
          {NAV_LINKS.map((link) => (
            <li class="md:px-4 py-1" key={`nav-link-${link.label}-${link.url}`}>
              <a
                href={link.url}
                class="cursor-pointer whitespace-nowrap text-zinc-50 text-base font-medium leading-5 tracking-normal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
});

const Footer = component$(() => {
  const t = inlineTranslate();
  return (
    <footer class="full-width footer @md/footer/footer:px-20 flex w-full flex-col bg-zinc-950 px-5 py-12 text-zinc-300  @container/footer">
      <Logo />
      <div class="mt-8 flex max-w-full flex-wrap items-stretch justify-between gap-3 self-stretch">
        <p class="max-w-2xl shrink grow basis-auto text-balance text-sm leading-5 tracking-normal text-zinc-500">
          {t("app.footer.quote")}
        </p>
        <a
          href="mailto:abnerluis1001@gmail.com"
          target="_blank"
          rel="noreferrer"
          class="my-auto shrink grow basis-auto text-left text-xl leading-7 tracking-tight text-zinc-500 @2xl/footer:text-right"
        >
          abnerluis1001@gmail.com
        </a>
      </div>
      <hr class="mt-10 h-px max-w-full shrink-0 self-stretch border-zinc-800" />
      <ul class="mb-3 mt-8 flex max-w-full flex-wrap justify-center gap-5 @md/footer:justify-start">
        {SOCIAL_LINKS.map((link) => (
          <li key={`social-link-${link.label}-${link.url}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              class="text-sm leading-5 tracking-normal text-zinc-500 underline underline-offset-2 transition-all ease-spring-2 hover:font-semibold hover:text-zinc-100"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div class="shrink grow basis-auto text-center text-sm leading-5 tracking-normal text-zinc-500 @md/footer:text-right">
        © Abner Rodrigues. {new Date().getFullYear()}.
      </div>
    </footer>
  );
});

export default component$(() => {
  return (
    <>
      <Header />
      <main class="content-grid min-h-dvh">
        <Slot />
      </main>
      <Footer />
    </>
  );
});

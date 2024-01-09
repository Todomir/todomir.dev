import { Slot, component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { animate } from "motion";
import { inlineTranslate } from "qwik-speak";
import Glass from "~/components/glass/glass";
import Logo from "~/components/logo/logo";

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
  const t = inlineTranslate();
  const NAV_LINKS = [
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

  return (
    <header class="header fixed left-1/2 top-1 z-20 -translate-x-1/2 items-center px-5 pt-12 text-zinc-50 @md/footer:px-20">
      <nav
        id="navbar"
        class="relative opacity-0 mx-auto mt-2.5 max-w-[353px] flex-col items-center justify-between px-6 py-4"
      >
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

        <Glass spread={3} bgClass="bg-zinc-950" bgOpacity={0.6} />
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

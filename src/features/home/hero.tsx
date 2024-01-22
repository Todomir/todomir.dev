import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { animate, scroll, spring, stagger, timeline } from "motion";
import { inlineTranslate } from "qwik-speak";
import SplitType from "split-type";

import Logo from "~/components/logo/logo";
import { useGetUserPreferences } from "~/hooks/use-get-user-preferences";
import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";
import AstromartThumb from "~/media/images/projects/astromart-01.png?jsx";
import KdsThumb from "~/media/images/projects/kds-01.png?jsx";
import KobrazaThumb from "~/media/images/projects/kobraza-01.avif?jsx";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-nutrition-01.png?jsx";

export default component$(() => {
  const t = inlineTranslate();

  const asideRef = useSignal<HTMLDivElement>();
  const userPrefences = useGetUserPreferences();

  // We want this to run only once it is visible, and eagerly, on the client. So we use `useVisibleTask$`.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(userPrefences);

    const speed = 230 * Number(!userPrefences.reducedMotion);
    const animationParameters = {
      y: [null, `-${speed}%`],
    };

    scroll(
      animate("#hero-content", animationParameters, {
        easing: spring({
          mass: 75,
          stiffness: 30,
          damping: 15,
        }),
        delay: 0,
      }),
    );

    const images = asideRef.value?.querySelectorAll("*");
    if (!images) {
      return;
    }

    for (const el of images) {
      scroll(
        animate(
          el,
          {
            y: [null, `-${speed * 8}%`],
          },
          {
            easing: spring({
              mass: 75,
              stiffness: 30,
              damping: 15,
            }),
            delay: 0,
          },
        ),
      );
    }
  });

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const aside = asideRef.value;
      if (!aside) {
        return;
      }

      const images = aside.querySelectorAll("*");

      for (const el of document.querySelectorAll(".split")) {
        el.setAttribute("aria-label", el.textContent || "");
        if (el instanceof HTMLElement) {
          el.style.fontKerning = "normal";
        }
      }

      const text = SplitType.create(".split", {
        split: "lines,words,chars",
        tagName: "span",
        lineClass: "line overflow-hidden",
      });

      for (const line of text.lines as HTMLElement[]) {
        if (!line) continue;
        line.setAttribute("aria-hidden", "true");
      }

      for (const el of document.querySelectorAll(".split .line")) {
        el.setAttribute("aria-hidden", "true");
      }

      timeline([
        [
          "#hero-title .char",
          {
            y: userPrefences.reducedMotion ? [null] : [10, 0],
            opacity: [0, 1],
          },
          {
            delay: stagger(0.015),
          },
        ],
        [
          "#hero-subtitle .char",
          {
            y: userPrefences.reducedMotion ? [null] : [10, 0],
            opacity: [0, 1],
          },
          {
            delay: userPrefences.reducedMotion ? 0 : stagger(0.01),
            at: "-0.5",
          },
        ],
        [
          images,
          { opacity: [0, 1], scale: [0.95, 1], x: ["-100%", 0] },
          {
            delay: userPrefences.reducedMotion ? 0 : stagger(0.1),
            easing: spring({ damping: 50, stiffness: 100, mass: 10 }),
            at: "-0.5",
          },
        ],
        [
          "#hero-scroll",
          { opacity: [0, 1], y: [5, 0] },
          {
            at: "-1.5",
          },
        ],
      ]);
    }),
  );

  return (
    <section
      id="hero"
      class="full-width pointer-events-none relative flex h-fit flex-col overflow-x-clip bg-zinc-950 py-24 text-zinc-300 @container/hero"
    >
      <aside
        ref={asideRef}
        class="full-width pointer-events-none absolute inset-0 mb-12 -translate-y-12 overflow-x-clip"
      >
        {/* Top */}
        <AstromartThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.kobraza_imoveis.description")}
          class="absolute -left-24 top-2 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <KdsThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.kds_wahalla.description")}
          class="absolute -right-24 -top-8 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />

        {/* Bottom */}
        <KobrazaThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.leonardo_nutrition.description")}
          class="absolute -bottom-16 -right-36 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl @md/hero:-bottom-40"
        />
        <LeonardoNutritionThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.astromart.description")}
          class="absolute -bottom-12 -left-32 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl @md/hero:-bottom-32 md:-left-24 lg:-left-8"
        />
      </aside>

      <div id="hero-content" class="my-auto py-24 @2xl/hero:py-36">
        <Logo
          id="hero-logo"
          shouldFollowCursor
          shouldBlink
          class="mx-auto text-2xl text-white"
        />

        <h1
          id="hero-title"
          class="split z-10 mt-12 text-center text-5xl leading-normal tracking-tighter text-zinc-200 opacity-0 @md:text-6xl @md:leading-[1.2] @2xl/hero:text-7xl @2xl/hero:leading-normal"
          dangerouslySetInnerHTML={t("home.hero.title")}
        />

        <h2
          id="hero-subtitle"
          class="split mx-auto mt-10 max-w-[524px] text-center text-xl leading-7 opacity-0"
        >
          {t("home.hero.subtitle")}
        </h2>

        <div
          id="hero-scroll"
          aria-labelledby="scroll"
          class="group mx-auto mt-20 flex h-fit w-fit gap-4 rounded-full bg-zinc-900/10 p-9 opacity-0"
        >
          <IconArrowDown />
          <span id="scroll" class="sr-only text-zinc-200">
            {t("home.hero.scrollDown")}
          </span>
        </div>
      </div>
    </section>
  );
});

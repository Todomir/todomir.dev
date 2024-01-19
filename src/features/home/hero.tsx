import {
  $,
  component$,
  useOnDocument,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { animate, scroll, spring } from "motion";
import { inlineTranslate } from "qwik-speak";

import Logo from "~/components/logo/logo";
import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";
import AstromartThumb from "~/media/images/projects/astromart-01.png?jsx";
import KdsThumb from "~/media/images/projects/kds-01.png?jsx";
import KobrazaThumb from "~/media/images/projects/kobraza-01.avif?jsx";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-nutrition-01.png?jsx";

export default component$(() => {
  const t = inlineTranslate();

  const asideRef = useSignal<HTMLDivElement>();
  const prefersReducedMotion = useSignal(true);

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotion.value = mediaQuery.matches;

      mediaQuery.addEventListener("change", (e) => {
        prefersReducedMotion.value = e.matches;
      });
    }),
  );

  // We want this to run only once it is visible, and eagerly, on the client. So we use `useVisibleTask$`.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const aside = asideRef.value;
    if (!aside) {
      return;
    }

    animate(
      aside,
      {
        scale: [null, prefersReducedMotion.value ? 1 : 1.1],
      },
      {
        easing: spring({
          mass: 5,
          stiffness: 200,
          damping: 150,
        }),
      },
    );

    const images = aside.querySelectorAll("*");

    const springConfig = {
      mass: 5,
      stiffness: 200,
      damping: 150,
    };

    for (const [index, image] of images.entries()) {
      const speedMultiplier = Number((image as HTMLElement).dataset.speed) || 1;
      // Only animate the images if the user has not requested reduced motion.
      const speed =
        350 * (speedMultiplier * Number(!prefersReducedMotion.value));
      const xpos = index >= 2 ? ["100%", 0] : ["-100%", 0];

      animate(
        image,
        {
          x: prefersReducedMotion.value ? [] : xpos,
          opacity: [0, 1],
        },
        {
          delay: index * 0.2,
          easing: spring(springConfig),
        },
      );
      const animationParameters = {
        y: [null, `-${speed}%`],
      };
      scroll(
        animate(image, animationParameters, {
          easing: spring({
            mass: 75,
            stiffness: 30,
            damping: 15,
          }),
          delay: 0,
        }),
      );
    }
  });

  // We want this to run only once it is visible, and eagerly, on the client. So we use `useVisibleTask$`.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const speed = 230 * Number(!prefersReducedMotion.value);
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
  });

  useOnDocument(
    "mousemove",
    $((event) => {
      if (prefersReducedMotion.value) {
        return;
      }

      const aside = asideRef.value;
      if (!aside) {
        return;
      }

      const mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };

      animate(
        aside,
        {
          transformOrigin: "center",
          x: mousePosition.x / 100,
          y: mousePosition.y / 100,
        },
        {
          easing: spring({
            mass: 40,
            stiffness: 200,
            damping: 300,
          }),
        },
      );
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
          data-speed={2.5}
          alt={t("projects.kobraza_imoveis.description")}
          class="absolute -left-24 -top-2 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <KdsThumb
          loading="eager"
          decoding="sync"
          data-speed={2.2}
          alt={t("projects.kds_wahalla.description")}
          class="absolute -right-24 -top-4 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />

        {/* Bottom */}
        <KobrazaThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.leonardo_nutrition.description")}
          data-speed={1}
          class="absolute -bottom-8 -right-36 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <LeonardoNutritionThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.astromart.description")}
          data-speed={1.2}
          class="absolute -bottom-4 -left-32 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl md:-left-24 lg:-left-8"
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
          class="z-10 mt-12 text-center text-5xl leading-normal tracking-tighter text-zinc-200 @md:text-6xl @md:leading-[1.2] @2xl/hero:text-7xl @2xl/hero:leading-normal"
          dangerouslySetInnerHTML={t("home.hero.title")}
        />

        <h2 class="mx-auto mt-10 max-w-[524px] text-center text-xl leading-7">
          {t("home.hero.subtitle")}
        </h2>

        <div
          aria-labelledby="scroll"
          class="group mx-auto mt-20 flex h-fit w-fit gap-4 rounded-full bg-zinc-900/10 p-9"
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

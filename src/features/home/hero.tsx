import { $, component$, useOnDocument, useOnWindow, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate, scroll, spring } from "motion";
import Logo from "~/components/logo/logo";

import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";

import AstromartThumb from "~/media/images/projects/astromart-01.png?jsx";
import KobrazaThumb from "~/media/images/projects/kobraza-01.avif?jsx";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-nutrition-01.png?jsx";
import KdsThumb from "~/media/images/projects/kds-01.png?jsx";


export default component$(() => {
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
    if (!aside) return;

    animate(
      aside,
      { scale: [null, prefersReducedMotion.value ? 1 : 1.1] },
      { easing: spring({ mass: 5, stiffness: 200, damping: 150 }) },
    );

    const images = aside.querySelectorAll("*");

    const springConfig = {
      mass: 5,
      stiffness: 200,
      damping: 150,
    };

    images.forEach((image, i) => {
      const speedMultiplier = Number((image as HTMLElement).dataset.speed) || 1;
      // Only animate the images if the user has not requested reduced motion.
      const speed = 350 * (speedMultiplier * Number(!prefersReducedMotion.value));
      const xpos = i >= 2 ? ["100%", 0] : ["-100%", 0];

      animate(
        image,
        { x: prefersReducedMotion.value ? [] : xpos, opacity: [0, 1] },
        { delay: i * 0.2, easing: spring(springConfig) },
      );
      const animationParams = { y: [null, `-${speed}%`] };
      scroll(
        animate(image, animationParams, {
          easing: spring({
            mass: 75,
            stiffness: 30,
            damping: 15,
          }),
          delay: 0,
        }),
      );
    });
  });

  // We want this to run only once it is visible, and eagerly, on the client. So we use `useVisibleTask$`.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const speed = 230 * Number(!prefersReducedMotion.value);
    const animationParams = { y: [null, `-${speed}%`] };

    scroll(
      animate("#hero-content", animationParams, {
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
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const aside = asideRef.value;
      if (!aside) return;

      const mousePosition = { x: event.clientX, y: event.clientY };

      animate(
        aside,
        {
          transformOrigin: "center",
          x: mousePosition.x / 100,
          y: mousePosition.y / 100,
        },
        { easing: spring({ mass: 40, stiffness: 200, damping: 300 }) },
      );
    }),
  );

  return (
    <section
      id="hero"
      class="full-width pointer-events-none relative flex h-fit flex-col bg-zinc-950 py-24 text-zinc-300"
    >
      <aside
        ref={asideRef}
        class="full-width pointer-events-none absolute inset-0 mb-12 -translate-y-12 overflow-x-clip"
      >
        {/* Top */}
        <KobrazaThumb
          data-speed={2.5}
          alt={$localize`Website for Kobraza Imóveis. Kobraza Imóveis is a real estate agency that has operated for over 30 years in the market, with a wide range of properties, including commercial properties, such as warehouses, gas stations and warehouses; residential properties such as houses, apartments and lofts; and rural properties, such as farms and farms.`}
          class="absolute -left-24 -top-2 aspect-video w-[clamp(238px,50%,572px)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <KdsThumb
          data-speed={2.2}
          class="absolute -right-24 -top-4 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl object-cover"
        />

        {/* Bottom */}
        <LeonardoNutritionThumb
          alt={$localize`CMS Integration and Testimonials with social login for Leonardo Nutrition, a nutritionist and dietitian in Brazil.`}
          data-speed={1}
          class="absolute -bottom-8 -right-36 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <AstromartThumb
          alt={$localize`Worked on Astromart: a performant e-commerce template for Astro, React, TypeScript and Odoo developers`}
          data-speed={1.2}
          class="absolute -bottom-4 -left-36 aspect-video w-[clamp(238px,40%,572px)] rounded-3xl bg-zinc-900 opacity-0 shadow-2xl"
        />
      </aside>

      <div id="hero-content" class="my-auto py-24 md:py-36">
        <Logo id="hero-logo" shouldFollowCursor shouldBlink class="mx-auto text-2xl text-white" />

        <h1
          class="z-10 max-w-full text-center text-4xl leading-[53px] tracking-tighter text-zinc-200 md:mt-12 md:text-7xl md:leading-[96px]"
          dangerouslySetInnerHTML={$localize`Abner Rodrigues <br />Creat<span class="italic">i</span>ve Developer`}
        />

        <h2 class="mx-auto mt-10 max-w-[524px] text-center text-xl leading-7">
          {$localize`Web Developer extraordinaire, crafting super cool solutions with style \u{1F60E}`}
        </h2>

        <div
          aria-labelledby="scroll"
          class="group mx-auto mt-20 flex h-fit w-fit gap-4 rounded-full bg-zinc-900/10 p-9"
        >
          <IconArrowDown />
          <span id="scroll" class="sr-only text-zinc-200">
            {$localize`Scroll down to see more.`}
          </span>
        </div>
      </div>
    </section>
  );
});

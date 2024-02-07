/* eslint-disable qwik/no-use-visible-task */
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate, scroll, spring, stagger, timeline } from "motion";
import { inlineTranslate } from "qwik-speak";
import SplitType from "split-type";

import Logo from "~/components/logo/logo";
import { useGetUserPreferences } from "~/context/user-preferences";
import IconArrowDown from "~/media/icons/arrow/down.svg?jsx";
import AstromartThumb from "~/media/images/projects/astromart-01.png?jsx";
import KdsThumb from "~/media/images/projects/kds-01.png?jsx";
import KobrazaThumb from "~/media/images/projects/kobraza-01.avif?jsx";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-nutrition-01.png?jsx";

export default component$(() => {
  const t = inlineTranslate();

  const asideRef = useSignal<HTMLDivElement>();
  const userPreferences = useGetUserPreferences();

  useVisibleTask$(() => {
    if (userPreferences.reducedMotion) return;

    SplitType.create("#hero-title", {
      types: "chars",
      tagName: "span",
      charClass: "split-target__char",
    });
    SplitType.create("#hero-subtitle", {
      types: "words",
      tagName: "span",
      wordClass: "split-target__word",
    });

    timeline([
      ["#hero-title", { opacity: 1, y: 0 }],
      ["#hero-subtitle", { opacity: 1, y: 0 }],
      [
        "#hero-title > span",
        { opacity: [0, 1], rotateX: [-50, 0], y: [20, 0] },
        { delay: stagger(0.02) },
      ],
      [
        "#hero-subtitle > span",
        { opacity: [0, 1], rotateX: [-50, 0], y: [20, 0] },
        { delay: stagger(0.03), at: "-0.5" },
      ],
      [
        "#hero .hero-image",
        { x: ["40%", 0], opacity: 1 },
        {
          delay: stagger(0.2),
          easing: spring({ damping: 50, stiffness: 100, mass: 10 }),
          at: "-0.5",
        },
      ],
      ["#hero-scroll", { opacity: 1, y: 0 }, { at: "-0.1" }],
    ]);
  });

  useVisibleTask$(() => {
    if (userPreferences.reducedMotion) return;
    scroll(
      animate(".hero-image", { y: [null, "-1000%"] }, { easing: spring() }),
    );
  });

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
          class="hero-image absolute -left-24 top-2 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <KdsThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.kds_wahalla.description")}
          class="hero-image absolute -right-24 -top-8 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />

        {/* Bottom */}
        <KobrazaThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.leonardo_nutrition.description")}
          class="hero-image absolute -bottom-16 -right-36 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl @md/hero:-bottom-40"
        />
        <LeonardoNutritionThumb
          loading="eager"
          decoding="sync"
          alt={t("projects.astromart.description")}
          class="hero-image absolute -bottom-12 -left-32 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl @md/hero:-bottom-32 md:-left-24 lg:-left-8"
        />
      </aside>

      <div
        id="hero-content"
        style={{ perspective: "1000px" }}
        class="my-auto py-24 @2xl/hero:py-36"
      >
        <Logo
          shouldBlink
          shouldFollowCursor
          id="hero-logo"
          class="mx-auto animate-fade-in text-2xl text-white"
        />

        <h1
          style={{ perspective: "1000px" }}
          id="hero-title"
          class="split-target z-10 mt-12 text-balance text-center text-5xl leading-normal tracking-tighter text-zinc-200 opacity-0 @md:text-6xl @md:leading-[1.2] @2xl/hero:text-7xl @2xl/hero:leading-normal"
          dangerouslySetInnerHTML={t("home.hero.title")}
        />

        <h2
          style={{ perspective: "1000px" }}
          id="hero-subtitle"
          class="split-target mx-auto mt-10 max-w-[524px] text-balance text-center text-xl leading-7 opacity-0"
        >
          {t("home.hero.subtitle")}
        </h2>

        <div
          id="hero-scroll"
          aria-labelledby="scroll"
          class="group mx-auto mt-20 flex h-fit w-fit animate-fade-in gap-4 rounded-full bg-zinc-900/10 p-9 opacity-0"
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

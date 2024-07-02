 
import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
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

  useStyles$(/* css*/ `
    @supports (animation-timeline: scroll()) {
      .split-target__char, .split-target__word, #hero-scroll {
        animation-name: charFade, charFade;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out;
        animation-direction: normal, reverse;
        animation-timeline: view();
        animation-range: entry 0% entry 150%, exit -200% exit 2%;
        animation-delay: calc(0.01s * var(--index));
      }
    } 
    
    @keyframes charFade { 0% { opacity: 0 } }
  `);

  useVisibleTask$(() => {
    if (userPreferences.reducedMotion) return;

    const heroText = SplitType.create("#hero-title", {
      types: "chars",
      tagName: "span",
      charClass: "split-target__char",
    });
    const subtitleText = SplitType.create("#hero-subtitle", {
      types: "words",
      tagName: "span",
      wordClass: "split-target__word",
    });

    if (heroText.chars) {
      for (const [index, char] of heroText.chars.entries()) {
        char.style.setProperty("--index", `${index + 1}`);
      }
    }

    if (subtitleText.words) {
      for (const [index, word] of subtitleText.words.entries()) {
        word.style.setProperty("--index", `${index + 1}`);
      }
    }

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
      ["#hero-scroll", { opacity: [0, 1], y: [10, 0] }, { at: "-0.1" }],
    ]);
  });

  useVisibleTask$(() => {
    if (userPreferences.reducedMotion) return;

    scroll(
      animate(
        "#hero-content",
        { y: [null, 50] },
        { easing: spring({ damping: 5 }) },
      ),
    );

    const images =
      asideRef.value?.querySelectorAll<HTMLImageElement>(".hero-image");
    if (!images) return;

    for (const image of images) {
      const multiplier = Number(image.dataset.parallax) || 1;
      const ONE_OR_NEGATIVE_ONE = Math.random() > 0.5 ? 1 : -1;
      const zRotation = (100 * ONE_OR_NEGATIVE_ONE) / multiplier;

      scroll(
        animate(
          image,
          { y: [null, -4_000], rotateZ: [null, zRotation] },
          {
            duration: 1_000,
            easing: spring({
              damping: 50,
              stiffness: 100,
              mass: 10 * multiplier,
            }),
          },
        ),
      );
    }
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
          data-parallax="0.95"
          loading="eager"
          decoding="sync"
          alt={t("projects.kobraza_imoveis.description")}
          class="hero-image pointer-events-none absolute -left-24 top-2 z-10 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />
        <KdsThumb
          data-parallax="0.8"
          loading="eager"
          decoding="sync"
          alt={t("projects.kds_wahalla.description")}
          style={{ scale: 1.25 }}
          class="hero-image pointer-events-none absolute -right-24 -top-8 z-10 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl"
        />

        {/* Bottom */}
        <KobrazaThumb
          data-parallax="1.8"
          loading="eager"
          decoding="sync"
          alt={t("projects.leonardo_nutrition.description")}
          class="hero-image pointer-events-none absolute -bottom-16 -right-36 z-10 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl @md/hero:-bottom-40"
        />
        <LeonardoNutritionThumb
          data-parallax="0.85"
          loading="eager"
          decoding="sync"
          alt={t("projects.astromart.description")}
          style={{ scale: 1.1 }}
          class="hero-image pointer-events-none absolute -bottom-16 z-10 aspect-[5/3] w-[clamp(15.625rem,7.1023rem+42.6136vw,34.375rem)] rounded-3xl bg-zinc-900 object-cover opacity-0 shadow-2xl @md/hero:-bottom-32 md:-left-24 lg:-left-8"
        />
      </aside>

      <div id="hero-content" class="my-auto py-24 @2xl/hero:py-36">
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

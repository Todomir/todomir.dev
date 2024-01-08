import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import ImgMe from "~/media/images/me.jpg?jsx";

export default component$(() => {
  const t = inlineTranslate();
  return (
    <section
      id="about"
      class="full-width bg-zinc-950 px-5 py-20 text-zinc-300 md:px-16 md:py-60"
    >
      <div class="flex flex-col gap-8 md:gap-20 lg:flex-row">
        <ImgMe
          id="img-me"
          alt={t("home.about.meImageAlt")}
          class="ml-0 mt-10 max-h-[600px] w-full grow overflow-hidden rounded-lg object-cover object-center"
        />
        <header class="my-auto flex max-w-full flex-col gap-4">
          <h2
            class="text-3xl font-medium leading-10 tracking-tighter text-zinc-200 sm:text-[3rem]"
            dangerouslySetInnerHTML={t("home.about.title")}
          />
          <h3
            class="max-w-full text-xl leading-6 tracking-tight text-zinc-500 sm:leading-8"
            dangerouslySetInnerHTML={t("home.about.subtitle")}
          />
          <p class="mt-12 max-w-full text-base leading-6 tracking-normal text-gray-200">
            {t("home.about.presentation")}
          </p>
          <p class="leading-6 tracking-normal text-gray-200">
            {t("home.about.description")}
          </p>
          <a
            href="mailto:abnerluis1001@gmail.com"
            target="_blank"
            rel="noreferrer"
            class="mt-12 max-w-full cursor-pointer whitespace-nowrap text-xl leading-8 tracking-tight text-zinc-500 underline md:text-2xl"
          >
            abnerluis1001@gmail.com
          </a>
        </header>
      </div>
    </section>
  );
});

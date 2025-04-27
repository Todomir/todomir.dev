import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import { SOCIAL_LINKS } from "~/utils/constants";

import ChangeLocale from "../change-locale/change-locale";
import Logo from "../logo/logo";

export default component$(() => {
  const t = inlineTranslate();
  return (
    <footer
      id="footer"
      class="content-grid footer @md/footer/footer:px-20 @container/footer flex w-full flex-col bg-zinc-950 px-5 py-12 text-zinc-300"
    >
      <div class="breakout">
        <Logo />
        <div class="mt-8 flex max-w-full flex-wrap items-stretch justify-between gap-3 self-stretch">
          <p class="max-w-2xl shrink grow basis-auto text-sm leading-5 tracking-normal text-balance text-zinc-500">
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
        <hr class="mt-10 h-px max-w-full shrink-0 self-stretch border-zinc-900" />
        <ul class="mt-8 mb-3 flex max-w-full flex-wrap justify-center gap-5 @md/footer:justify-start">
          {SOCIAL_LINKS.map((link) => (
            <li key={`social-link-${link.label}-${link.url}`}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                class="ease-spring-2 text-sm leading-5 tracking-normal text-zinc-500 underline underline-offset-2 transition-all hover:font-semibold hover:text-zinc-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <hr class="mt-10 h-px max-w-full shrink-0 self-stretch border-zinc-900" />
        <ChangeLocale />
      </div>
    </footer>
  );
});

import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  defaultLocale: {
    lang: "en",
    currency: "USD",
    timeZone: "America/Los_Angeles",
  },
  supportedLocales: [
    {
      lang: "pt-BR",
      currency: "BRL",
      timeZone: "America/Sao_Paulo",
    },
    {
      lang: "en",
      currency: "USD",
      timeZone: "America/Los_Angeles",
    },
  ],
  // Translations available in the whole app
  assets: ["app", "home", "projects", "site"],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: ["runtime"],
};

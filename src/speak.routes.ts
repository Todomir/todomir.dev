import type { RewriteRouteOption } from "qwik-speak";

/** Translation paths */
export const rewriteRoutes: RewriteRouteOption[] = [
  // No prefix/paths for default locale
  {
    prefix: "pt-BR",
    paths: {
      "building-fast-website-with-qwik": "construindo-website-rapido-com-qwik",
    },
  },
];

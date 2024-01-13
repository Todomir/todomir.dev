import harmonyPalette from "@evilmartians/harmony/tailwind";
import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: harmonyPalette,
    extend: {
      transitionTimingFunction: {
        "spring-1": "var(--ease-spring-1)",
        "spring-2": "var(--ease-spring-2)",
        "spring-3": "var(--ease-spring-3)",
        "spring-4": "var(--ease-spring-4)",
        "spring-5": "var(--ease-spring-5)",
      },
      fontFamily: {
        sans: ["Haskoy"],
      },
    },
  },
  plugins: [typography, containerQueries],
};

module.exports = config;

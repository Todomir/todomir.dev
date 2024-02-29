import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikSpeakInline } from "qwik-speak/inline";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { z } from "zod";

import mdxCollections from "./plugins/collections";
import { rewriteRoutes } from "./src/speak.routes";

export default defineConfig(() => {
  return {
    plugins: [
      mdxCollections({
        collections: [
          {
            name: "content",
            glob: "./src/content/**/**/*.mdx",
            schema: z.object({
              date: z.coerce.date(),
              tags: z.array(z.string()).default([]),
              title: z.string(),
              description: z.string(),
              thumbnail: z.object({
                alt: z.string(),
                src: z.string(),
              }),
              permalink: z.string(),
              lang: z.string(),
            }),
          },
        ],
      }),
      qwikCity({ rewriteRoutes }),
      qwikVite(),
      qwikSpeakInline({
        supportedLangs: ["en", "pt-BR"],
        defaultLang: "en",
        assetsPath: "i18n",
      }),
      tsconfigPaths(),
    ],
    dev: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

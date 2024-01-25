/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Highlighter } from "shikiji";

import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { FontaineTransform } from "fontaine";
import { qwikSpeakInline } from "qwik-speak/inline";
import rehypePrettyCode from "rehype-pretty-code";
import { getHighlighter } from "shikiji";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { z } from "zod";

import mdxCollections from "./plugins/collections";
import { rewriteRoutes } from "./src/speak.routes";

const fontaineOptions = {
  fallbacks: [
    "Inter",
    "Roboto",
    "Helvetica Neue",
    "Arial Nova",
    "Nimbus Sans",
    "Arial",
  ],
  // You may need to resolve assets like `/fonts/Roboto.woff2` to a particular directory
  resolvePath: (id: string) => {
    const path = new URL(`.${id}`, import.meta.url).pathname;
    console.log(path);
    return path;
  },
};

let highlighter: Highlighter;
async function getOrCreateHighlighter() {
  if (highlighter) return highlighter;
  highlighter = await getHighlighter({ themes: ["vitesse-dark"] });
  return highlighter;
}

export default defineConfig(() => {
  return {
    plugins: [
      mdxCollections({
        collections: [
          {
            name: "content",
            glob: "./src/content/**/**/post.mdx",
            schema: z.object({
              date: z.coerce.date(),
              draft: z.boolean().default(false),
              tags: z.array(z.string()).default([]),
              title: z.string(),
              description: z.string(),
              thumbnailAlt: z.string(),
              permalink: z.string(),
              lang: z.string(),
            }),
          },
        ],
      }),
      qwikCity({
        rewriteRoutes,
        mdxPlugins: {
          rehypeAutolinkHeadings: true,
          rehypeSyntaxHighlight: false,
          remarkGfm: true,
        },
        mdx: {
          rehypePlugins: [
            [
              () => rehypePrettyCode({ theme: "vitesse-dark" }) as any,
              {
                getHighlighter: getOrCreateHighlighter,
                onVisitLine(node: any) {
                  // Prevent lines from collapsing in `display: grid` mode, and allow empty
                  // lines to be copy/pasted
                  if (node.children.length === 0) {
                    node.children = [{ type: "text", value: " " }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  // Each line node by default has `class="line"`.
                  if (node.properties.className) {
                    node.properties.className.push("line--highlighted");
                  }
                },
                onVisitHighlightedWord(node: any) {
                  if (node.properties.className) {
                    node.properties.className = ["word--highlighted"];
                  }
                },
              },
            ],
          ],
        },
      }),
      qwikVite(),
      qwikSpeakInline({
        supportedLangs: ["en", "pt-BR"],
        defaultLang: "en",
        assetsPath: "i18n",
      }),
      FontaineTransform.vite(fontaineOptions),
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

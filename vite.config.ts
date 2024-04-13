import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikSpeakInline } from "qwik-speak/inline";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { z } from "zod";

import mdxCollections from "./plugins/collections";
import { rewriteRoutes } from "./src/speak.routes";

export default defineConfig(async () => {
  const { default: rehypePrettyCode } = await import("rehype-pretty-code");
  const { visit } = await import("unist-util-visit");

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
      qwikCity({
        rewriteRoutes,
        mdxPlugins: {
          rehypeSyntaxHighlight: false,
          remarkGfm: true,
          rehypeAutolinkHeadings: true,
        },
        mdx: {
          rehypePlugins: [
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === "element" && node?.tagName === "pre") {
                  const [codeEl] = node.children;
                  if (codeEl.tagName !== "code") {
                    return;
                  }
                  node.__rawString__ = codeEl.children?.[0].value;
                }
              });
            },
            [
              rehypePrettyCode,
              {
                theme: "poimandres",
              },
            ],
            () => (tree) => {
              visit(tree, (node) => {
                if (node?.type === "element" && node?.tagName === "figure") {
                  if (!("data-rehype-pretty-code-figure" in node.properties)) {
                    return;
                  }
                  const preElement = node.children.at(-1);
                  if (preElement.tagName !== "pre") {
                    return;
                  }
                  preElement.properties["__rawString__"] = node.__rawString__;
                }
              });
            },
          ],
        },
      }),
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
    ssr: {
      external: ["node:async_hooks"],
    },
  };
});

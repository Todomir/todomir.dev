import type { Highlighter } from "shikiji";

import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { FontaineTransform } from "fontaine";
import { qwikSpeakInline } from "qwik-speak/inline";
import rehypePrettyCode from "rehype-pretty-code";
import { getHighlighter } from "shikiji";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const fontaineOptions = {
  fallbacks: [
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
  ],
  resolvePath: (fontSrc: string) =>
    new URL(`./public/fonts${fontSrc}`, import.meta.url),
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
      FontaineTransform.vite(fontaineOptions),
      qwikCity({
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

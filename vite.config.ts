import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getHighlighter, type Highlighter } from "shikiji";
import rehypePrettyCode from "rehype-pretty-code";

let highlighter: Highlighter;
async function getOrCreateHighlighter() {
  if (highlighter) return highlighter;
  highlighter = await getHighlighter({ themes: ["vitesse-dark"] });
  return highlighter;
}

export default defineConfig(() => {
  return {
    plugins: [
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

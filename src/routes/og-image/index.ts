import type { RequestHandler } from "@builder.io/qwik-city";

import { fetchFont, html, ImageResponse } from "og-img";

export const onGet: RequestHandler = async ({ send, url, cacheControl }) => {
  // Disable caching
  cacheControl("no-cache");

  // Get data from search params
  const title = url.searchParams.get("title");
  const description = url.searchParams.get("description");
  const permalink = url.searchParams.get("permalink");

  send(
    new ImageResponse(
      // Use Tailwind CSS or style attribute
      html`
        <div
          style="font-family: Haskoy; display: flex;"
          tw="text-4xl bg-black flex flex-col text-white w-full h-full"
        >
          <div
            style="font-family: Haskoy; display: flex;"
            tw="flex flex-col pl-16 pt-16"
          >
            <div
              style="font-family: Haskoy; display: flex;"
              tw="text-2xl max-w-1/2 text-white font-black text-zinc-50 rounded-md tracking-wide"
            >
              [•• todomir.dev
            </div>
            <div
              style="font-family: Haskoy; display: flex;"
              tw="text-xl max-w-1/2 text-white font-black text-zinc-300 rounded-md tracking-wide"
            >
              ${permalink}
            </div>
          </div>

          <div
            style="font-family: Haskoy; display: flex;"
            tw="flex flex-col pl-16 pb-16 mt-8"
          >
            <div
              style="font-family: Haskoy; display: flex;"
              tw="text-5xl font-black mb-6 leading-none max-w-1/2 text-white"
            >
              ${title}
            </div>
            <div
              style="font-family: Haskoy; display: flex;"
              tw="text-xl max-w-1/2 text-white tracking-wide"
            >
              ${description}
            </div>
          </div>
        </div>
      `,
      {
        width: 1_200,
        height: 600,
        fonts: [
          {
            name: "Haskoy",
            // Use `fs` (Node.js only) or `fetch` to read font file
            data: await fetchFont(`${url.origin}/fonts/static/haskoy-400.ttf`),
            weight: 400,
            style: "normal",
          },
          {
            name: "Haskoy",
            data: await fetchFont(`${url.origin}/fonts/static/haskoy-900.ttf`),
            weight: 900,
            style: "normal",
          },
        ],
      },
    ),
  );
};

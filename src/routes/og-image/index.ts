import type { RequestHandler } from "@builder.io/qwik-city";

import { ImageResponse } from '@vercel/og';
import { html } from 'satori-html';

async function fetchFont(url: string) {
  const response = await fetch(url);
  return response.arrayBuffer();
}

export const onGet: RequestHandler = async ({ send, url }) => {
  // Get data from search params
  const title = url.searchParams.get("title");
  const description = url.searchParams.get("description");
  const permalink = url.searchParams.get("permalink");

  send(
    new ImageResponse(
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
              tw="text-2xl max-w-1/2 text-white font-bold text-zinc-50 rounded-md tracking-wide"
            >
              [•• abn.ooo
            </div>
            <div
              style="font-family: Haskoy; display: flex;"
              tw="text-xl max-w-1/2 text-white font-bold text-zinc-300 rounded-md tracking-wide"
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
              tw="text-5xl font-bold mb-6 leading-none max-w-1/2 text-white"
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
      ` as any,
      {
        width: 1_200,
        height: 600,
        fonts: [
          {
            name: "Haskoy",
            data: await fetchFont(
              "https://fonts.bunny.net/css?family=cabin:400",
            ),
            weight: 400,
            style: "normal",
          },
          {
            name: "Haskoy",
            data: await fetchFont(
              "https://fonts.bunny.net/css?family=cabin:700",
            ),
            weight: 700,
            style: "normal",
          },
        ],
      },
    ),
  );
};

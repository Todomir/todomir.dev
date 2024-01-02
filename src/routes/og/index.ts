import type { RequestHandler } from "@builder.io/qwik-city";
import { Resvg } from "@resvg/resvg-js";
import type { SatoriOptions } from "satori";
import satori from "satori";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// Load the font from the "public" directory
const getFont = (baseUrl: string) =>
  fetch(new URL("fonts/Haskoy-static.otf", baseUrl)).then((res) => res.arrayBuffer());

type OGImageOptions = {
  title?: string;
  thumbnail?: string;
  origin: string;
};

const createOGImage = async (options: OGImageOptions) => {
  const fontSansData = await getFont(options.origin);

  const satoriOptions: SatoriOptions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: "Haskoy",
        data: fontSansData,
        style: "normal",
        weight: 400,
      },
    ],
  };

  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          {
            type: "div",
            props: {
              children: options.title,
              style: { color: "black", fontSize: 64, fontWeight: 400 },
            },
          },
        ],
        style: {
          color: "black",
          display: "flex",
          alignItems: "flex-end",
          padding: 32,
          width: "100%",
          height: "100%",
          fontFamily: "Haskoy",
          fontSize: 32,
        },
      },
    },
    satoriOptions,
  );

  // Convert the SVG to PNG with "resvg"
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
};

export const onGet: RequestHandler = async ({ query, send, url }) => {
  const title = query.get("title") || "Abner Rodrigues - Creative Developer";
  const thumbnail = query.get("thumbnail") || "";
  const image = await createOGImage({ title, origin: url.origin, thumbnail });

  send(200, image);
};

export const EMOJIS = [
  "\u{1F4BB}", // Laptop
  "\u{1F4F1}", // Mobile phone
  "\u{1F4A1}", // Light bulb (representing ideas)
  "\u{1F680}", // Rocket (often used for startups or launches)
  "\u{1F4BE}", // Floppy disk (nostalgic tech)
  "\u{2328}", // Keyboard
  "\u{1F50C}", // Power plug
  "\u{1F4BD}", // Computer disk
  "\u{1F4C8}", // Chart increasing (representing analytics or growth)
  "\u{260E}", // Telephone (old style)
];

export const ONE_MINUTE_IN_SECONDS = 60;
export const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
export const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;

export const BLOG_POST_THUMBNAIL_LIST = import.meta.glob<OutputMetadata[]>(
  "/src/content/**/**/thumbnail.png",
  {
    eager: true,
    import: "default",
    query: {
      w: "200;400;600;800;1200",
      format: "avif;webp;jpg",
      as: "metadata",
    },
  },
);

export const BLOG_POST_OG_IMAGE_LIST = import.meta.glob(
  "/src/content/**/**/og.png",
  {
    eager: true,
    import: "default",
    as: "url",
  },
);

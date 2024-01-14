/* eslint-disable qwik/loader-location */
import { routeLoader$ } from "@builder.io/qwik-city";
import { collections } from "virtual:mdx-collection";

import { config } from "~/speak.config";
import { getBlogPostThumbnailSoure, getLang } from "~/utils/functions";

export const getCollectionEntry = (locale: string, slug: string) => {
  const collection = collections.content;
  const entry = collection.find((element) => element.slug === slug);

  if (!entry) {
    throw new Error(`No entry found for slug: ${slug}`);
  }

  const thumbnail = getBlogPostThumbnailSoure({ slug, locale });

  // Extract thumbnailAlt from entry.data
  const { thumbnailAlt, ...data } = entry.data;

  return {
    ...data,
    slug: entry.slug,
    thumbnail: {
      src: thumbnail,
      alt: thumbnailAlt,
    },
  };
};

export type BlogPostCollectionEntry = ReturnType<typeof getCollectionEntry>;

export const getCollectionList = (locale: string) => {
  try {
    const posts = collections.content
      .filter((entry) => entry.data.lang === locale)
      .map((entry) => {
        const thumbnail = getBlogPostThumbnailSoure({
          slug: entry.slug,
          locale: entry.data.lang ?? config.defaultLocale.lang,
        });

        // Extract thumbnailAlt from entry.data
        const { thumbnailAlt, ...data } = entry.data;

        return {
          ...data,
          slug: entry.slug,
          thumbnail: {
            src: thumbnail,
            alt: thumbnailAlt,
          },
        };
      });

    if (!posts.length) {
      throw new Error(`No posts found for locale: ${locale}`);
    }

    return posts;
  } catch (error) {
    throw new Error("Error getting collection list", { cause: error });
  }
};

export const useBlogPosts = routeLoader$(async ({ params, error }) => {
  const { lang: userLang } = params;
  try {
    const lang = getLang(userLang);
    const posts = getCollectionList(lang);

    return posts;
  } catch {
    throw error(404, "Posts not found");
  }
});

export const useBlogPost = routeLoader$(async ({ params, error }) => {
  const { lang: userLang, slug } = params;

  try {
    const lang = getLang(userLang);
    const post = getCollectionEntry(lang, slug);

    return post;
  } catch {
    throw error(404, "Post not found");
  }
});

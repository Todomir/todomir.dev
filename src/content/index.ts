/* eslint-disable qwik/loader-location */
import { routeLoader$ } from "@builder.io/qwik-city";
import { collections } from "virtual:mdx-collection";

import { getBlogPostThumbnailSoure, getLang } from "~/utils/functions";

export type BlogPostCollectionEntry = Omit<
  Collections["content"][number]["data"],
  "thumbnailAlt"
> & {
  slug: string;
  thumbnail: {
    alt: string;
    src: string;
  };
};

export const getCollectionEntry = (locale: string, slug: string) => {
  const collection = collections.content;
  const entry = collection.find((entry_) => entry_.slug === slug);

  if (!entry) return null;

  const thumbnail = getBlogPostThumbnailSoure({ slug: entry.slug, locale });

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

export const getCollectionList = (locale: string) => {
  const collection = collections.content;
  const list = collection
    .filter((entry) => entry.data.lang === locale)
    .map((entry) => {
      const thumbnail = getBlogPostThumbnailSoure({ slug: entry.slug, locale });

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

  return list;
};

export const useBlogPosts = routeLoader$(async ({ locale, error }) => {
  const userLang = locale();
  try {
    const lang = getLang(userLang);
    const posts = getCollectionList(lang);

    return posts;
  } catch {
    throw error(404, "Posts not found");
  }
});

export const useBlogPost = routeLoader$(async ({ params, locale, error }) => {
  const userLang = locale();

  try {
    const lang = getLang(userLang);
    const post = getCollectionEntry(lang, params.slug);
    if (!post) throw error(404, `Post ${params.slug} not found`);

    return post;
  } catch (error_) {
    if (error_ instanceof Error) {
      throw error(500, `Error loading post ${params.slug}: ${error_.message}`);
    } else {
      throw error(500, "Error loading post");
    }
  }
});

 
import { routeLoader$ } from "@builder.io/qwik-city";
import { collections } from "virtual:mdx-collection";

import { getLang } from "~/utils/functions";

export type BlogPostCollectionEntry = Collections["content"][number];

export const getCollectionEntry = (slug: string) => {
  const collection = collections.content;
  const entry = collection.find((entry_) => entry_.slug === slug);

  if (!entry) return null;

  return entry;
};

export const getCollectionList = (locale: string) => {
  const collection = collections.content;
  const list = collection.filter((entry) => entry.data.lang === locale);

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

export const useBlogPost = routeLoader$(async ({ params, error }) => {
  try {
    const post = getCollectionEntry(params.slug);
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

import { defineCollection, defineConfig } from "@content-collections/core";

const posts = defineCollection({
  name: "posts",
  directory: "src/content",
  include: "**/*.mdx",
  schema: (z) => ({
    id: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]).optional(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.object({
      alt: z.string(),
      src: z.string(),
    }),
    permalink: z.string(),
    lang: z.string(),
  }),
});

export default defineConfig({
  collections: [posts],
});

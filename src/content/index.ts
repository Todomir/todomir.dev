import type { Output } from "valibot";
import { array, boolean, object, parse, string, transform } from "valibot";
import { isDev } from "@builder.io/qwik/build";
import type { DocumentHeadValue } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { JSXNode } from "@builder.io/qwik";
import { validateLocale } from "qwik-speak";
import { config } from "~/speak.config";

export const BLOG_POST_LIST = import.meta.glob("/src/content/**/**/post.mdx", {
  eager: !isDev,
});
export const BLOG_POST_THUMBNAIL_LIST = import.meta.glob(
  "/src/content/**/**/thumbnail.png",
  {
    eager: true,
    import: "default",
    query: { w: "200;400;600;800;1200", format: "avif;webp;jpg", as: "url" },
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

const FRONTMATTER_SCHEMA = transform(
  object({
    title: string(),
    description: string(),
    createdAt: string(),
    updatedAt: string(),
    draft: boolean(),
    tags: array(string()),
    thumbnail: object({
      src: string(),
      alt: string(),
    }),
  }),
  (frontmatter) => {
    return {
      ...frontmatter,
      createdAt: new Date(frontmatter.createdAt),
      updatedAt: new Date(frontmatter.updatedAt),
    };
  },
);

export type PostFrontmatter = Output<typeof FRONTMATTER_SCHEMA>;
export type PostModule = {
  headings: Array<{
    text: string;
    id: string;
    level: number;
  }>;
  head: DocumentHeadValue;
  frontmatter: PostFrontmatter;
  default: () => JSXNode & { props: { children: JSXNode<() => JSXNode> } };
};

// eslint-disable-next-line qwik/loader-location
export const usePosts = routeLoader$(async ({ params, error }) => {
  let lang: string | undefined = undefined;

  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    lang = config.supportedLocales.find((value) => value.lang === params.lang)
      ?.lang;
    // 404 error page
    if (!lang) throw error(404, "Page not found");
  } else {
    lang = config.defaultLocale.lang;
  }

  const path = `/src/content/${lang}`;

  // Filter posts that start with the path
  const postPromises = Object.keys(BLOG_POST_LIST)
    .filter((key) => key.startsWith(path))
    .map(async (key) => {
      const promise = isDev ? BLOG_POST_LIST[key]() : BLOG_POST_LIST[key];
      const mod = (await promise) as PostModule;
      const frontmatter = parse(FRONTMATTER_SCHEMA, mod.frontmatter);
      return {
        lang: lang as string,
        slug: key.slice(path.length + 1, -"/post.mdx".length),
        frontmatter,
      };
    });
  const posts = await Promise.all(postPromises);
  return posts;
});

// eslint-disable-next-line qwik/loader-location
export const usePost = routeLoader$(async ({ params, error }) => {
  const { slug } = params;
  let lang: string | undefined = undefined;

  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    lang = config.supportedLocales.find((value) => value.lang === params.lang)
      ?.lang;
    // 404 error page
    if (!lang) throw error(404, "Page not found");
  } else {
    lang = config.defaultLocale.lang;
  }

  const path = `/src/content/${lang}/${slug}/post.mdx`;

  if (!Object.keys(BLOG_POST_LIST).includes(path))
    throw error(404, "Page not found");

  const promise = isDev ? BLOG_POST_LIST[path]() : BLOG_POST_LIST[path];
  const mod = (await promise) as PostModule;
  const frontmatter = parse(FRONTMATTER_SCHEMA, mod.frontmatter);
  return {
    lang,
    slug,
    ...mod,
    frontmatter,
    default: mod.default().props.children.type(),
  };
});

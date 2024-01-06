import type { JSXNode } from "@builder.io/qwik";
import { server$, type DocumentHeadValue } from "@builder.io/qwik-city";
import type { Output } from "valibot";
import { array, boolean, number, object, optional, safeParse, string, transform } from "valibot";
import { isDev } from "@builder.io/qwik/build";

const BLOG_POST_LIST = import.meta.glob("/src/content/**/**/post.mdx", { eager: !isDev });
const BLOG_OG_IMAGE_LIST = import.meta.glob("/src/content/**/**/og.png", {
  eager: !isDev,
  import: "default",
});
const BLOG_THUMBNAIL_LIST = import.meta.glob("/src/content/**/**/thumbnail.png", {
  eager: !isDev,
  import: "default",
});

const FRONTMATTER_SCHEMA = transform(
  object({
    title: string(),
    description: string(),
    createdAt: string(),
    updatedAt: string(),
    thumbnail: object({
      src: string(),
      alt: string(),
      width: optional(number()),
      height: optional(number()),
    }),
    draft: boolean(),
    tags: array(string()),
  }),
  (frontmatter) => {
    return {
      ...frontmatter,
      createdAt: new Date(frontmatter.createdAt),
      updatedAt: new Date(frontmatter.updatedAt),
    };
  },
);

export type Frontmatter = Output<typeof FRONTMATTER_SCHEMA>;

type Headings = {
  text: string;
  id: string;
  level: number;
};

export type Post = {
  headings: Headings[];
  head: DocumentHeadValue;
  frontmatter: Frontmatter;
  default: () => JSXNode & { props: { children: JSXNode<() => JSXNode> } };
};

export const getPostBySlug = server$(async (slug: string, locale: string, origin: string) => {
  const path = `/src/content/${locale}/${slug}/post.mdx`;

  try {
    const getPost = isDev ? BLOG_POST_LIST[path]() : BLOG_POST_LIST[path];
    const resource = (await getPost) as Post;
    const result = safeParse(FRONTMATTER_SCHEMA, resource.frontmatter);

    if (!result.success) {
      throw new Error(`Invalid frontmatter for slug ${slug}`, { cause: result.issues });
    }

    const ogImagePath = `/src/content/${locale}/${slug}/og.png`;
    const getOgImage = isDev ? BLOG_OG_IMAGE_LIST[ogImagePath]() : BLOG_OG_IMAGE_LIST[ogImagePath];
    const ogImage = (await getOgImage) as string;

    const thumbnailPath = `/src/content/${locale}/${slug}/thumbnail.png`;
    const getThumbnail = isDev ? BLOG_THUMBNAIL_LIST[thumbnailPath]() : BLOG_THUMBNAIL_LIST[thumbnailPath];
    const thumbnail = (await getThumbnail) as string;

    const post = {
      slug,
      frontmatter: {
        ...result.output,
        thumbnail: {
          ...result.output.thumbnail,
          src: new URL(thumbnail, origin).href,
        },
      },
      headings: resource.headings,
      head: {
        ...resource.head,
        meta: [
          ...(resource.head.meta || []),
          {
            name: "og:image",
            content: new URL(ogImage, origin).href,
          },
          {
            name: "twitter:image",
            content: new URL(ogImage, origin).href,
          },
        ],
      },
      content: resource.default().props.children.type(),
    };

    return post;
  } catch (error) {
    throw new Error(`Error retrieving MDX file for slug ${slug}`, { cause: error });
  }
});
export type PostFromSlug = Awaited<ReturnType<typeof getPostBySlug>>;

export const getPostsByLocale = server$(async (locale: string, origin: string) => {
  const paths = Object.keys(BLOG_POST_LIST).filter((path) => path.includes(`/${locale}/`));

  try {
    const postsByLocale = await Promise.all(
      paths.map(async (path) => {
        const slug = path.split("/").slice(-2)[0];

        const getPost = isDev ? BLOG_POST_LIST[path]() : BLOG_POST_LIST[path];
        const resource = (await getPost) as Post;
        const result = safeParse(FRONTMATTER_SCHEMA, resource.frontmatter);

        if (!result.success) {
          throw new Error(`Invalid frontmatter for slug ${slug}`, { cause: result.issues });
        }

        const thumbnailPath = `/src/content/${locale}/${slug}/thumbnail.png`;
        const getThumbnail = isDev ? BLOG_THUMBNAIL_LIST[thumbnailPath]() : BLOG_THUMBNAIL_LIST[thumbnailPath];
        const thumbnail = (await getThumbnail) as string;

        const post = {
          slug,
          frontmatter: {
            ...result.output,
            thumbnail: {
              ...result.output.thumbnail,
              src: new URL(thumbnail, origin).href,
            },
          },
        };

        return post;
      }),
    );

    return postsByLocale;
  } catch (error) {
    throw new Error(`Error retrieving posts for locale ${locale}`, { cause: error });
  }
});

import type { DocumentHeadValue } from "@builder.io/qwik-city";
import type { Output } from "valibot";
import { array, boolean, object, safeParse, string, transform } from "valibot";

const FRONTMATTER_SCHEMA = transform(
  object({
    title: string(),
    description: string(),
    createdAt: string(),
    updatedAt: string(),
    thumbnail: string(),
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
  content?: any;
};

const posts = import.meta.glob("/src/content/**/*.mdx");

export const getPostBySlug = async (slug: string, locale: string) => {
  const path = `/src/content/${locale}/${slug}.mdx`;

  try {
    const resource = (await posts[path]()) as Post & { default: () => any };
    const result = safeParse(FRONTMATTER_SCHEMA, resource.frontmatter);

    if (!result.success) {
      throw new Error(`Invalid frontmatter for slug ${slug}`, { cause: result.issues });
    }

    const post = {
      slug: slug,
      frontmatter: result.output,
      head: resource.head,
      content: resource.default().children.type(),
    };

    return post;
  } catch (error) {
    throw new Error(`Error retrieving MDX file for slug ${slug}`, { cause: error });
  }
};

export const getPostsByLocale = async (locale: string) => {
  const paths = Object.keys(posts).filter((path) => path.includes(`/${locale}/`));

  try {
    const postsByLocale = await Promise.all(
      paths.map(async (path) => {
        const resource = (await posts[path]()) as Post;
        const result = safeParse(FRONTMATTER_SCHEMA, resource.frontmatter);
        const slug = path.split("/").pop()?.replace(".mdx", "") || "";

        if (!result.success) {
          throw new Error(`Invalid frontmatter for slug ${slug}`, { cause: result.issues });
        }

        const post = {
          slug,
          frontmatter: result.output,
        };

        return post;
      }),
    );

    return postsByLocale;
  } catch (error) {
    throw new Error(`Error retrieving posts for locale ${locale}`, { cause: error });
  }
};

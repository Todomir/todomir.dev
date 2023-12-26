import type { DocumentHead } from "@builder.io/qwik-city";
import type { Output } from "valibot";
import { array, boolean, object, parse, safeParse, string, transform } from "valibot";

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
  head: DocumentHead;
  frontmatter: Frontmatter;
  content?: any;
};

const posts = import.meta.glob("/src/content/**/*.mdx");

export const getPostBySlug = async (slug: string, locale: string) => {
  const path = `/src/content/${locale}/${slug}.mdx`;

  try {
    const resource = (await posts[path]()) as Post & { default: () => any };
    const result = safeParse(FRONTMATTER_SCHEMA, resource.frontmatter);

    if (result.success) {
      const frontmatter = result.output;
      const post = {
        slug: slug,
        frontmatter,
        head: resource.head,
        content: resource.default().children.type(),
      };

      return post;
    } else {
      throw new Error(`Invalid frontmatter for slug ${slug}`, { cause: result.issues });
    }
  } catch (error) {
    throw new Error(`No MDX file found for slug ${slug}`, { cause: error });
  }
};

export const getPostsByLocale = async (locale: string) => {
  const paths = Object.keys(posts).filter((path) => path.includes(`/${locale}/`));

  const postsByLocale = await Promise.all(
    paths.map(async (path) => {
      const resource = (await posts[path]()) as Post;
      const frontmatter = parse(FRONTMATTER_SCHEMA, resource.frontmatter);

      const post = {
        slug: path.split("/").pop()?.replace(".mdx", "") || "",
        frontmatter,
      };

      return post;
    }),
  );

  return postsByLocale;
};

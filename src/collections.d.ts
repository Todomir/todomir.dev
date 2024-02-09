type Collections = {
  content: Array<{
    data: {
      date: Date;
      description: string;
      draft?: boolean;
      lang: string;
      permalink: string;
      tags?: string[];
      thumbnailAlt: string;
      title: string;
    };
    slug: string;
  }>;
};

declare module "virtual:mdx-collection" {
  export const collections: Collections;
}

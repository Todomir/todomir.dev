type Collections = {
    content: Array<{
        data: {
            date: Date;
            description: string;
            lang: string;
            permalink: string;
            tags?: string[];
            thumbnail: {
                alt: string;
                src: string;
            };
            title: string;
        };
        slug: string;
    }>;
};

declare module 'virtual:mdx-collection' {
  export const collections: Collections;
}